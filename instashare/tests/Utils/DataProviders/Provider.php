<?php

namespace Tests\Utils\DataProviders;


class Provider
{
    static $APP_URL_PREFIX = 'api';

    public static function getHeaders(): array
    {
        return [
            "Accept" => "application/json",
            "Content-Type" => "application/x-www-form-urlencoded"
        ];
    }

    public static function getHeadersWithToken($token): array
    {
        return [
            "Accept" => "application/json",
            "Content-Type" => "application/json",
            "Authorization" => "Bearer {$token}",
        ];
    }

    public static function getHeadersContentTypeJson(): array
    {
        return [
            "Accept" => "*/*",
            "Content-Type" => "application/json"
        ];
    }
}
