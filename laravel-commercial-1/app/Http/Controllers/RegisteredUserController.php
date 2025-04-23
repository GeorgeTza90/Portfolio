<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return view('auth.register', [
            'heading' => 'Sign Up',
            'title' => 'Register Page',
        ]);
    }

    public function store()
    {
        $attributes = request()->validate([
            'first_name' => ['required', 'min:3', 'max:12'],
            'last_name' => ['required', 'min:3', 'max:12'],
            'email' => ['required', 'email'],
            'password' => ['required', Password::min(6), 'confirmed']
        ]);

        $user = User::create($attributes);

        Auth::login($user);

        return redirect('/cards');
    }
}