<?php
namespace App\Utils;

class JWT {
    private static $secret;
    private static $expiry;
    
    public static function init() {
        self::$secret = $_ENV['JWT_SECRET'] ?? 'your-super-secret-key-change-this';
        self::$expiry = intval($_ENV['JWT_EXPIRY'] ?? 86400);
    }
    
    public static function encode($data) {
        self::init();
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'iat' => time(),
            'exp' => time() + self::$expiry,
            'data' => $data
        ]);
        
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }
    
    public static function decode($token) {
        self::init();
        
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
        
        if (!$payload || $payload['exp'] < time()) {
            return null;
        }
        
        return $payload['data'] ?? null;
    }
    
    public static function getBearerToken() {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return $matches[1];
        }
        return null;
    }
}
?>