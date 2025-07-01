<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Gemini;

Route::post('/chat', function (Request $request) {
	if (!$request->isJson()) {
		return response()->json([
			'error' => 'Content-Type must be application/json'
		], 415);
	}

	$validated = $request->validate([
		'text' => 'required|string',
	]);

	$textInput = $validated['text'];

	$yourApiKey = env('GEMINI_API_KEY');
	$client = Gemini::client($yourApiKey);

	$result = $client
		->generativeModel(model: 'gemini-2.0-flash')
		->generateContent($textInput);

	$textRes = $result->text();

	return response()->json([
		'datetime' => Carbon::now()->toIso8601String(),
    'text' => $textRes,
	]);
});