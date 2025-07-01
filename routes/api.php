<?php

use Illuminate\Support\Facades\Route;

Route::post('/chat', function () {
	return response()->json([
    'name' => 'Abigail',
    'state' => 'CA',
	]);
});