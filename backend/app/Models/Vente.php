<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    use HasFactory;

    protected $fillable = [
        'produit_id',
        'client_id',
        'quantite',
        'total',
        'remise',
        'statut_paiement',
        'statut_livraison',
        'mode_paiement',
        'adresse_livraison',
        'date_livraison',
        'date_vente',
    ];

    protected $casts = [
        'date_livraison' => 'datetime',
        'date_vente' => 'datetime',
    ];

    public function produit()
    {
        return $this->belongsTo(\App\Models\Produit::class);
    }

    public function client()
    {
        return $this->belongsTo(\App\Models\Client::class);
    }
}
