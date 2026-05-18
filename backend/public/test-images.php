<!DOCTYPE html>
<html>
<head>
    <title>Test Images</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .image-box { display: inline-block; margin: 10px; text-align: center; }
        img { max-width: 150px; max-height: 150px; border: 1px solid #ddd; padding: 5px; }
    </style>
</head>
<body>
    <h1>Image Test - Check where your images are</h1>
    
    <h2>1. Check uploads/products folder:</h2>
    <?php
    $uploadDir = __DIR__ . '/uploads/products/';
    if (is_dir($uploadDir)) {
        $files = scandir($uploadDir);
        $found = false;
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $found = true;
                echo '<div class="image-box">';
                echo '<img src="/uploads/products/' . $file . '"><br>';
                echo '<code>' . $file . '</code>';
                echo '</div>';
            }
        }
        if (!$found) echo '<p>No images found in uploads/products/ folder</p>';
    } else {
        echo '<p>Uploads folder does not exist: ' . $uploadDir . '</p>';
    }
    ?>
    
    <h2>2. Check images/medicines folder:</h2>
    <?php
    $medicinesDir = __DIR__ . '/images/medicines/';
    if (is_dir($medicinesDir)) {
        $files = scandir($medicinesDir);
        $found = false;
        foreach ($files as $file) {
            if ($file != '.' && $file != '..' && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
                $found = true;
                echo '<div class="image-box">';
                echo '<img src="/images/medicines/' . $file . '"><br>';
                echo '<code>' . $file . '</code>';
                echo '</div>';
            }
        }
        if (!$found) echo '<p>No images found in images/medicines/ folder</p>';
    } else {
        echo '<p>Medicines folder does not exist</p>';
    }
    ?>
    
    <h2>3. Check frontend images folder:</h2>
    <?php
    $frontendDir = 'C:/EcommerceWebsitee/frontend/public/images/products/';
    if (is_dir($frontendDir)) {
        $files = scandir($frontendDir);
        $found = false;
        foreach ($files as $file) {
            if ($file != '.' && $file != '..' && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
                $found = true;
                echo '<div class="image-box">';
                echo '<img src="/images/products/' . $file . '"><br>';
                echo '<code>' . $file . '</code>';
                echo '</div>';
            }
        }
        if (!$found) echo '<p>No images found in frontend/images/products/ folder</p>';
    } else {
        echo '<p>Frontend products folder does not exist</p>';
    }
    ?>
    
    <h2>4. Database Images (What's stored in DB):</h2>
    <?php
    try {
        $pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
        $products = $pdo->query("SELECT id, name, images FROM products LIMIT 5");
        while($row = $products->fetch()) {
            echo '<div style="margin-bottom:15px;">';
            echo '<strong>' . $row['name'] . '</strong><br>';
            echo 'Images in DB: ' . $row['images'] . '<br>';
            $images = json_decode($row['images'], true);
            if ($images && count($images) > 0) {
                echo '<img src="' . $images[0] . '" style="max-width:150px; border:1px solid #ccc; margin-top:5px;">';
                echo '<br>URL: ' . $images[0];
            }
            echo '</div><hr>';
        }
    } catch(Exception $e) {
        echo 'Database error: ' . $e->getMessage();
    }
    ?>
</body>
</html>