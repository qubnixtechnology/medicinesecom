<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use PDO;

class BrandController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function index() {
        $stmt = $this->db->query("
            SELECT brand, COUNT(*) as product_count 
            FROM products 
            WHERE brand IS NOT NULL
            GROUP BY brand
            ORDER BY brand
        ");
        
        $brands = $stmt->fetchAll();
        Response::success($brands);
    }
    
    public function show($id) {
        // Get brand name and products
        $stmt = $this->db->prepare("
            SELECT p.* 
            FROM products p
            WHERE p.brand = (SELECT brand FROM products WHERE id = ? LIMIT 1)
        ");
        $stmt->execute([$id]);
        $products = $stmt->fetchAll();
        
        Response::success($products);
    }
}