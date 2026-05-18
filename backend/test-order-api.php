<?php
require_once __DIR__ . '/app/Config/Database.php';
require_once __DIR__ . '/app/Utils/Helpers.php';

use App\Config\Database;
use App\Utils\Helpers;

$pdo = Database::getInstance()->getConnection();
echo "Database connected!\n";

// Test generate order number
$orderNumber = Helpers::generateOrderNumber();
echo "Generated order number: $orderNumber\n";

// Test insert order
try {
    $stmt = $pdo->prepare("INSERT INTO orders (order_number, user_id, total, status, shipping_address, payment_method, created_at) VALUES (?, 1, 100, 'pending', 'Test', 'cod', NOW())");
    $stmt->execute([$orderNumber]);
    echo "✅ Order inserted successfully! Order ID: " . $pdo->lastInsertId() . "\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}