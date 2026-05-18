<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Map product IDs to the correct image paths from your frontend
$imagePaths = [
    1 => '/images/medicines/Actron.jpeg',
    2 => '/images/medicines/averion.jpg',
    3 => '/images/medicines/brainsusp.jpeg',
    4 => '/images/medicines/brainzendrop.jpg',
    5 => '/images/medicines/cogniup.jpg',
    6 => '/images/medicines/DiazoneAct.jpeg',
    7 => '/images/medicines/galcimacd3.jpg',
    8 => '/images/medicines/galcimactab.jpg',
    9 => '/images/medicines/minarva.jpg',
    10 => '/images/medicines/liverish.jpg',
    11 => '/images/medicines/Melton.jpeg',
    12 => '/images/medicines/onea.jpg',
    13 => '/images/medicines/histatone.jpg',
    14 => '/images/medicines/caremyo.jpg',
    15 => '/images/medicines/growargin.jpeg',
    17 => '/images/medicines/gutsoft.jpg',
    18 => '/images/medicines/gutsoft2.jpeg',
    19 => '/images/medicines/reutisafe.jpg',
    20 => '/images/medicines/glan.jpg',
    21 => '/images/medicines/folmecp.jpg',
    22 => '/images/medicines/brainzen.jpeg'
];

foreach ($imagePaths as $id => $imagePath) {
    // Create full URL for frontend
    $imageUrl = 'http://localhost:8080' . $imagePath;
    $images = json_encode([$imageUrl]);
    
    $stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
    $stmt->execute([$images, $id]);
    
    echo "✅ Updated product ID $id with image: $imagePath\n";
}

// Verify the update
$count = $pdo->query("SELECT COUNT(*) FROM products WHERE images IS NOT NULL")->fetchColumn();
echo "\n🎉 Total products updated: $count\n";
echo "Now refresh your frontend at http://localhost:3000/products\n";
?>