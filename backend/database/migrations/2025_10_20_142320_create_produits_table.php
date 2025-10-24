<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fournisseur_id')->constrained('fournisseurs')->onDelete('cascade');
            $table->string('nom');
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->decimal('prix_ancien', 10, 2)->nullable();
            $table->integer('quantite_stock')->default(0);
            $table->string('image')->nullable(); // image principale
            $table->json('images')->nullable();  // images supplémentaires
            $table->string('categorie')->nullable();
            $table->json('tags')->nullable();     // tags pour recherche
            $table->float('rating')->default(0);  // note moyenne
            $table->boolean('disponible')->default(true);
            $table->json('historique_prix')->nullable(); // suivi des prix
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
