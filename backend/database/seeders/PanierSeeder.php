<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PanierSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('paniers')->truncate();

        $paniers = [
            [
                'client_id' => 2,
                'produit_id' => 1,
                'quantite' => 1,
                'date_ajout' => now(),
            ],
            [
                'client_id' => 3,
                'produit_id' => 2,
                'quantite' => 2,
                'date_ajout' => now(),
            ],
        ];

        DB::table('paniers')->insert($paniers);
    }
}
