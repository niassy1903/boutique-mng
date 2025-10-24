<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvisSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('avis')->truncate();

        $avis = [
            [
                'client_id' => 2,
                'produit_id' => 1,
                'note' => 5,
                'commentaire' => 'Super produit, très satisfait !',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 3,
                'produit_id' => 2,
                'note' => 4,
                'commentaire' => 'Bon rapport qualité/prix',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('avis')->insert($avis);
    }
}
