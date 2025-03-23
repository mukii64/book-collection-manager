<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::prefix('books')->group(function () {
    Route::get('/', [BookController::class, 'index']);           // List all books or filter by user_id
    Route::get('/{id}', [BookController::class, 'show']);        // Show one book
    Route::post('/', [BookController::class, 'store']);          // Create new book
    Route::put('/{id}', [BookController::class, 'update']);      // Update book
    Route::delete('/{id}', [BookController::class, 'destroy']);  // Delete book
    Route::patch('/{id}/toggle-read', [BookController::class, 'toggleRead']); // NEW: Toggle read/unread
});
