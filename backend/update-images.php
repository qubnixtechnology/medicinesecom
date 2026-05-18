<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$imageUrl = 'https://placehold.co/400x400/2563eb/white?text=Medicine';
$images = json_encode([$imageUrl]);

$pdo->exec("UPDATE products SET images = '$images'");

echo "✅ All products updated with online images!\n";
echo "Now refresh your frontend at http://localhost:3000/products\n";
?>