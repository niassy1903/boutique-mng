<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UtilisateurSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['nom_complet' => 'Admin Principal', 'nom_utilisateur' => 'admin1', 'email' => 'admin1@example.com', 'role' => 'admin', 'date_naissance' => '1985-01-01'],
            ['nom_complet' => 'Jean Dupont', 'nom_utilisateur' => 'client1', 'email' => 'client1@example.com', 'role' => 'client', 'date_naissance' => '1990-05-12'],
            ['nom_complet' => 'Marie Martin', 'nom_utilisateur' => 'client2', 'email' => 'client2@example.com', 'role' => 'client', 'date_naissance' => '1992-08-22'],
            ['nom_complet' => 'Fournisseur Test', 'nom_utilisateur' => 'fournisseur1', 'email' => 'fournisseur1@example.com', 'role' => 'fournisseur', 'date_naissance' => '1980-07-20'],
            ['nom_complet' => 'Pierre Leblanc', 'nom_utilisateur' => 'fournisseur2', 'email' => 'fournisseur2@example.com', 'role' => 'fournisseur', 'date_naissance' => '1978-03-15'],
        ];

        foreach ($users as $u) {
            $prenomNom = str_replace(' ', '', $u['nom_complet']); // enlever espaces
            $code = rand(100, 999) . strtoupper(substr($prenomNom, 0, 3));

            DB::table('utilisateurs')->insert([
                'nom_complet' => $u['nom_complet'],
                'nom_utilisateur' => $u['nom_utilisateur'],
                'email' => $u['email'],
                'mot_de_passe' => Hash::make('password123'),
                'role' => $u['role'],
                'status' => 'actif',
                'date_naissance' => $u['date_naissance'],
                'code' => $code,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
