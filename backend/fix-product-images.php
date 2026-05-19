<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Fix images for products with invalid image names
$placeholder = 'http://localhost:8080/images/medicines/placeholder.jpg';
$images = json_encode([$placeholder]);

$stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id IN (39, 40)");
$stmt->execute([$images]);

echo "✅ Fixed images for products 39 and 40\n";

// Also fix any products with empty or null images
$pdo->exec("UPDATE products SET images = '$images' WHERE images IS NULL OR images = '' OR images = '[]'");

echo "✅ Fixed all products with missing images\n";

// Show count of products
$count = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
echo "Total products in database: $count\n";
?>