<?php
namespace App\Middleware;

use App\Utils\Response;
use App\Utils\JWT;

class Auth {
    public function handle($requiredRole = null) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        }
        
        if (!$token) {
            Response::unauthorized('No token provided');
            return false;
        }
        
        $user = JWT::decode($token);
        
        if (!$user) {
            Response::unauthorized('Invalid token');
            return false;
        }
        
        // Store user in global context
        $GLOBALS['current_user'] = $user;
        
        if ($requiredRole && $user['role'] !== $requiredRole) {
            Response::forbidden('Insufficient permissions');
            return false;
        }
        
        return true;
    }
}