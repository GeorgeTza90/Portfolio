<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Example: Manually create users
        User::firstOrCreate(['email' => 'test@example.com'], [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
    }
}
