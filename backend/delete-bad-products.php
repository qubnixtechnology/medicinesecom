<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Delete products with invalid IDs
$pdo->exec("DELETE FROM products WHERE id IN (39, 40)");
echo "✅ Deleted products 39 and 40\n";

// Reset AUTO_INCREMENT
$pdo->exec("ALTER TABLE products AUTO_INCREMENT = 23");
echo "✅ Reset auto increment to 23\n";

// Show remaining products
$products = $pdo->query("SELECT id, name FROM products ORDER BY id")->fetchAll();
echo "\nRemaining products:\n";
foreach($products as $p) {
    echo "ID: {$p['id']} - {$p['name']}\n";
}
?>