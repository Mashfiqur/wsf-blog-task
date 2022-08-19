<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SignUpController extends Controller
{
    public function store(SignUpRequest $request){

        if($request->validated()){
            $requestedData = $request->validated();

            $user = User::create([
                'name' => $requestedData['name'],
                'email' => $requestedData['email'],
                'password' => Hash::make($requestedData['password']),
            ]);
    
            $token = Auth::login($user);

            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token
            ]);
        }
    }
}
