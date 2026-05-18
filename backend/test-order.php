<?php
require_once __DIR__ . '/app/Config/Database.php';
require_once __DIR__ . '/app/Utils/Response.php';
require_once __DIR__ . '/app/Utils/Helpers.php';

use App\Config\Database;
use App\Utils\Response;
use App\Utils\Helpers;

$pdo = Database::getInstance()->getConnection();
echo "Database connected!\n";

// Test creating an order manually
try {
    $orderNumber = Helpers::generateOrderNumber();
    echo "Order number: $orderNumber\n";
    
    $stmt = $pdo->prepare("INSERT INTO orders (order_number, user_id, total, status, shipping_address, payment_method) VALUES (?, 1, 100, 'pending', 'Test', 'cod')");
    $stmt->execute([$orderNumber]);
    echo "Order inserted successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>