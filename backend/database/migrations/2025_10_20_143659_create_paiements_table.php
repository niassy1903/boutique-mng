<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('vente_id')->nullable()->constrained('ventes')->onDelete('cascade');
            $table->decimal('montant', 10, 2);
            $table->enum('mode', ['carte', 'virement', 'paypal']);
            $table->enum('statut', ['en_attente', 'réussi', 'échoué'])->default('en_attente');
            $table->dateTime('date_paiement')->default(now());
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
