<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;

    protected $fillable = ['client_id', 'produits', 'total'];

    protected $casts = [
        'produits' => 'array',
    ];

    public function client()
    {
        return $this->belongsTo(\App\Models\Client::class);
    }
}
