<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom_complet');
            $table->string('nom_utilisateur')->unique();
            $table->string('adresse')->nullable();
            $table->string('email')->unique();
            $table->string('telephone')->nullable();
            $table->string('code')->unique();
            $table->enum('role', ['admin', 'client', 'fournisseur'])->default('client');
            $table->enum('status', ['actif', 'inactif', 'suspendu', 'verifie'])->default('inactif');
            $table->string('mot_de_passe');
            $table->date('date_naissance')->nullable();
            $table->string('photo_profil')->nullable();
            $table->string('adresse_ip')->nullable();
            $table->dateTime('dernier_login')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->softDeletes(); // Pour suppression logique
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
