<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::prefix('books')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [BookController::class, 'index']);           // List all books or filter by user_id
    Route::get('/{id}', [BookController::class, 'show']);        // Show one book
    Route::post('/', [BookController::class, 'store']);          // Create new book
    Route::put('/{id}', [BookController::class, 'update']);      // Update book
    Route::delete('/{id}', [BookController::class, 'destroy']);  // Delete book
    Route::patch('/{id}/toggle-read', [BookController::class, 'toggleRead']); // NEW: Toggle read/unread
});
Route::options('/{any}', function () {
    return response()->json([]);
})->where('any', '.*');
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index']);
    Route::get('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'show']);
    Route::post('/users', [\App\Http\Controllers\Admin\UserController::class, 'store']);
    Route::put('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'update']);
    Route::delete('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'destroy']);
});
