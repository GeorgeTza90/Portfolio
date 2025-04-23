<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;

class CollectionSeeder extends Seeder
{
    public function run()
    {
        // Example: Seed 10 collections
        Collection::factory(10)->create();
    }
}
