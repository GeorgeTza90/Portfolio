<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardStoreTable extends Migration
{
    public function up()
    {
        Schema::create('card_store', function (Blueprint $table) {
            $table->id();
            $table->string('card_id')->unique();
            $table->string('name');
            $table->string('type')->nullable();
            $table->string('colors')->nullable();
            $table->string('rarity')->nullable();
            $table->string('mana_cost')->nullable();
            $table->text('text')->nullable();
            $table->string('power')->nullable();
            $table->string('toughness')->nullable();
            $table->string('image_url', 512)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('card_store');
    }
}
