<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/portfolio', [PortfolioController::class, 'index']);
    Route::get('/blogs', [PortfolioController::class, 'blogs']);
    Route::get('/blogs/{slug}', [PortfolioController::class, 'blog']);
    Route::get('/projects/{slug}', [PortfolioController::class, 'project']);
});

Route::get('/resume/download', [PortfolioController::class, 'downloadResume']);
