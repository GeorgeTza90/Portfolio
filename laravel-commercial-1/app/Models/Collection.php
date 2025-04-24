<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'card_id',
    ];

    // Relationship to CardStore
    public function card()
    {
        return $this->belongsTo(CardStore::class, 'card_id', 'card_id');
    }
}