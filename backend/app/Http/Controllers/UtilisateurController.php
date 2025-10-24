<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class UtilisateurController extends Controller
{
    // ✅ Lister tous les utilisateurs
    public function index()
    {
        return response()->json(Utilisateur::all(), 200);
    }

    // ✅ Créer un utilisateur
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'nom_utilisateur' => 'required|string|unique:utilisateurs',
            'email' => 'required|email|unique:utilisateurs',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'in:admin,client,fournisseur',
        ]);

        $validated['mot_de_passe'] = Hash::make($validated['mot_de_passe']);
        $validated['code'] = rand(100, 999) . strtoupper(substr($validated['nom_complet'], 0, 3));

        $utilisateur = Utilisateur::create($validated);

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'data' => $utilisateur
        ], 201);
    }

    // ✅ Voir un utilisateur
    public function show($id)
    {
        $utilisateur = Utilisateur::find($id);
        if (!$utilisateur) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($utilisateur);
    }

    // ✅ Modifier un utilisateur
    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::find($id);
        if (!$utilisateur) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $utilisateur->update($request->all());
        return response()->json(['message' => 'Utilisateur mis à jour avec succès']);
    }

    // ✅ Supprimer (soft delete)
    public function destroy($id)
    {
        $utilisateur = Utilisateur::find($id);
        if (!$utilisateur) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $utilisateur->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès (soft delete)']);
    }

    // ✅ Connexion utilisateur avec JWT
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if (!$utilisateur || !Hash::check($request->mot_de_passe, $utilisateur->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        // Mise à jour de la dernière connexion et IP
        $utilisateur->update([
            'dernier_login' => Carbon::now(),
            'adresse_ip' => $request->ip(),
            'status' => 'verifie',
        ]);

        // 🔹 Générer le token JWT
        $token = JWTAuth::fromUser($utilisateur);

        return response()->json([
            'message' => 'Connexion réussie ✅',
            'token' => $token,
            'role' => $utilisateur->role,
            'nom_complet' => $utilisateur->nom_complet,
            'utilisateur' => $utilisateur
        ]);
    }

    // ✅ Déconnexion utilisateur avec JWT
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Déconnexion réussie 🚪']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token invalide'], 401);
        }
    }

    // ✅ Obtenir les infos de l’utilisateur connecté via JWT
  public function me(Request $request)
{
    try {
        $utilisateur = JWTAuth::parseToken()->authenticate();

        // Retourner uniquement les infos nécessaires au frontend
        return response()->json([
            'id' => $utilisateur->id,
            'nom_complet' => $utilisateur->nom_complet,
            'role' => $utilisateur->role,
            'email' => $utilisateur->email,
        ]);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Token invalide ou expiré'], 401);
    }
}

}