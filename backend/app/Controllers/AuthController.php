<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use App\Utils\JWT;
use App\Utils\Helpers;
use PDO;

class AuthController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function register() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Log received data for debugging
        error_log(print_r($data, true));
        
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            Response::error('Name, email and password are required', 400);
            return;
        }
        
        if (!Helpers::validateEmail($data['email'])) {
            Response::error('Invalid email format', 400);
            return;
        }
        
        // Check if user exists
        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            Response::error('Email already registered', 409);
            return;
        }
        
        // Create user
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $role = $data['role'] ?? 'customer';
        
        $stmt = $this->db->prepare("
            INSERT INTO users (name, email, password, role, phone, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        
        if ($stmt->execute([$data['name'], $data['email'], $hashedPassword, $role, $data['phone'] ?? null])) {
            $userId = $this->db->lastInsertId();
            
            // Generate token
            $token = JWT::encode([
                'id' => $userId,
                'email' => $data['email'],
                'name' => $data['name'],
                'role' => $role
            ]);
            
            Response::success([
                'token' => $token,
                'user' => [
                    'id' => $userId,
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => $role
                ]
            ], 'Registration successful', 201);
        } else {
            Response::error('Registration failed', 500);
        }
    }
    
    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['email']) || empty($data['password'])) {
            Response::error('Email and password required', 400);
            return;
        }
        
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($data['password'], $user['password'])) {
            Response::error('Invalid credentials', 401);
            return;
        }
        
        // Generate token
        $token = JWT::encode([
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'role' => $user['role']
        ]);
        
        Response::success([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ], 'Login successful');
    }
    
    public function me() {
        $user = $GLOBALS['current_user'];
        Response::success($user);
    }
}
?>