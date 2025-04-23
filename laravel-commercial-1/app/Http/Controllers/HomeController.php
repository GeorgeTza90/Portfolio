<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('home.index', [
            'heading' => 'Welcome Home',
            'title' => 'Home Page',
            'text' => 'Some news for you...',
        ]);
    }
}
