<?php
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$pdo->exec($sql);
echo "✅ Gallery table created successfully!\n";
?>