<?php

namespace App\Http\Controllers;

use App\Models\Livraison;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{
    public function index()
    {
        return response()->json(Livraison::with('vente')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vente_id' => 'required|exists:ventes,id',
            'adresse_livraison' => 'required|string|max:255',
            'statut' => 'in:en_cours,expédié,livré,annulé',
            'numero_suivi' => 'nullable|string|max:100',
            'date_livraison_estimee' => 'nullable|date',
        ]);

        $livraison = Livraison::create($validated);
        return response()->json(['message' => 'Livraison créée ✅', 'data' => $livraison], 201);
    }

    public function show($id)
    {
        $livraison = Livraison::with('vente')->find($id);
        if (!$livraison) return response()->json(['message' => 'Livraison non trouvée'], 404);
        return response()->json($livraison);
    }

    public function update(Request $request, $id)
    {
        $livraison = Livraison::find($id);
        if (!$livraison) return response()->json(['message' => 'Livraison non trouvée'], 404);

        $livraison->update($request->all());
        return response()->json(['message' => 'Livraison mise à jour ✅']);
    }

    public function destroy($id)
    {
        $livraison = Livraison::find($id);
        if (!$livraison) return response()->json(['message' => 'Livraison non trouvée'], 404);

        $livraison->delete();
        return response()->json(['message' => 'Livraison supprimée ✅']);
    }
}
