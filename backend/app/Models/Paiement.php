<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'vente_id',
        'montant',
        'mode',
        'statut',
        'date_paiement',
    ];

    protected $casts = [
        'date_paiement' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(\App\Models\Client::class);
    }

    public function vente()
    {
        return $this->belongsTo(\App\Models\Vente::class);
    }
}
