<?php
// Image proxy to serve uploaded images to frontend
$file = $_GET['file'] ?? '';
$file = basename($file); // Security: prevent directory traversal
$uploadPath = __DIR__ . '/uploads/products/' . $file;

if (file_exists($uploadPath)) {
    $mime = mime_content_type($uploadPath);
    header('Content-Type: ' . $mime);
    header('Access-Control-Allow-Origin: *');
    readfile($uploadPath);
} else {
    // Return placeholder if image not found
    header('Content-Type: image/jpeg');
    readfile(__DIR__ . '/images/medicines/placeholder.jpg');
}
?>