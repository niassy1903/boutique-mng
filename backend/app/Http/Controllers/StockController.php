<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        return response()->json(Stock::with('produit')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'type_mouvement' => 'required|in:entrée,sortie',
            'quantite' => 'required|integer|min:1',
            'commentaire' => 'nullable|string|max:255',
            'date_mouvement' => 'nullable|date',
        ]);

        $stock = Stock::create($validated);

        return response()->json(['message' => 'Mouvement de stock créé ✅', 'data' => $stock], 201);
    }

    public function show($id)
    {
        $stock = Stock::with('produit')->find($id);
        if (!$stock) {
            return response()->json(['message' => 'Mouvement de stock non trouvé'], 404);
        }
        return response()->json($stock);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json(['message' => 'Mouvement de stock non trouvé'], 404);
        }

        $stock->update($request->all());
        return response()->json(['message' => 'Mouvement de stock mis à jour ✅']);
    }

    public function destroy($id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json(['message' => 'Mouvement de stock non trouvé'], 404);
        }

        $stock->delete();
        return response()->json(['message' => 'Mouvement de stock supprimé ✅']);
    }
}
