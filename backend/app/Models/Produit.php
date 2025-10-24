<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'fournisseur_id',
        'nom',
        'description',
        'prix',
        'prix_ancien',
        'quantite_stock',
        'image',
        'images',
        'categorie',
        'tags',
        'rating',
        'disponible',
        'historique_prix',
    ];

    protected $casts = [
        'images' => 'array',
        'tags' => 'array',
        'historique_prix' => 'array',
        'disponible' => 'boolean',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(\App\Models\Fournisseur::class);
    }
}
