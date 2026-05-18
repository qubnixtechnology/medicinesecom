<?php
$pdo = new PDO('mysql:host=localhost;port=3307;dbname=glance_db', 'root', '');
$images = json_encode(['https://placehold.co/400x400/2563eb/white?text=Medicine']);
$stmt = $pdo->prepare('UPDATE products SET images = ?');
$stmt->execute([$images]);
echo '✅ Images added to all products!';
?>