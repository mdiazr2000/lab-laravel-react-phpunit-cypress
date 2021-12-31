<?php


namespace Tests\Traits;

use App\Models\Business;
use App\Models\OnlineStudio;
use App\Models\Studio;
use App\Models\Provider;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;

trait FixturesForRegisterUser
{
    use WithFaker;


    private function prepareDataForRequest(): array
    {

        $name = $this->faker->name;
        $email = $this->faker->email;
        $password = '123';

        return [
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'password_confirmation' => $password

        ];
    }


}
