<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // ensure user is logged in
    }

    public function index()
    {
        $user = Auth::user();
        $collections = Collection::where('user_id', $user->id)->get();
        $cardIds = $collections->pluck('card_id')->toArray();
        $cards = collect(Collection::get($cardIds));

        return view('cards.index', [
            'cards' => $cards,
            'heading' => 'Your Collection',
            'title' => 'Collection Page',
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $cardId = $request->input('card_id');
        $existingCollection = Collection::where('user_id', $user->id)
            ->where('card_id', $cardId)
            ->first();

        if ($existingCollection) {
            return redirect()->back()->with('error', 'Card is already in your collection.');
        }

        $collection = new Collection();
        $collection->user_id = $user->id;
        $collection->card_id = $cardId;
        $collection->save();

        return redirect()->back()->with('success', 'Card added to your collection!');
    }

    public function removeFromCollection($cardId)
    {
        $user = Auth::user();
        $collection = Collection::where('user_id', $user->id)
            ->where('card_id', $cardId)
            ->first();

        if ($collection) {
            $collection->delete();
        }

        return redirect()->route('cards.index')->with('message', 'Card removed from your collection.');
    }
}
