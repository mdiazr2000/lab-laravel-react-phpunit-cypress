<?php


namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Tests\Traits\FixturesForRegisterUser;
use Tests\Utils\DataProviders\Provider;

class UserTest extends TestCase
{
    use FixturesForRegisterUser;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_register()
    {
        $request = $this->prepareDataForRequest();

        $response = $this->post(Provider::$APP_URL_PREFIX . "/register", $request, Provider::getHeaders());

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'The user has been registered'
            ])->assertJsonFragment([
                "name" => $request['name'],
                "email"=> $request['email'],
            ]);

       $objResponse = json_decode((string) $response->getContent(), true);
       return $objResponse['user'];
    }

    /**
     * A basic test example.
     * @depends test_register
     *
     * @param $userRegister
     * @return void
     */
    public function test_login($userRegister)
    {

        $request = [
            'email' => $userRegister['email'],
            'password' => '123'
        ];
        $response = $this->post(Provider::$APP_URL_PREFIX . "/login", $request, Provider::getHeaders());

        $response->assertJsonStructure([
            'access_token','token_type', 'expires_in'
        ]);

    }

    /**
     * A basic test example.
     * @depends test_register
     * @return void
     */
    public function test_register_twice_dont_allow()
    {
        $request = $this->prepareDataForRequest();
        $userData = User::first();
        $request['email'] = $userData->email;

        $response = $this->post(Provider::$APP_URL_PREFIX . "/register", $request, Provider::getHeaders());

        $response
            ->assertStatus(422)
           // ->assertJsonValidationErrorFor('email')
          //  ->assertJsonValidationErrors('email','The Email has already been taken')
            ->assertJson([
                'message' => 'Invalid data send'
            ])
            ->assertJsonFragment([
                "email" => ['The Email has already been taken.'],
            ]);

    }

}
