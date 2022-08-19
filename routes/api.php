<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('signup',[\App\Http\Controllers\Api\Auth\SignUpController::class, 'store']);

Route::controller(\App\Http\Controllers\Api\Auth\LoginController::class)->group(function () {
    Route::post('login', 'login');
    Route::get('refresh-token', 'refresh');
    Route::post('logout', 'logout');
});

Route::resource('blogs', \App\Http\Controllers\Api\BlogController::class);