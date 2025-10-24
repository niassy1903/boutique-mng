<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('notifications')->truncate();

        $notifications = [
            [
                'user_id' => 2,
                'type' => 'info',
                'message' => 'Votre commande #1 est en cours de livraison',
                'lu' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'type' => 'info',
                'message' => 'Nouveau produit disponible : Casque Audio',
                'lu' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('notifications')->insert($notifications);
    }
}
