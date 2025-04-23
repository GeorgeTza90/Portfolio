<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use mtgsdk\Card;

class Collection extends Model
{
    use HasFactory;

    public $timestamps = false;


    public static function get($cardIds)
    {
        $collection = [];

        foreach ($cardIds as $cardId) {
            $card = Card::find($cardId);
            if ($card) {
                $collection[] = $card;
            }
        }

        return $collection;
    }
}
