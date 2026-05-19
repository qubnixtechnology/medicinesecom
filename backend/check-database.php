<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

echo "========== PRODUCTS ==========\n";
$products = $pdo->query("SELECT id, name, images FROM products LIMIT 5");
while($row = $products->fetch()) {
    echo "ID: {$row['id']} - {$row['name']}\n";
    echo "Images: {$row['images']}\n\n";
}

echo "\n========== ORDERS ==========\n";
$orders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
echo "Total orders: $orders\n";

echo "\n========== CATEGORIES ==========\n";
$categories = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
echo "Total categories: $categories\n";

echo "\n========== USERS ==========\n";
$users = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'customer'")->fetchColumn();
echo "Total customers: $users\n";

echo "\n========== MESSAGES ==========\n";
$messages = $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
echo "Total messages: $messages\n";
?>