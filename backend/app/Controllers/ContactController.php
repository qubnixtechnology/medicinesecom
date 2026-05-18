<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use App\Utils\Helpers;
use PDO;

class ContactController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function submit() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            Response::error('Name, email and message are required', 400);
        }
        
        if (!Helpers::validateEmail($data['email'])) {
            Response::error('Invalid email format', 400);
        }
        
        $stmt = $this->db->prepare("
            INSERT INTO contacts (name, email, phone, subject, message, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        
        if ($stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['subject'] ?? null,
            $data['message']
        ])) {
            Response::success(null, 'Message sent successfully', 201);
        } else {
            Response::error('Failed to send message', 500);
        }
    }
}