<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CardStore extends Model
{

    protected $table = 'card_store';

    protected $fillable = [
        'card_id',
        'name',
        'type',
        'colors',
        'rarity',
        'mana_cost',
        'text',
        'power',
        'toughness',
        'image_url'
    ];

    public function getColorsArrayAttribute()
    {
        return $this->colors ? explode(',', $this->colors) : [];
    }

    public function setColorsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['colors'] = implode(',', $value);
        } else {
            $this->attributes['colors'] = $value;
        }
    }
}
