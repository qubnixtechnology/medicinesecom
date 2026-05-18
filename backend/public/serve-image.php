<?php
$file = isset($_GET['file']) ? $_GET['file'] : '';
$file = basename($file);

$uploadPath = __DIR__ . '/uploads/products/' . $file;
$medicinesPath = __DIR__ . '/images/medicines/' . $file;

if (file_exists($uploadPath)) {
    $ext = strtolower(pathinfo($uploadPath, PATHINFO_EXTENSION));
    switch($ext) {
        case 'jpg': case 'jpeg': header('Content-Type: image/jpeg'); break;
        case 'png': header('Content-Type: image/png'); break;
        case 'gif': header('Content-Type: image/gif'); break;
        case 'webp': header('Content-Type: image/webp'); break;
        default: header('Content-Type: image/jpeg');
    }
    header('Access-Control-Allow-Origin: *');
    readfile($uploadPath);
    exit;
}

if (file_exists($medicinesPath)) {
    $ext = strtolower(pathinfo($medicinesPath, PATHINFO_EXTENSION));
    switch($ext) {
        case 'jpg': case 'jpeg': header('Content-Type: image/jpeg'); break;
        case 'png': header('Content-Type: image/png'); break;
        case 'gif': header('Content-Type: image/gif'); break;
        case 'webp': header('Content-Type: image/webp'); break;
        default: header('Content-Type: image/jpeg');
    }
    header('Access-Control-Allow-Origin: *');
    readfile($medicinesPath);
    exit;
}

// Placeholder
$placeholder = __DIR__ . '/images/medicines/placeholder.jpg';
if (file_exists($placeholder)) {
    header('Content-Type: image/jpeg');
    readfile($placeholder);
} else {
    echo "Image not found: " . $file;
}
?>