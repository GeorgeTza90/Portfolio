<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        return view('about.index', [
            'heading' => 'About Card Wizard',
            'title' => 'About Page',
            'text' => 'Let us tell you about us...',
        ]);
    }
}
