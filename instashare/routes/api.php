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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('login', [\App\Http\Controllers\UserController::class, 'login'])->name('login');
    Route::post('register', [\App\Http\Controllers\UserController::class, 'register'])->name('register');
});

Route::get('downloadfile/{id?}', [\App\Http\Controllers\FilesUserController::class, 'downloadfile'])->name('downloadfile');


Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::post('logout', [\App\Http\Controllers\UserController::class, 'logout'])->name('logout');
    Route::post('refresh', [\App\Http\Controllers\UserController::class, 'refresh'])->name('refresh');
    Route::post('me', [\App\Http\Controllers\UserController::class, 'me'])->name('me');
    Route::post('upload', [\App\Http\Controllers\FilesUserController::class, 'upload'])->name('upload');
    Route::get('filesByUser', [\App\Http\Controllers\FilesUserController::class, 'filesByUser'])->name('filesByUser');
    Route::put('updateFile/{id?}', [\App\Http\Controllers\FilesUserController::class, 'updateFile'])->name('updateFile');


});
