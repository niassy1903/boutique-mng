<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('produits')->truncate();

        $produits = [
            [
                'fournisseur_id' => 4,
                'nom' => 'Laptop Gamer',
                'description' => 'Laptop puissant pour jeux vidéo.',
                'prix' => 1200.00,
                'prix_ancien' => 1500.00,
                'quantite_stock' => 10,
                'image' => 'laptop1.jpg',
                'images' => json_encode(['laptop1_1.jpg','laptop1_2.jpg']),
                'categorie' => 'electronique',
                'tags' => json_encode(['jeu','ordinateur','gamer']),
                'rating' => 4.5,
                'disponible' => true,
                'date_creation' => now(),
                'historique_prix' => json_encode([1500,1400,1200]),
            ],
            [
                'fournisseur_id' => 4,
                'nom' => 'Casque Audio',
                'description' => 'Casque bluetooth de haute qualité.',
                'prix' => 150.00,
                'prix_ancien' => 200.00,
                'quantite_stock' => 25,
                'image' => 'casque1.jpg',
                'images' => json_encode(['casque1_1.jpg','casque1_2.jpg']),
                'categorie' => 'electronique',
                'tags' => json_encode(['audio','musique','bluetooth']),
                'rating' => 4.2,
                'disponible' => true,
                'date_creation' => now(),
                'historique_prix' => json_encode([200,180,150]),
            ],
        ];

        DB::table('produits')->insert($produits);
    }
}
