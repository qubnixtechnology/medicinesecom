<?php
namespace App\Config;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $connection;
      
    private function __construct() {
        $host = 'localhost';
        $port = 3307;
        $dbname = 'glance_db';
        $user = 'root';
        $pass = '';
        
        try {
            $this->connection = new PDO(
                "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e) {
            die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage( )]));
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
}
?>