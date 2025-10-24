<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaiementSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('paiements')->truncate();

        $paiements = [
            [
                'vente_id' => 1,
                'client_id' => 2,
                'montant' => 1200.00,
                'mode_paiement' => 'carte',
                'date_paiement' => now(),
                'statut' => 'payé',
            ],
            [
                'vente_id' => 2,
                'client_id' => 3,
                'montant' => 300.00,
                'mode_paiement' => 'paypal',
                'date_paiement' => now(),
                'statut' => 'payé',
            ],
        ];

        DB::table('paiements')->insert($paiements);
    }
}
