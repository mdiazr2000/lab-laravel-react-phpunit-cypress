Create database with name: laravel

php artisan migrate:refresh

php artisan serve

php artisan queue:listen

For websocket

Laravel WebSockets can be installed via composer:

composer require beyondcode/laravel-websockets
The package will automatically register a service provider.

This package comes with a migration to store statistic information while running your WebSocket server. You can publish the migration file using:

php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"
Run the migrations with:

php artisan migrate
Next, you need to publish the WebSocket configuration file:

php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"

composer require pusher/pusher-php-server "~3.0"

BROADCAST_DRIVER=pusher

PUSHER_APP_ID=insta_pusher
PUSHER_APP_KEY=123456_key
PUSHER_APP_SECRET=123456_secret_abc
PUSHER_APP_CLUSTER=mt1

'pusher' => [
        'driver'  => 'pusher',
        'key'     => env('PUSHER_APP_KEY'),
        'secret'  => env('PUSHER_APP_SECRET'),
        'app_id'  => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'useTLS'  => true,
            'host' => '127.0.0.1',
            'port' => 6001,
            'scheme' => 'http',
            'useTLS' => false,
        ],
],

Start the server
php artisan websockets:serve

See dashboard
The default location of the WebSocket dashboard is at SERVER_URL/laravel-websockets
Ex: http://127.0.0.1:8000/laravel-websockets
