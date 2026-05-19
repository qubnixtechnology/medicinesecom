<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Get all products
$products = $pdo->query("SELECT id, name, images FROM products");

while ($product = $products->fetch()) {
    $images = json_decode($product['images'], true);
    
    if ($images && count($images) > 0) {
        $oldUrl = $images[0];
        
        // Extract filename from URL
        if (preg_match('/file=([^&]+)/', $oldUrl, $matches)) {
            $fileName = urldecode($matches[1]);
        } else {
            $fileName = basename($oldUrl);
        }
        
        // Check if file exists in uploads folder
        $filePath = __DIR__ . '/public/uploads/products/' . $fileName;
        
        if (file_exists($filePath)) {
            // File exists, use serve-image.php
            $newUrl = 'http://localhost:8080/serve-image.php?file=' . urlencode($fileName);
        } else {
            // File doesn't exist, use placeholder
            $newUrl = 'http://localhost:8080/images/medicines/placeholder.jpg';
        }
        
        $newImages = json_encode([$newUrl]);
        $stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
        $stmt->execute([$newImages, $product['id']]);
        
        echo "✅ Fixed product ID {$product['id']}: {$product['name']}\n";
        echo "   Image URL: $newUrl\n\n";
    }
}

echo "\n🎉 All product images fixed!\n";
?>