<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Search;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = trim($request->input('query'));
        $filter = $request->input('filter', 'name');
        $page = (int) $request->input('page', 1);
        $pageSize = (int) $request->input('pageSize', 30);
        $results = collect();
        $allowedFilters = ['name', 'type', 'color', 'id', 'set'];

        if ($query && in_array($filter, $allowedFilters)) {
            $results = Search::getBy($filter, $query, $page, $pageSize, );
        }

        return view('search.index', [
            'heading' => 'Find Cards',
            'title' => 'Search Page',
            'text' => 'Let’s find some cards...',
            'query' => $query,
            'results' => $results,
        ]);
    }

    public function show($cardId)
    {
        $card = Search::getById($cardId);

        return view('search.show', [
            'heading' => $card->name,
            'title' => 'Card Page',
            'card' => $card,
        ]);
    }

    public function showBySet(Request $request, $setName)
    {
        $page = (int) $request->input('page', 1);
        $pageSize = (int) $request->input('pageSize', 30);
        $results = Search::getBySetName($setName, $page, $pageSize);
        $set = $results[0];
        $cards = $results[1];

        return view('search.bySet', [
            'heading' => $setName,
            'title' => 'Set Page',
            'text' => 'Release date: ' . $set[0]->releaseDate . ', set type: ' . $set[0]->type,
            'set' => $set,
            'cards' => $cards,
            'setName' => $setName
        ]);
    }
}
