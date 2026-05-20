<?php
$host = 'localhost';
$dbname = 'u276796116_Medicine';
$user = 'u276796116_Medicine';
$pass = 'Medicine1@1234';
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Seed admin user
    $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("
        INSERT IGNORE INTO users (name, email, password, role) 
        VALUES ('Admin', 'admin@medicine.com', ?, 'admin')
    ");
    $stmt->execute([$hashedPassword]);
    
    // Seed categories
    $categories = [
        ['Nutritional Supplements', 'nutritional-supplements'],
        ['Neurological Support', 'neurological-support'],
        ['Probiotics & Digestion', 'probiotics-digestion'],
        ['Vitamin Supplements', 'vitamin-supplements']
    ];
    
    foreach ($categories as $cat) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO categories (name, slug) VALUES (?, ?)");
        $stmt->execute([$cat[0], $cat[1]]);
    }
    
    // Seed products (27 Glance Healthcare products)
    $products = [
        ['ACTRON Syrup', 'actron-syrup', 'Nutritional Supplements', 'nutritional-supplements', 'Glance Healthcare', 178.13, false, '225ml'],
        ['AVERION Suspension', 'averion-suspension', 'Neurological Support', 'neurological-support', 'Glance Healthcare', 395, true, '200ml'],
        ['BRAIN ZEN Suspension', 'brain-zen-suspension', 'Neurological Support', 'neurological-support', 'Glance Healthcare', 1055, true, '150ml'],
        ['BRAIN ZEN Drops', 'brain-zen-drops', 'Neurological Support', 'neurological-support', 'Glance Healthcare', 222, false, '30ml'],
        ['COGNI UP Syrup', 'cogni-up-syrup', 'Neurological Support', 'neurological-support', 'Glance Healthcare', 1059, false, '200ml'],
        ['DIAZONE ACT Syrup', 'diazone-act-syrup', 'Probiotics & Digestion', 'probiotics-digestion', 'Glance Healthcare', 180, false, '200ml'],
        ['GALCIMAC D3 Syrup', 'galcimac-d3-syrup', 'Vitamin Supplements', 'vitamin-supplements', 'Glance Healthcare', 185, false, '200ml'],
        ['GALCIMAC D3 Tablets', 'galcimac-d3-tablets', 'Vitamin Supplements', 'vitamin-supplements', 'Glance Healthcare', 298, false, "1*10'S"],
        ['MINARVA ACT Syrup', 'minarva-act-syrup', 'Neurological Support', 'neurological-support', 'Glance Healthcare', 190, true, '200ml'],
        ['LIVERISH Syrup', 'liverish-syrup', 'Nutritional Supplements', 'nutritional-supplements', 'Glance Healthcare', 195, false, '200ml']
    ];
    
    foreach ($products as $product) {
        $stmt = $pdo->prepare("
            INSERT IGNORE INTO products (name, slug, category, category_slug, brand, price, is_prescription_required, volume, stock) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 100)
        ");
        $stmt->execute([$product[0], $product[1], $product[2], $product[3], $product[4], $product[5], $product[6], $product[7]]);
    }
    
    echo "✅ Database seeded successfully!\n";
    echo "   Admin: admin@glance.com / admin123\n";
    echo "   Products seeded: " . count($products) . "\n";
    
} catch (PDOException $e) {
    die("❌ Seeding failed: " . $e->getMessage() . "\n");
}
?>