<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load environment variables manually
if (file_exists(__DIR__ . '/../.env')) {
    $lines = file(__DIR__ . '/../.env');
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) == 2) {
            $_ENV[trim($parts[0])] = trim($parts[1]);
        }
    }
}

// Manual autoloader for App classes
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/../app/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require_once $file;
    }
});

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Parse the path
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/index.php', '', $path);
$path = trim($path, '/');

// Strip api/ prefix when deployed under /api/ subdirectory
if (strpos($path, 'api/') === 0) {
    $path = substr($path, 4);
}

// Route handling
if ($path == 'test') {
    echo json_encode(['message' => 'API is working', 'path' => $path, 'method' => $request_method]);
    exit();
}
elseif ($path == 'auth/register' && $request_method == 'POST') {
    $controller = new App\Controllers\AuthController();
    $controller->register();
}
elseif ($path == 'auth/login' && $request_method == 'POST') {
    $controller = new App\Controllers\AuthController();
    $controller->login();
}
elseif ($path == 'products' && $request_method == 'GET') {
    $controller = new App\Controllers\ProductController();
    $controller->index();
} 
elseif (preg_match('/^products\/([a-zA-Z0-9_-]+)$/', $path, $matches) && $request_method == 'GET') {
    $controller = new App\Controllers\ProductController();
    $controller->show($matches[1]);
}
elseif ($path == 'categories' && $request_method == 'GET') {
    $controller = new App\Controllers\CategoryController();
    $controller->index();
}
elseif ($path == 'contact' && $request_method == 'POST') {
    $controller = new App\Controllers\ContactController();
    $controller->submit();
}
elseif ($path == 'orders' && $request_method == 'GET') {
    $auth = new App\Middleware\Auth();
    if (!$auth->handle()) exit();
    $controller = new App\Controllers\OrderController();
    $controller->index();
}
elseif ($path == 'orders' && $request_method == 'POST') {
    $auth = new App\Middleware\Auth();
    if (!$auth->handle()) exit();
    $controller = new App\Controllers\OrderController();
    $controller->store();
}
else {
    echo json_encode(['error' => 'Route not found', 'path' => $path, 'method' => $request_method]);
}