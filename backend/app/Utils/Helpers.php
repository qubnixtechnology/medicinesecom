<?php
namespace App\Utils;

class Helpers {
    public static function slugify($string) {
        $string = strtolower($string);
        $string = preg_replace('/[^a-z0-9-]/', '-', $string);
        $string = preg_replace('/-+/', '-', $string);
        return trim($string, '-');
    }
    
    public static function generateOrderNumber() {
        return 'ORD-' . strtoupper(uniqid()) . '-' . date('Ymd');
    }
    
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    public static function validatePhone($phone) {
        return preg_match('/^[0-9]{10}$/', $phone);
    }
    
    public static function sanitize($input) {
        return htmlspecialchars(strip_tags(trim($input)));
    }
    
    public static function generateRandomToken($length = 32) {
        return bin2hex(random_bytes($length));
    }
    
    public static function formatPrice($price) {
        return '₹' . number_format($price, 2);
    }
}