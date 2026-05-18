<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$products = $pdo->query("SELECT id, name, images FROM products");

while ($product = $products->fetch()) {
    $images = json_decode($product['images'], true);
    
    if ($images && count($images) > 0) {
        $oldPath = $images[0];
        $fileName = basename($oldPath);
        $newUrl = 'http://localhost:8080/serve-image.php?file=' . urlencode($fileName);
        $newImages = json_encode([$newUrl]);
        
        $stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
        $stmt->execute([$newImages, $product['id']]);
        
        echo "✅ Fixed: " . $product['name'] . "\n";
    }
}

echo "\n🎉 All done!\n";
?>