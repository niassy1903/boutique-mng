<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // 🔹 Pour JWT

class Utilisateur extends Authenticatable implements JWTSubject
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'nom_complet',
        'nom_utilisateur',
        'adresse',
        'email',
        'telephone',
        'code',
        'role',
        'status',
        'mot_de_passe',
        'date_naissance',
        'photo_profil',
        'adresse_ip',
        'dernier_login',
        'email_verified_at',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'dernier_login' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    // 🔹 Méthodes requises par JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
