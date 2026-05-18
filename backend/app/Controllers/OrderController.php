<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use App\Utils\Helpers;
use PDO;

class OrderController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function index() {
        $user = $GLOBALS['current_user'];
        
        if ($user['role'] === 'admin') {
            $stmt = $this->db->prepare("
                SELECT o.*, u.name as user_name, u.email as user_email
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                ORDER BY o.created_at DESC
            ");
            $stmt->execute();
        } else {
            $stmt = $this->db->prepare("
                SELECT * FROM orders 
                WHERE user_id = ? 
                ORDER BY created_at DESC
            ");
            $stmt->execute([$user['id']]);
        }
        
        $orders = $stmt->fetchAll();
        
        // Get items for each order
        foreach ($orders as &$order) {
            $stmt = $this->db->prepare("
                SELECT oi.*, p.name, p.price, p.images 
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ?
            ");
            $stmt->execute([$order['id']]);
            $order['items'] = $stmt->fetchAll();
            $order['items_count'] = count($order['items']);
        }
        
        Response::success($orders);
    }
    
    public function show($id) {
        $user = $GLOBALS['current_user'];
        
        $stmt = $this->db->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->execute([$id]);
        $order = $stmt->fetch();
        
        if (!$order) {
            Response::notFound('Order not found');
            return;
        }
        
        if ($user['role'] !== 'admin' && $order['user_id'] != $user['id']) {
            Response::forbidden('Access denied');
            return;
        }
        
        // Get items
        $stmt = $this->db->prepare("
            SELECT oi.*, p.name, p.price, p.images 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        ");
        $stmt->execute([$id]);
        $order['items'] = $stmt->fetchAll();
        
        Response::success($order);
    }
    
    public function store() {
        $user = $GLOBALS['current_user'];
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['items']) || empty($data['shipping_address'])) {
            Response::error('Items and shipping address required', 400);
            return;
        }
        
        // Calculate total
        $total = 0;
        foreach ($data['items'] as $item) {
            $stmt = $this->db->prepare("SELECT price FROM products WHERE id = ?");
            $stmt->execute([$item['product_id']]);
            $product = $stmt->fetch();
            if ($product) {
                $total += $product['price'] * $item['quantity'];
            }
        }
        
        $orderNumber = Helpers::generateOrderNumber();
        $status = 'pending';
        
        $this->db->beginTransaction();
        
        try {
            // Create order
            $stmt = $this->db->prepare("
                INSERT INTO orders (order_number, user_id, total, status, shipping_address, payment_method, notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $orderNumber,
                $user['id'],
                $total,
                $status,
                $data['shipping_address'],
                $data['payment_method'] ?? 'cod',
                $data['notes'] ?? null
            ]);
            
            $orderId = $this->db->lastInsertId();
            
            // Create order items
            foreach ($data['items'] as $item) {
                $stmt = $this->db->prepare("
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, (SELECT price FROM products WHERE id = ?))
                ");
                $stmt->execute([$orderId, $item['product_id'], $item['quantity'], $item['product_id']]);
            }
            
            $this->db->commit();
            
            Response::success([
                'order_id' => $orderId,
                'order_number' => $orderNumber,
                'total' => $total,
                'status' => $status
            ], 'Order created successfully', 201);
            
        } catch (\Exception $e) {
            $this->db->rollBack();
            Response::error('Failed to create order: ' . $e->getMessage(), 500);
        }
    }
    
    public function updateStatus($id) {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
            return;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['status'])) {
            Response::error('Status required', 400);
            return;
        }
        
        $stmt = $this->db->prepare("UPDATE orders SET status = ? WHERE id = ?");
        if ($stmt->execute([$data['status'], $id])) {
            Response::success(null, 'Order status updated');
        } else {
            Response::error('Failed to update order', 500);
        }
    }
}
?>