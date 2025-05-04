<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);

        $attributes['password'] = Hash::make($attributes['password']);

        $user = User::create($attributes);

        Auth::login($user);

        return redirect('/collection');
    }
}