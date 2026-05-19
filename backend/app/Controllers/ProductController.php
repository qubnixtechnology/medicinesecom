<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use App\Utils\Helpers;
use PDO;

class ProductController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function index() {
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
        $offset = ($page - 1) * $limit;
        
        $where = [];
        $params = [];
        
        // Filter by category
        if (isset($_GET['category']) && $_GET['category'] !== 'all') {
            $where[] = "p.category_slug = ?";
            $params[] = $_GET['category'];
        }
        
        // Filter by brand
        if (isset($_GET['brand'])) {
            $where[] = "p.brand = ?";
            $params[] = $_GET['brand'];
        }
        
        // Search query
        if (isset($_GET['search'])) {
            $where[] = "(p.name LIKE ? OR p.description LIKE ?)";
            $params[] = "%{$_GET['search']}%";
            $params[] = "%{$_GET['search']}%";
        }
        
        // Price range
        if (isset($_GET['min_price'])) {
            $where[] = "p.price >= ?";
            $params[] = $_GET['min_price'];
        }
        if (isset($_GET['max_price'])) {
            $where[] = "p.price <= ?";
            $params[] = $_GET['max_price'];
        }
        
        $whereClause = empty($where) ? "" : "WHERE " . implode(" AND ", $where);
        
        // Get total count
        $countQuery = "SELECT COUNT(*) as total FROM products p $whereClause";
        $stmt = $this->db->prepare($countQuery);
        $stmt->execute($params);
        $total = $stmt->fetch()['total'];
        
        // Get products
        $query = "
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            $whereClause
            ORDER BY p.id DESC
            LIMIT $limit OFFSET $offset
        ";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $products = $stmt->fetchAll();
        
        Response::success([
            'products' => $products,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $limit,
                'total' => (int)$total,
                'total_pages' => ceil($total / $limit)
            ]
        ]);
    }
    
    public function show($id) {
        $stmt = $this->db->prepare("
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            WHERE p.id = ? OR p.slug = ?
        ");
        $stmt->execute([$id, $id]);
        $product = $stmt->fetch();
        
        if (!$product) {
            Response::error('Product not found', 404);
        }
        
        Response::success($product);
    }
    
    public function store() {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['name']) || empty($data['price'])) {
            Response::error('Name and price are required', 400);
        }
        
        $slug = Helpers::slugify($data['name']);
        
        $stmt = $this->db->prepare("
            INSERT INTO products (name, slug, description, price, category, category_slug, brand, volume, is_prescription_required, images, stock, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        
        if ($stmt->execute([
            $data['name'],
            $slug,
            $data['description'] ?? null,
            $data['price'],
            $data['category'] ?? null,
            $data['categorySlug'] ?? null,
            $data['brand'] ?? null,
            $data['volume'] ?? null,
            $data['isPrescriptionRequired'] ?? 0,
            json_encode($data['images'] ?? []),
            $data['stock'] ?? 0
        ])) {
            Response::success(['id' => $this->db->lastInsertId()], 'Product created', 201);
        } else {
            Response::error('Failed to create product', 500);
        }
    }
    
    public function update($id) {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        $updates = [];
        $params = [];
        
        $allowedFields = ['name', 'description', 'price', 'category', 'category_slug', 'brand', 'volume', 'is_prescription_required', 'stock'];
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updates[] = "$field = ?";
                $params[] = $data[$field];
            }
        }
        
        if (isset($data['images'])) {
            $updates[] = "images = ?";
            $params[] = json_encode($data['images']);
        }
        
        if (empty($updates)) {
            Response::error('No fields to update', 400);
        }
        
        $params[] = $id;
        $query = "UPDATE products SET " . implode(", ", $updates) . " WHERE id = ?";
        $stmt = $this->db->prepare($query);
        
        if ($stmt->execute($params)) {
            Response::success(null, 'Product updated');
        } else {
            Response::error('Failed to update product', 500);
        }
    }
    
    public function destroy($id) {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        $stmt = $this->db->prepare("DELETE FROM products WHERE id = ?");
        if ($stmt->execute([$id])) {
            Response::success(null, 'Product deleted');
        } else {
            Response::error('Failed to delete product', 500);
        }
    }
}