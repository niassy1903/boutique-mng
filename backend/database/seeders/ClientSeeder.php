<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
       DB::table('clients')->insert([
    [
        'utilisateur_id' => 3, // correspond à Jean Dupont dans utilisateurs
        'entreprise' => 'Entreprise Alpha',
        'ville' => 'Paris',
        'pays' => 'France',
        'code_postal' => '75001',
        'preferences' => json_encode(['categorie' => 'electronique']),
        'historique_achats' => json_encode([]),
        'points_fidelite' => 100,
        'created_at' => now(),
        'updated_at' => now(),
    ],
]);

        DB::table('clients')->insert($clients);
    }
}
