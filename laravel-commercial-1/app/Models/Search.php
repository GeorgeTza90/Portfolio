<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use mtgsdk\Card;
use mtgsdk\Set;

class Search extends Model
{
    public $timestamps = false;

    public static function getById($id)
    {
        return Card::find($id);
    }

    public static function getByName($name, $page, $pageSize)
    {
        return collect(Card::where(['name' => $name])->where(['page' => $page, 'pageSize' => $pageSize])->all());
    }

    public static function getByType($type, $page, $pageSize)
    {
        return collect(Card::where(['type' => $type])->where(['page' => $page, 'pageSize' => $pageSize])->all());
    }

    public static function getByColor($color, $page, $pageSize)
    {
        return collect(Card::where(['color' => $color])->where(['page' => $page, 'pageSize' => $pageSize])->all());
    }

    public static function getBySet($set, $page, $pageSize)
    {
        return collect(Card::where(['setName' => $set])->where(['page' => $page, 'pageSize' => $pageSize])->all());
    }

    public static function getBy($filter, $value, $page, $pageSize)
    {
        switch ($filter) {
            case 'id':
                return collect([self::getById($value)]);
            case 'name':
                return self::getByName($value, $page, $pageSize);
            case 'type':
                return self::getByType($value, $page, $pageSize);
            case 'color':
                return self::getByColor($value, $page, $pageSize);
            case 'set':
                return self::getBySet($value, $page, $pageSize);
            default:
                return collect();
        }
    }

    public static function getBySetName($setName, $page, $pageSize)
    {
        $set = collect(Set::where(['name' => $setName])->all());
        $cards = collect(Card::where(['setName' => $setName, 'page' => $page, 'pageSize' => $pageSize])->all());
        return [$set, $cards];
    }
}
