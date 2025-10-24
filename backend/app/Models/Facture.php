<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_facture',
        'vente_id',
        'client_id',
        'montant_total',
        'remise',
        'montant_net',
        'date_facture',
    ];

    protected $casts = [
        'date_facture' => 'datetime',
    ];

    public function vente()
    {
        return $this->belongsTo(\App\Models\Vente::class);
    }

    public function client()
    {
        return $this->belongsTo(\App\Models\Client::class);
    }
}
