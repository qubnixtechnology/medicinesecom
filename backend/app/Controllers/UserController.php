<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use PDO;

class UserController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function index() {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        $stmt = $this->db->query("SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC");
        $users = $stmt->fetchAll();
        Response::success($users);
    }
}