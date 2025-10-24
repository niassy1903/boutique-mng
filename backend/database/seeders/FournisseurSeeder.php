<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FournisseurSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('fournisseurs')->truncate();

        $fournisseurs = [
            [
                'user_id' => 4,
                'entreprise' => 'Fournisseur SARL',
                'adresse' => '10 Rue du Commerce, Paris',
                'contact_personne' => 'Paul Fournier',
                'telephone_contact' => '0123456789',
                'email_contact' => 'contact@fournisseur1.com',
                'statut' => 'actif',
                'produits_offerts' => json_encode([1,2]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'entreprise' => 'Leblanc Fournitures',
                'adresse' => '25 Avenue des Industries, Lyon',
                'contact_personne' => 'Pierre Leblanc',
                'telephone_contact' => '0987654321',
                'email_contact' => 'contact@fournisseur2.com',
                'statut' => 'actif',
                'produits_offerts' => json_encode([3,4]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('fournisseurs')->insert($fournisseurs);
    }
}
