<?php
namespace App\Controllers;

use App\Utils\Response;
use App\Utils\Helpers;

class UploadController {
    
    public function upload() {
        $user = $GLOBALS['current_user'];
        if ($user['role'] !== 'admin') {
            Response::forbidden('Admin access required');
        }
        
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            Response::error('No image uploaded or upload error', 400);
        }
        
        $file = $_FILES['image'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        
        if (!in_array($file['type'], $allowedTypes)) {
            Response::error('Only JPG, PNG and WebP images are allowed', 400);
        }
        
        if ($file['size'] > 5 * 1024 * 1024) {
            Response::error('Image size must be less than 5MB', 400);
        }
        
        // Create upload directory if not exists
        $uploadDir = __DIR__ . '/../../uploads/products/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $filepath = $uploadDir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            $imageUrl = $_ENV['APP_URL'] . '/uploads/products/' . $filename;
            Response::success([
                'url' => $imageUrl,
                'filename' => $filename
            ], 'Image uploaded successfully');
        } else {
            Response::error('Failed to upload image', 500);
        }
    }
}