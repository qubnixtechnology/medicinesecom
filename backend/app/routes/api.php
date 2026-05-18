<?php
return [
    // Auth routes
    ['method' => 'POST', 'path' => '/api/auth/register', 'controller' => 'AuthController', 'action' => 'register'],
    ['method' => 'POST', 'path' => '/api/auth/login', 'controller' => 'AuthController', 'action' => 'login'],
    ['method' => 'GET', 'path' => '/api/auth/me', 'controller' => 'AuthController', 'action' => 'me', 'middleware' => 'Auth'],
    
    // Product routes
    ['method' => 'GET', 'path' => '/api/products', 'controller' => 'ProductController', 'action' => 'index'],
    ['method' => 'GET', 'path' => '/api/products/{id}', 'controller' => 'ProductController', 'action' => 'show'],
    ['method' => 'POST', 'path' => '/api/products', 'controller' => 'ProductController', 'action' => 'store', 'middleware' => 'Auth'],
    ['method' => 'PUT', 'path' => '/api/products/{id}', 'controller' => 'ProductController', 'action' => 'update', 'middleware' => 'Auth'],
    ['method' => 'DELETE', 'path' => '/api/products/{id}', 'controller' => 'ProductController', 'action' => 'destroy', 'middleware' => 'Auth'],
    
    // Category routes
    ['method' => 'GET', 'path' => '/api/categories', 'controller' => 'CategoryController', 'action' => 'index'],
    ['method' => 'GET', 'path' => '/api/categories/{id}', 'controller' => 'CategoryController', 'action' => 'show'],
    
    // Brand routes
    ['method' => 'GET', 'path' => '/api/brands', 'controller' => 'BrandController', 'action' => 'index'],
    ['method' => 'GET', 'path' => '/api/brands/{id}', 'controller' => 'BrandController', 'action' => 'show'],
    
    // Order routes
    ['method' => 'GET', 'path' => '/api/orders', 'controller' => 'OrderController', 'action' => 'index', 'middleware' => 'Auth'],
    ['method' => 'POST', 'path' => '/api/orders', 'controller' => 'OrderController', 'action' => 'store', 'middleware' => 'Auth'],
    ['method' => 'GET', 'path' => '/api/orders/{id}', 'controller' => 'OrderController', 'action' => 'show', 'middleware' => 'Auth'],
    ['method' => 'PUT', 'path' => '/api/orders/{id}/status', 'controller' => 'OrderController', 'action' => 'updateStatus', 'middleware' => 'Auth'],
    
    // Contact routes
    ['method' => 'POST', 'path' => '/api/contact', 'controller' => 'ContactController', 'action' => 'submit'],
];