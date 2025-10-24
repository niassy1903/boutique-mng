<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FactureSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('factures')->truncate();

        $factures = [
            [
                'vente_id' => 1,
                'client_id' => 2,
                'total' => 1200.00,
                'remise' => 0,
                'tva' => 20,
                'date_facture' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'vente_id' => 2,
                'client_id' => 3,
                'total' => 300.00,
                'remise' => 0,
                'tva' => 20,
                'date_facture' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('factures')->insert($factures);
    }
}
