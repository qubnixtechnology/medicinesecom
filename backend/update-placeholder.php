<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$imageUrl = 'http://localhost:8080/images/medicines/placeholder.jpg';
$images = json_encode([$imageUrl]);

$pdo->exec("UPDATE products SET images = '$images'");

echo "✅ Database updated with placeholder image!\n";
echo "Total products updated: " . $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn() . "\n";
?>