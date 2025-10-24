<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index()
    {
        return response()->json(Produit::with('fournisseur')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fournisseur_id' => 'required|exists:fournisseurs,id',
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'prix_ancien' => 'nullable|numeric|min:0',
            'quantite_stock' => 'integer|min:0',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'categorie' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'rating' => 'nullable|numeric|min:0|max:5',
            'disponible' => 'boolean',
            'historique_prix' => 'nullable|array',
        ]);

        $produit = Produit::create($validated);

        return response()->json(['message' => 'Produit créé avec succès ✅', 'data' => $produit], 201);
    }

    public function show($id)
    {
        $produit = Produit::with('fournisseur')->find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }
        return response()->json($produit);
    }

    public function update(Request $request, $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->update($request->all());
        return response()->json(['message' => 'Produit mis à jour avec succès']);
    }

    public function destroy($id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->delete();
        return response()->json(['message' => 'Produit supprimé avec succès']);
    }
}
