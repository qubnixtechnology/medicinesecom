<?php
$pdo = new PDO('mysql:host=localhost;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Only missing products (11-22)
$products = [
    ['id' => 11, 'name' => 'MELTON 9 Syrup', 'slug' => 'melton-9-syrup', 'category' => 'Sleep Support', 'category_slug' => 'sleep-support', 'brand' => 'Glance Healthcare', 'price' => 270, 'prescription' => 0, 'volume' => '200ml', 'image' => '/images/medicines/Melton.jpeg'],
    ['id' => 12, 'name' => 'ONE-A Solutions', 'slug' => 'one-a-solutions', 'category' => 'Vitamin Supplements', 'category_slug' => 'vitamin-supplements', 'brand' => 'Glance Healthcare', 'price' => 275, 'prescription' => 0, 'volume' => '4ml', 'image' => '/images/medicines/onea.jpg'],
    ['id' => 13, 'name' => 'HistaTone Syrup', 'slug' => 'histatone-syrup', 'category' => 'Nutritional Supplements', 'category_slug' => 'nutritional-supplements', 'brand' => 'Glance Healthcare', 'price' => 550, 'prescription' => 0, 'volume' => '200ml', 'image' => '/images/medicines/histatone.jpg'],
    ['id' => 14, 'name' => 'CARE MYO Sachets', 'slug' => 'care-myo-sachets', 'category' => 'Women Reproductive Health', 'category_slug' => 'women-reproductive-health', 'brand' => 'Glance Healthcare', 'price' => 75, 'prescription' => 0, 'volume' => '5 GM', 'image' => '/images/medicines/caremyo.jpg'],
    ['id' => 15, 'name' => 'GrowArgin Granules', 'slug' => 'growargin-sachets', 'category' => 'Nutritional Supplements', 'category_slug' => 'nutritional-supplements', 'brand' => 'Glance Healthcare', 'price' => 66, 'prescription' => 0, 'volume' => '5 GM', 'image' => '/images/medicines/growargin.jpeg'],
    ['id' => 17, 'name' => 'GUTSOFT Digestive Comfort Drops', 'slug' => 'gutsoft-drops', 'category' => 'Probiotics & Digestion', 'category_slug' => 'probiotics-digestion', 'brand' => 'Glance Healthcare', 'price' => 285, 'prescription' => 0, 'volume' => '10ml', 'image' => '/images/medicines/gutsoft.jpg'],
    ['id' => 18, 'name' => 'GUTSOFT DRY SYRUP', 'slug' => 'gutsoft-dry-drops', 'category' => 'Probiotics & Digestion', 'category_slug' => 'probiotics-digestion', 'brand' => 'Glance Healthcare', 'price' => 290, 'prescription' => 0, 'volume' => '10ml', 'image' => '/images/medicines/gutsoft2.jpeg'],
    ['id' => 19, 'name' => 'REUTISAFE Drops', 'slug' => 'reutisafe-drops', 'category' => 'Probiotics & Digestion', 'category_slug' => 'probiotics-digestion', 'brand' => 'Glance Healthcare', 'price' => 450, 'prescription' => 0, 'volume' => '5ml', 'image' => '/images/medicines/reutisafe.jpg'],
    ['id' => 20, 'name' => 'GLAN-C Drops', 'slug' => 'glan-c-drops', 'category' => 'Vitamin Supplements', 'category_slug' => 'vitamin-supplements', 'brand' => 'Glance Healthcare', 'price' => 130, 'prescription' => 0, 'volume' => '30ml', 'image' => '/images/medicines/glan.jpg'],
    ['id' => 21, 'name' => 'FOLMEC-P Syrup', 'slug' => 'folmecp-syrup', 'category' => 'Neurological Support', 'category_slug' => 'neurological-support', 'brand' => 'Glance Healthcare', 'price' => 295, 'prescription' => 1, 'volume' => '100ml', 'image' => '/images/medicines/folmecp.jpg'],
    ['id' => 22, 'name' => 'BRAIN ZEN Capsules', 'slug' => 'brain-zen-capsules', 'category' => 'Neurological Support', 'category_slug' => 'neurological-support', 'brand' => 'Glance Healthcare', 'price' => 545, 'prescription' => 0, 'volume' => '30 Capsules', 'image' => '/images/medicines/brainzen.jpeg']
];

foreach ($products as $product) {
    $images = json_encode([$product['image']]);
    
    $check = $pdo->prepare("SELECT id FROM products WHERE id = ?");
    $check->execute([$product['id']]);
    
    if ($check->rowCount() > 0) {
        // Update existing
        $stmt = $pdo->prepare("
            UPDATE products SET 
            name = ?, slug = ?, category = ?, category_slug = ?, 
            brand = ?, price = ?, is_prescription_required = ?, 
            volume = ?, images = ?, stock = 100, updated_at = NOW()
            WHERE id = ?
        ");
    } else {
        // Insert new
        $stmt = $pdo->prepare("
            INSERT INTO products (id, name, slug, category, category_slug, brand, price, is_prescription_required, volume, images, stock, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 100, NOW(), NOW())
        ");
    }
    
    $stmt->execute([
        $product['id'], $product['name'], $product['slug'], 
        $product['category'], $product['category_slug'], $product['brand'],
        $product['price'], $product['prescription'], $product['volume'], $images
    ]);
    
    echo "✅ Product ID {$product['id']}: {$product['name']}\n";
}

echo "\n🎉 All missing products added!\n";
$total = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
echo "Total products in database: $total\n";
?>