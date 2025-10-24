<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VenteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ventes')->truncate();

        $ventes = [
            [
                'produit_id' => 1,
                'client_id' => 2,
                'quantite' => 1,
                'total' => 1200.00,
                'remise' => 0,
                'statut_paiement' => 'payé',
                'statut_livraison' => 'en_cours',
                'date_vente' => now(),
                'mode_paiement' => 'carte',
                'adresse_livraison' => '123 Rue de Paris, Paris',
                'date_livraison' => now()->addDays(3),
            ],
            [
                'produit_id' => 2,
                'client_id' => 3,
                'quantite' => 2,
                'total' => 300.00,
                'remise' => 0,
                'statut_paiement' => 'payé',
                'statut_livraison' => 'en_cours',
                'date_vente' => now(),
                'mode_paiement' => 'paypal',
                'adresse_livraison' => '456 Rue de Lyon, Lyon',
                'date_livraison' => now()->addDays(2),
            ],
        ];

        DB::table('ventes')->insert($ventes);
    }
}
