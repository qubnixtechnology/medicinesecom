<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Map product IDs to actual image filenames
$realImages = [
    22 => 'brain-zen-capsules.jpg',
    21 => 'folmecp-syrup.jpg',
    20 => 'glan-c-drops.jpg',
    19 => 'reutisafe-drops.jpg',
    18 => 'gutsoft-dry-syrup.jpg',
    17 => 'gutsoft-drops.jpg',
    15 => 'growargin-granules.jpg',
    14 => 'care-myo-sachets.jpg',
    13 => 'histatone-syrup.jpg',
    12 => 'one-a-solutions.jpg',
    11 => 'melton-9-syrup.jpg',
    10 => 'liverish-syrup.jpg',
    9 => 'minarva-act-syrup.jpg',
    8 => 'galcimac-d3-tablets.jpg',
    7 => 'galcimac-d3-syrup.jpg',
    6 => 'diazone-act-syrup.jpg',
    5 => 'cogni-up-syrup.jpg',
    4 => 'brain-zen-drops.jpg',
    3 => 'brain-zen-suspension.jpg',
    2 => 'averion-suspension.jpg',
    1 => 'actron-syrup.jpg'
];

foreach ($realImages as $id => $imageFile) {
    // Check if image exists in the folder
    $imagePath = __DIR__ . '/public/images/medicines/' . $imageFile;
    if (file_exists($imagePath)) {
        $imageUrl = 'http://localhost:8080/images/medicines/' . $imageFile;
        $images = json_encode([$imageUrl]);
        
        $stmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
        $stmt->execute([$images, $id]);
        
        echo "✅ Updated product ID $id with image: $imageFile\n";
    } else {
        echo "⚠️ Image not found for product ID $id: $imageFile\n";
        echo "   Please copy this image to: " . $imagePath . "\n";
    }
}

echo "\n🎉 Process completed!\n";
?>