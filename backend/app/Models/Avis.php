<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'produit_id',
        'note',
        'commentaire',
        'date_publication',
    ];

    protected $casts = [
        'date_publication' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(\App\Models\Client::class);
    }

    public function produit()
    {
        return $this->belongsTo(\App\Models\Produit::class);
    }
}
