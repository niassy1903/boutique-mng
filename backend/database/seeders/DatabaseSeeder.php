<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
    UtilisateurSeeder::class,
    ClientSeeder::class,
    CategorieSeeder::class,
    ProduitSeeder::class,
    AvisSeeder::class,
    FournisseurSeeder::class,
    VenteSeeder::class,
    StockSeeder::class,
    PanierSeeder::class,
    PaiementSeeder::class,
    FactureSeeder::class,

]);

    }
}
