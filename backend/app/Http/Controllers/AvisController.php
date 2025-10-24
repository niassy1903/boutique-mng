<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    public function index()
    {
        return response()->json(Avis::with(['client', 'produit'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'produit_id' => 'required|exists:produits,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string',
            'date_publication' => 'nullable|date',
        ]);

        $avis = Avis::create($validated);
        return response()->json(['message' => 'Avis ajouté ✅', 'data' => $avis], 201);
    }

    public function show($id)
    {
        $avis = Avis::with(['client', 'produit'])->find($id);
        if (!$avis) return response()->json(['message' => 'Avis non trouvé'], 404);
        return response()->json($avis);
    }

    public function update(Request $request, $id)
    {
        $avis = Avis::find($id);
        if (!$avis) return response()->json(['message' => 'Avis non trouvé'], 404);

        $avis->update($request->all());
        return response()->json(['message' => 'Avis mis à jour ✅']);
    }

    public function destroy($id)
    {
        $avis = Avis::find($id);
        if (!$avis) return response()->json(['message' => 'Avis non trouvé'], 404);

        $avis->delete();
        return response()->json(['message' => 'Avis supprimé ✅']);
    }
}
