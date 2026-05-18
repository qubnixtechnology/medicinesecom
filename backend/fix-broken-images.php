<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Get all products
$products = $pdo->query("SELECT id, name, images FROM products");

while ($product = $products->fetch()) {
    $images = json_decode($product['images'], true);
    
    if ($images && count($images) > 0) {
        $oldUrl = $images[0];
        
        // Check if it's an uploaded image (contains serve-image.php or uploads)
        if (strpos($oldUrl, 'serve-image.php') !== false || strpos($oldUrl, '/uploads/') !== false) {
            // Extract filename
            if (strpos($oldUrl, 'file=') !== false) {
                parse_str(parse_url($oldUrl, PHP_URL_QUERY), $params);
                $fileName = $params['file'] ?? '';
            } else {
                $fileName = basename($oldUrl);
            }
            
            // Check if file exists
            $filePath = __DIR__ . '/public/uploads/products/' . $fileName;
            if (file_exists($filePath)) {
                $newUrl = 'http://localhost:8080/serve-image.php?file=' . urlencode($fileName);
                $newImages = json_encode([$newUrl]);
                $stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
                $stmt->execute([$newImages, $product['id']]);
                echo "✅ Fixed: " . $product['name'] . "\n";
            } else {
                echo "⚠️ Missing file for: " . $product['name'] . " - $fileName\n";
            }
        }
    }
}

echo "\n🎉 Done!\n";
?>