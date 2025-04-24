<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CollectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();

        $cards = \DB::table('collections')
            ->join('card_store', 'collections.card_id', '=', 'card_store.card_id')
            ->where('collections.user_id', $user->id)
            ->select('card_store.*')
            ->get();

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

        $cardStore = \App\Models\CardStore::where('card_id', $cardId)->first();

        if (!$cardStore) {
            try {
                $card = \mtgsdk\Card::find($cardId);

                if ($card) {
                    \App\Models\CardStore::create([
                        'card_id' => $card->id,
                        'name' => $card->name,
                        'type' => $card->type ?? null,
                        'colors' => is_array($card->colors) ? implode(', ', $card->colors) : $card->colors,
                        'rarity' => $card->rarity ?? null,
                        'mana_cost' => $card->manaCost ?? null,
                        'text' => $card->text ?? null,
                        'power' => $card->power ?? null,
                        'toughness' => $card->toughness ?? null,
                        'image_url' => $card->imageUrl ?? null,
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error("Failed to fetch or store card {$cardId}: " . $e->getMessage());
                return redirect()->back()->with('error', 'Could not fetch card details.');
            }
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

        return redirect()->route('collection.index')->with('message', 'Card removed from your collection.');
    }
}
