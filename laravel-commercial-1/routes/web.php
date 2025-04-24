<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\SessionController;

use Illuminate\Support\Facades\Route;

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return 'Η σύνδεση με τη βάση δεδομένων είναι επιτυχής!';
    } catch (\Exception $e) {
        return 'Η σύνδεση απέτυχε. Λάθος: ' . $e->getMessage();
    }
});

// About
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Home
Route::get('/', [HomeController::class, 'index'])->name('/');

// Collection
Route::get('/cards', [CollectionController::class, 'index'])->name('cards.index');
Route::post('/cards', [CollectionController::class, 'store']);
Route::post('/remove-from-collection/{cardId}', [CollectionController::class, 'removeFromCollection'])->name('remove.from.collection');

// Search
Route::get('/search', [SearchController::class, 'index'])->name('search.index');
Route::get('/search/{card}', [SearchController::class, 'show'])->name('search.show');
Route::get('/search/set/{setName}', [SearchController::class, 'showBySet'])->name('search.bySet');

// Auth
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');

Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store']);
Route::post('/logout', [SessionController::class, 'destroy']);



