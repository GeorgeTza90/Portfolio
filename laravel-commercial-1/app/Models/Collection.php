<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use mtgsdk\Card;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Collection extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static function get($cardIds)
    {
        $collection = [];

        foreach ($cardIds as $cardId) {
            $card = Cache::remember("mtg_card_{$cardId}", now()->addHours(6), function () use ($cardId) {
                try {
                    return Card::find($cardId);
                } catch (\Exception $e) {
                    Log::error("MTG API error for card {$cardId}: " . $e->getMessage());
                    return null;
                }
            });

            if ($card) {
                $collection[] = $card;
            }
        }

        return $collection;
    }
}