<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Create categories table if not exists
$pdo->exec("
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
");

// Insert default categories
$categories = [
    ['Neurological Support', 'neurological-support', 'Brain and nerve health supplements'],
    ['Probiotics & Digestion', 'probiotics-digestion', 'Gut health and digestive enzymes'],
    ['Vitamin Supplements', 'vitamin-supplements', 'Essential vitamins and minerals'],
    ['Sleep Support', 'sleep-support', 'Natural sleep aids and relaxation'],
    ['Women Reproductive Health', 'women-reproductive-health', 'Women health and fertility support'],
    ['Nutritional Supplements', 'nutritional-supplements', 'Complete nutrition for all ages']
];

foreach ($categories as $cat) {
    $stmt = $pdo->prepare("INSERT IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)");
    $stmt->execute([$cat[0], $cat[1], $cat[2]]);
}

// Create orders table
$pdo->exec("
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cod',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
");

// Create order_items table
$pdo->exec("
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)
");

// Create contacts table for messages
$pdo->exec("
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
");

echo "✅ All tables created successfully!\n";
echo "Categories: " . $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn() . "\n";
echo "Orders: " . $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn() . "\n";
echo "Messages: " . $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn() . "\n";
?>