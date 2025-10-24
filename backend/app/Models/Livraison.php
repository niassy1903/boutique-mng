<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    use HasFactory;

    protected $fillable = [
        'vente_id',
        'adresse_livraison',
        'statut',
        'numero_suivi',
        'date_livraison_estimee',
    ];

    protected $casts = [
        'date_livraison_estimee' => 'datetime',
    ];

    public function vente()
    {
        return $this->belongsTo(\App\Models\Vente::class);
    }
}
