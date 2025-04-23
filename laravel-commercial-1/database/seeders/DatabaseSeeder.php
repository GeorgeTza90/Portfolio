<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\CollectionSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(CollectionSeeder::class);
    }
}
