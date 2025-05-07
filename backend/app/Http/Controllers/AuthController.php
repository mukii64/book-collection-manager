<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request data.
        $fields = $request->validate([
            'email'    => 'required|string',
            'password' => 'required|string',
        ]);

        // Verify email existence and password correctness.
        $user = User::where('email', $fields['email'])->first();
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }

        // Create a new token (requires Laravel Sanctum) with 12 hours expiration
        $tokenResult = $user->createToken('api-token');
        $token = $tokenResult->plainTextToken;
        $tokenModel = $tokenResult->token ?? $user->tokens()->latest()->first();
        if ($tokenModel) {
            $tokenModel->expires_at = now()->addHours(12);
            $tokenModel->save();
        }

        return response([
            'user'  => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the current user's token.
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Logged out'
        ], 200);
    }
}
