<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('stocks')->truncate();

        $stocks = [
            [
                'produit_id' => 1,
                'type_mouvement' => 'entrée',
                'quantite' => 10,
                'date_mouvement' => now(),
                'commentaire' => 'Stock initial',
            ],
            [
                'produit_id' => 2,
                'type_mouvement' => 'entrée',
                'quantite' => 25,
                'date_mouvement' => now(),
                'commentaire' => 'Stock initial',
            ],
        ];

        DB::table('stocks')->insert($stocks);
    }
}
