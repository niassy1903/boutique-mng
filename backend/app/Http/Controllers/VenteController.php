<?php

namespace App\Http\Controllers;

use App\Models\Vente;
use Illuminate\Http\Request;

class VenteController extends Controller
{
    public function index()
    {
        return response()->json(Vente::with(['produit', 'client'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'client_id' => 'required|exists:clients,id',
            'quantite' => 'required|integer|min:1',
            'total' => 'required|numeric|min:0',
            'remise' => 'numeric|min:0',
            'statut_paiement' => 'in:en_attente,payé,remboursé',
            'statut_livraison' => 'in:en_cours,livré,annulé',
            'mode_paiement' => 'in:carte,virement,paypal',
            'adresse_livraison' => 'nullable|string|max:255',
            'date_livraison' => 'nullable|date',
        ]);

        $vente = Vente::create($validated);

        return response()->json(['message' => 'Vente créée avec succès ✅', 'data' => $vente], 201);
    }

    public function show($id)
    {
        $vente = Vente::with(['produit', 'client'])->find($id);
        if (!$vente) {
            return response()->json(['message' => 'Vente non trouvée'], 404);
        }
        return response()->json($vente);
    }

    public function update(Request $request, $id)
    {
        $vente = Vente::find($id);
        if (!$vente) {
            return response()->json(['message' => 'Vente non trouvée'], 404);
        }

        $vente->update($request->all());
        return response()->json(['message' => 'Vente mise à jour avec succès']);
    }

    public function destroy($id)
    {
        $vente = Vente::find($id);
        if (!$vente) {
            return response()->json(['message' => 'Vente non trouvée'], 404);
        }

        $vente->delete();
        return response()->json(['message' => 'Vente supprimée avec succès']);
    }
}
