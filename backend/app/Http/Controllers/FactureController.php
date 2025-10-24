<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FactureController extends Controller
{
    public function index()
    {
        return response()->json(Facture::with(['vente', 'client'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vente_id' => 'required|exists:ventes,id',
            'client_id' => 'required|exists:clients,id',
            'montant_total' => 'required|numeric|min:0',
            'remise' => 'numeric|min:0',
            'montant_net' => 'required|numeric|min:0',
        ]);

        // Génération automatique du numéro de facture
        $validated['numero_facture'] = 'FAC-' . strtoupper(Str::random(6));
        $facture = Facture::create($validated);

        return response()->json(['message' => 'Facture créée ✅', 'data' => $facture], 201);
    }

    public function show($id)
    {
        $facture = Facture::with(['vente', 'client'])->find($id);
        if (!$facture) {
            return response()->json(['message' => 'Facture non trouvée'], 404);
        }
        return response()->json($facture);
    }

    public function update(Request $request, $id)
    {
        $facture = Facture::find($id);
        if (!$facture) {
            return response()->json(['message' => 'Facture non trouvée'], 404);
        }

        $facture->update($request->all());
        return response()->json(['message' => 'Facture mise à jour ✅']);
    }

    public function destroy($id)
    {
        $facture = Facture::find($id);
        if (!$facture) {
            return response()->json(['message' => 'Facture non trouvée'], 404);
        }

        $facture->delete();
        return response()->json(['message' => 'Facture supprimée ✅']);
    }
}
