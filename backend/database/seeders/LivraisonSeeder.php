<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LivraisonSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('livraisons')->truncate();

        $livraisons = [
            [
                'vente_id' => 1,
                'adresse_livraison' => '123 Rue de Paris, Paris',
                'statut' => 'en_cours',
                'date_envoi' => now(),
                'date_livraison' => now()->addDays(3),
            ],
            [
                'vente_id' => 2,
                'adresse_livraison' => '456 Rue de Lyon, Lyon',
                'statut' => 'en_cours',
                'date_envoi' => now(),
                'date_livraison' => now()->addDays(2),
            ],
        ];

        DB::table('livraisons')->insert($livraisons);
    }
}
