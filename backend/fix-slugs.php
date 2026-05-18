<?php
$pdo = new PDO('mysql:host=localhost;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$products = $pdo->query('SELECT id, name, slug FROM products ORDER BY id');
$slugs = [];

while($row = $products->fetch()) {
    if (in_array($row['slug'], $slugs)) {
        $newSlug = $row['slug'] . '-' . rand(100, 999);
        $stmt = $pdo->prepare('UPDATE products SET slug = ? WHERE id = ?');
        $stmt->execute([$newSlug, $row['id']]);
        echo 'Fixed: ' . $row['name'] . ' - new slug: ' . $newSlug . "\n";
    } else {
        $slugs[] = $row['slug'];
        echo 'OK: ' . $row['name'] . ' - slug: ' . $row['slug'] . "\n";
    }
}

echo "\n✅ Done! Now you can add products without duplicate slug errors.\n";
?>