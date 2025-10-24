<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    public function index()
    {
        return response()->json(Fournisseur::with('utilisateur')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'entreprise' => 'required|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'contact_personne' => 'nullable|string|max:255',
            'telephone_contact' => 'nullable|string|max:50',
            'email_contact' => 'nullable|email',
            'statut' => 'in:actif,inactif,suspendu',
            'produits_offerts' => 'nullable|array',
        ]);

        $fournisseur = Fournisseur::create($validated);

        return response()->json(['message' => 'Fournisseur créé avec succès ✅', 'data' => $fournisseur], 201);
    }

    public function show($id)
    {
        $fournisseur = Fournisseur::with('utilisateur')->find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }
        return response()->json($fournisseur);
    }

    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $fournisseur->update($request->all());
        return response()->json(['message' => 'Fournisseur mis à jour avec succès']);
    }

    public function destroy($id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $fournisseur->delete();
        return response()->json(['message' => 'Fournisseur supprimé avec succès']);
    }
}
