<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'entreprise',
        'ville',
        'pays',
        'code_postal',
        'preferences',
        'historique_achats',
        'points_fidelite',
    ];

    protected $casts = [
        'preferences' => 'array',
        'historique_achats' => 'array',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
