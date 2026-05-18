<?php
$pdo = new PDO('mysql:host=localhost;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

echo "\n========== DATABASE SUMMARY ==========\n";
echo "Products: " . $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn() . "\n";
echo "Users: " . $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn() . "\n";
echo "Orders: " . $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn() . "\n";
echo "Messages: " . $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn() . "\n";

echo "\n========== ALL USERS ==========\n";
$users = $pdo->query("SELECT id, name, email, role, phone FROM users");
while($row = $users->fetch()) {
    echo $row['id'] . ". " . $row['name'] . " - " . $row['email'] . " (" . $row['role'] . ") - Phone: " . ($row['phone'] ?? 'N/A') . "\n";
}

echo "\n========== ALL PRODUCTS ==========\n";
$products = $pdo->query("SELECT id, name, price, stock FROM products ORDER BY id");
while($row = $products->fetch()) {
    echo $row['id'] . ". " . $row['name'] . " - ₹" . $row['price'] . " (Stock: " . $row['stock'] . ")\n";
}

echo "\n========== RECENT ORDERS ==========\n";
$orders = $pdo->query("SELECT id, order_number, total, status, created_at FROM orders ORDER BY id DESC LIMIT 5");
while($row = $orders->fetch()) {
    echo $row['id'] . ". Order: " . $row['order_number'] . " - ₹" . $row['total'] . " - Status: " . $row['status'] . " - Date: " . $row['created_at'] . "\n";
}

echo "\n========== RECENT MESSAGES ==========\n";
$messages = $pdo->query("SELECT id, name, email, message, created_at FROM contacts ORDER BY id DESC LIMIT 5");
while($row = $messages->fetch()) {
    echo $row['id'] . ". " . $row['name'] . " (" . $row['email'] . "): " . substr($row['message'], 0, 50) . "... - " . $row['created_at'] . "\n";
}

echo "\n=====================================\n";
?>