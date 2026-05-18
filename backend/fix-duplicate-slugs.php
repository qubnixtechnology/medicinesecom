<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$products = $pdo->query("SELECT id, name, slug FROM products ORDER BY id");
$slugs = [];

while ($product = $products->fetch()) {
    if (in_array($product['slug'], $slugs)) {
        $newSlug = $product['slug'] . '-' . rand(100, 999);
        $stmt = $pdo->prepare("UPDATE products SET slug = ? WHERE id = ?");
        $stmt->execute([$newSlug, $product['id']]);
        echo "Fixed duplicate: " . $product['name'] . " -> new slug: $newSlug\n";
    } else {
        $slugs[] = $product['slug'];
        echo "OK: " . $product['name'] . " -> slug: " . $product['slug'] . "\n";
    }
}

echo "\n✅ All duplicate slugs fixed!\n";
?>