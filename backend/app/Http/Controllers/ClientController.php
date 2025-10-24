<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // ✅ Lister tous les clients
    public function index()
    {
        $clients = Client::with('utilisateur')->get();
        return response()->json($clients, 200);
    }

    // ✅ Créer un client
    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'entreprise' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'pays' => 'nullable|string|max:255',
            'code_postal' => 'nullable|string|max:50',
            'preferences' => 'nullable|array',
            'historique_achats' => 'nullable|array',
            'points_fidelite' => 'integer|min:0',
        ]);

        $client = Client::create($validated);

        return response()->json([
            'message' => 'Client créé avec succès ✅',
            'data' => $client
        ], 201);
    }

    // ✅ Afficher un client
    public function show($id)
    {
        $client = Client::with('utilisateur')->find($id);
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }
        return response()->json($client);
    }

    // ✅ Modifier un client
    public function update(Request $request, $id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }

        $client->update($request->all());

        return response()->json(['message' => 'Client mis à jour avec succès']);
    }

    // ✅ Supprimer un client
    public function destroy($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }

        $client->delete();

        return response()->json(['message' => 'Client supprimé avec succès']);
    }
}
