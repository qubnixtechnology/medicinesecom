<?php
$file = isset($_GET['file']) ? $_GET['file'] : '';
$file = basename($file);

// Check multiple locations for the image
$paths = [
    __DIR__ . '/uploads/products/' . $file,
    __DIR__ . '/images/medicines/' . $file,
];

$imageFound = false;
foreach ($paths as $path) {
    if (file_exists($path)) {
        $imageFound = true;
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        
        // Set correct content type
        switch($ext) {
            case 'jpg':
            case 'jpeg':
                header('Content-Type: image/jpeg');
                break;
            case 'png':
                header('Content-Type: image/png');
                break;
            case 'gif':
                header('Content-Type: image/gif');
                break;
            case 'webp':
                header('Content-Type: image/webp');
                break;
            default:
                header('Content-Type: image/jpeg');
        }
        
        header('Access-Control-Allow-Origin: *');
        header('Cache-Control: public, max-age=86400');
        readfile($path);
        exit;
    }
}

// If no image found, serve placeholder
$placeholder = __DIR__ . '/images/medicines/placeholder.jpg';
if (file_exists($placeholder)) {
    header('Content-Type: image/jpeg');
    readfile($placeholder);
} else {
    // Create a simple fallback
    echo "Image not found: " . $file;
}
?>