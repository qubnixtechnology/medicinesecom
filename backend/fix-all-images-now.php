<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Use a reliable online placeholder for all products
$imageUrl = 'https://placehold.co/400x400/2563eb/white?text=Medicine';
$images = json_encode([$imageUrl]);

$pdo->exec("UPDATE products SET images = '$images'");

$count = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
echo "✅ Updated $count products with online images!\n";
echo "Now refresh your frontend at http://localhost:3000/products\n";
?>