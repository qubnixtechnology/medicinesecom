<?php
namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use PDO;

class DashboardController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function stats() {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        // Total products
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM products");
        $totalProducts = $stmt->fetch()['total'];
        
        // Total orders
        $stmt = $this->db->query("SELECT COUNT(*) as total, SUM(total) as revenue FROM orders WHERE status != 'cancelled'");
        $orderStats = $stmt->fetch();
        
        // Total users
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM users WHERE role = 'customer'");
        $totalUsers = $stmt->fetch()['total'];
        
        // Recent orders
        $stmt = $this->db->query("
            SELECT o.*, u.name as user_name 
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC 
            LIMIT 10
        ");
        $recentOrders = $stmt->fetchAll();
        
        // Monthly revenue (last 6 months)
        $stmt = $this->db->query("
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month,
                SUM(total) as revenue,
                COUNT(*) as orders
            FROM orders
            WHERE status != 'cancelled'
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month DESC
            LIMIT 6
        ");
        $monthlyStats = $stmt->fetchAll();
        
        Response::success([
            'total_products' => (int)$totalProducts,
            'total_orders' => (int)$orderStats['total'],
            'total_revenue' => (float)($orderStats['revenue'] ?? 0),
            'total_users' => (int)$totalUsers,
            'recent_orders' => $recentOrders,
            'monthly_stats' => $monthlyStats
        ]);
    }
}