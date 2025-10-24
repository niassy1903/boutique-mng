<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    public function index()
    {
        return response()->json(Paiement::with(['client', 'vente'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'vente_id' => 'nullable|exists:ventes,id',
            'montant' => 'required|numeric|min:0',
            'mode' => 'required|in:carte,virement,paypal',
            'statut' => 'in:en_attente,réussi,échoué',
            'date_paiement' => 'nullable|date',
        ]);

        $paiement = Paiement::create($validated);
        return response()->json(['message' => 'Paiement enregistré ✅', 'data' => $paiement], 201);
    }

    public function show($id)
    {
        $paiement = Paiement::with(['client', 'vente'])->find($id);
        if (!$paiement) return response()->json(['message' => 'Paiement non trouvé'], 404);
        return response()->json($paiement);
    }

    public function update(Request $request, $id)
    {
        $paiement = Paiement::find($id);
        if (!$paiement) return response()->json(['message' => 'Paiement non trouvé'], 404);

        $paiement->update($request->all());
        return response()->json(['message' => 'Paiement mis à jour ✅']);
    }

    public function destroy($id)
    {
        $paiement = Paiement::find($id);
        if (!$paiement) return response()->json(['message' => 'Paiement non trouvé'], 404);

        $paiement->delete();
        return response()->json(['message' => 'Paiement supprimé ✅']);
    }
}
