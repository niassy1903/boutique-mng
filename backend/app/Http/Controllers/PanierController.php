<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use Illuminate\Http\Request;

class PanierController extends Controller
{
    public function index()
    {
        return response()->json(Panier::with('client')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'produits' => 'nullable|array',
            'total' => 'required|numeric|min:0',
        ]);

        $panier = Panier::create($validated);
        return response()->json(['message' => 'Panier créé ✅', 'data' => $panier], 201);
    }

    public function show($id)
    {
        $panier = Panier::with('client')->find($id);
        if (!$panier) return response()->json(['message' => 'Panier non trouvé'], 404);
        return response()->json($panier);
    }

    public function update(Request $request, $id)
    {
        $panier = Panier::find($id);
        if (!$panier) return response()->json(['message' => 'Panier non trouvé'], 404);

        $panier->update($request->all());
        return response()->json(['message' => 'Panier mis à jour ✅']);
    }

    public function destroy($id)
    {
        $panier = Panier::find($id);
        if (!$panier) return response()->json(['message' => 'Panier non trouvé'], 404);

        $panier->delete();
        return response()->json(['message' => 'Panier supprimé ✅']);
    }
}
