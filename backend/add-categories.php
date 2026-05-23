<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Clear existing categories
$pdo->exec("DELETE FROM categories");

// Insert all categories
$categories = [
    ['Neurological Support', 'neurological-support', 'Brain and nerve health supplements'],
    ['Probiotics & Digestion', 'probiotics-digestion', 'Gut health and digestive enzymes'],
    ['Vitamin Supplements', 'vitamin-supplements', 'Essential vitamins and minerals'],
    ['Sleep Support', 'sleep-support', 'Natural sleep aids and relaxation'],
    ['Women Health', 'women-health', 'Women health and fertility support'],
    ['Nutritional Supplements', 'nutritional-supplements', 'Complete nutrition for all ages']
];

$stmt = $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)");

foreach ($categories as $cat) {
    $stmt->execute([$cat[0], $cat[1], $cat[2]]);
    echo "✅ Added category: " . $cat[0] . "\n";
}

echo "\n🎉 Total categories: " . $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn() . "\n";
?>