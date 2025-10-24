<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ventes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->integer('quantite')->default(1);
            $table->decimal('total', 10, 2);
            $table->decimal('remise', 10, 2)->default(0);
            $table->enum('statut_paiement', ['en_attente', 'payé', 'remboursé'])->default('en_attente');
            $table->enum('statut_livraison', ['en_cours', 'livré', 'annulé'])->default('en_cours');
            $table->enum('mode_paiement', ['carte', 'virement', 'paypal'])->default('carte');
            $table->string('adresse_livraison')->nullable();
            $table->dateTime('date_livraison')->nullable();
            $table->dateTime('date_vente')->default(now());
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
