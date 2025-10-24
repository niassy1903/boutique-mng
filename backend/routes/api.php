<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes pour la gestion des utilisateurs


Route::apiResource('utilisateurs', UtilisateurController::class);

// 🔐 Authentification
Route::post('/utilisateurs/login', [UtilisateurController::class, 'login']);
Route::get('/utilisateurs/me', [UtilisateurController::class, 'me']);
Route::post('/utilisateurs/logout', [UtilisateurController::class, 'logout']);


// Routes pour la gestion des clients
use App\Http\Controllers\ClientController;

Route::apiResource('clients', ClientController::class);


// Routes pour la gestion des fournisseurs
use App\Http\Controllers\FournisseurController;

Route::apiResource('fournisseurs', FournisseurController::class);


// Routes pour la gestion des produits
use App\Http\Controllers\ProduitController;

Route::apiResource('produits', ProduitController::class);

// Routes pour la gestion des ventes
use App\Http\Controllers\VenteController;

Route::apiResource('ventes', VenteController::class);

// Routes pour la gestion des stocks
use App\Http\Controllers\StockController;

Route::apiResource('stocks', StockController::class);


//use App\Http\Controllers\FactureController;
Route::apiResource('factures', FactureController::class);


use App\Http\Controllers\PanierController;

Route::apiResource('paniers', PanierController::class);


use App\Http\Controllers\PaiementController;

Route::apiResource('paiements', PaiementController::class);

use App\Http\Controllers\LivraisonController;

Route::apiResource('livraisons', LivraisonController::class);


use App\Http\Controllers\AvisController;

Route::apiResource('avis', AvisController::class);


use App\Http\Controllers\CategorieController;

Route::apiResource('categories', CategorieController::class);
