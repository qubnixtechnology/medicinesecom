<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use PDO;

class CategoryController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function index() {
        $stmt = $this->db->query("
            SELECT c.*, COUNT(p.id) as product_count 
            FROM categories c
            LEFT JOIN products p ON c.slug = p.category_slug
            GROUP BY c.id
            ORDER BY c.name
        ");
        
        $categories = $stmt->fetchAll();
        Response::success($categories);
    }
    
    public function show($id) {
        $stmt = $this->db->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch();
        
        if (!$category) {
            Response::notFound('Category not found');
        }
        
        Response::success($category);
    }
}