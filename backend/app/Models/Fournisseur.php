<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'entreprise',
        'adresse',
        'contact_personne',
        'telephone_contact',
        'email_contact',
        'statut',
        'produits_offerts',
    ];

    protected $casts = [
        'produits_offerts' => 'array',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(\App\Models\Utilisateur::class);
    }
}
