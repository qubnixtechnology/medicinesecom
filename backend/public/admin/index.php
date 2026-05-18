<?php
session_start();

// Database connection
$host = '127.0.0.1';
$port = 3307;
$dbname = 'glance_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Check if admin is logged in
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND role = 'admin'");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    
    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_name'] = $admin['name'];
        $isLoggedIn = true;
    } else {
        $error = "Invalid email or password";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle Add Category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_category'])) {
    $name = trim($_POST['name']);
    $slug = strtolower(str_replace(' ', '-', $name));
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    $description = trim($_POST['description'] ?? '');
    
    $check = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
    $check->execute([$slug]);
    
    if ($check->rowCount() > 0) {
        $error = "Category already exists!";
    } else {
        $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)");
        $stmt->execute([$name, $slug, $description]);
        $success = "Category added successfully!";
    }
}

// Handle Delete Category
if (isset($_GET['delete_category'])) {
    $id = $_GET['delete_category'];
    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$id]);
    $success = "Category deleted successfully!";
    header("Location: index.php?page=categories");
    exit;
}

// Handle Update Order Status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_order_status'])) {
    $order_id = $_POST['order_id'];
    $status = $_POST['status'];
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->execute([$status, $order_id]);
    $success = "Order status updated!";
    header("Location: index.php?page=orders");
    exit;
}

// Handle Add Product
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
    $name = $_POST['name'] ?? '';
    $category = $_POST['category'] ?? '';
    $brand = $_POST['brand'] ?? 'Glance Healthcare';
    $price = $_POST['price'] ?? 0;
    $volume = $_POST['volume'] ?? '';
    $stock = $_POST['stock'] ?? 100;
    $prescription = isset($_POST['is_prescription_required']) ? 1 : 0;
    $description = $_POST['description'] ?? '';
    
    $slug = strtolower(str_replace(' ', '-', $name));
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    $category_slug = strtolower(str_replace(' ', '-', $category));
    
    // Make slug unique
    $counter = 1;
    $tempSlug = $slug;
    $checkStmt = $pdo->prepare("SELECT id FROM products WHERE slug = ?");
    $checkStmt->execute([$tempSlug]);
    while ($checkStmt->rowCount() > 0) {
        $tempSlug = $slug . '-' . $counter;
        $checkStmt->execute([$tempSlug]);
        $counter++;
    }
    $slug = $tempSlug;
    
    // Handle image upload
    $imageUrl = 'http://localhost:8080/images/medicines/placeholder.jpg';
    if (isset($_FILES['product_image']) && $_FILES['product_image']['error'] == 0) {
        $uploadDir = __DIR__ . '/../../uploads/products/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $ext = strtolower(pathinfo($_FILES['product_image']['name'], PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if (in_array($ext, $allowedExt)) {
            $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $name) . '.' . $ext;
            $uploadPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['product_image']['tmp_name'], $uploadPath)) {
                $imageUrl = 'http://localhost:8080/serve-image.php?file=' . urlencode($fileName);
            }
        }
    }
    
    $images = json_encode([$imageUrl]);
    
    $stmt = $pdo->prepare("INSERT INTO products (name, slug, category, category_slug, brand, price, volume, stock, is_prescription_required, description, images, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $slug, $category, $category_slug, $brand, $price, $volume, $stock, $prescription, $description, $images]);
    $success = "Product added successfully!";
}

// Handle Edit Product - Get product data
$editProduct = null;
if (isset($_GET['edit_product'])) {
    $editId = $_GET['edit_product'];
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$editId]);
    $editProduct = $stmt->fetch();
}

// Handle Update Product
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_product'])) {
    $id = $_POST['product_id'];
    $name = $_POST['name'];
    $category = $_POST['category'];
    $brand = $_POST['brand'];
    $price = $_POST['price'];
    $volume = $_POST['volume'];
    $stock = $_POST['stock'];
    $prescription = isset($_POST['is_prescription_required']) ? 1 : 0;
    $description = $_POST['description'];
    
    $imageUrl = null;
    if (isset($_FILES['product_image']) && $_FILES['product_image']['error'] == 0) {
        $uploadDir = __DIR__ . '/../../uploads/products/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $ext = strtolower(pathinfo($_FILES['product_image']['name'], PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if (in_array($ext, $allowedExt)) {
            $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $name) . '.' . $ext;
            $uploadPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['product_image']['tmp_name'], $uploadPath)) {
                $imageUrl = 'http://localhost:8080/serve-image.php?file=' . urlencode($fileName);
            }
        }
    }
    
    if ($imageUrl) {
        $images = json_encode([$imageUrl]);
        $stmt = $pdo->prepare("UPDATE products SET name = ?, category = ?, brand = ?, price = ?, volume = ?, stock = ?, is_prescription_required = ?, description = ?, images = ? WHERE id = ?");
        $stmt->execute([$name, $category, $brand, $price, $volume, $stock, $prescription, $description, $images, $id]);
    } else {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, category = ?, brand = ?, price = ?, volume = ?, stock = ?, is_prescription_required = ?, description = ? WHERE id = ?");
        $stmt->execute([$name, $category, $brand, $price, $volume, $stock, $prescription, $description, $id]);
    }
    
    $success = "Product updated successfully!";
    header("Location: index.php?page=products");
    exit;
}

// Handle Delete Product
if (isset($_GET['delete_product'])) {
    $id = $_GET['delete_product'];
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $success = "Product deleted successfully!";
    header("Location: index.php?page=products");
    exit;
}

// Get statistics
if ($isLoggedIn) {
    $totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $totalOrders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $totalUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'customer'")->fetchColumn();
    $totalMessages = $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
    $allProducts = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
    $allCategories = $pdo->query("SELECT * FROM categories ORDER BY name")->fetchAll();
    $allOrders = $pdo->query("SELECT o.*, u.name as customer_name FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.id DESC")->fetchAll();
    $allUsers = $pdo->query("SELECT * FROM users ORDER BY id DESC")->fetchAll();
    $allMessages = $pdo->query("SELECT * FROM contacts ORDER BY id DESC")->fetchAll();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Glance Healthcare</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f0f2f5; }
        
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .login-box { background: white; padding: 40px; border-radius: 16px; width: 400px; }
        .login-box h2 { text-align: center; margin-bottom: 30px; }
        .login-box input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; }
        .login-box button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; }
        .error { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 8px; margin-bottom: 20px; }
        .success { background: #dcfce7; color: #16a34a; padding: 10px; border-radius: 8px; margin-bottom: 20px; }
        
        .admin-header { background: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .logout-btn { background: #dc2626; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; }
        
        .sidebar { width: 260px; background: white; position: fixed; left: 0; top: 60px; bottom: 0; padding: 20px; box-shadow: 2px 0 4px rgba(0,0,0,0.1); overflow-y: auto; }
        .sidebar a { display: block; padding: 12px 16px; color: #4b5563; text-decoration: none; margin-bottom: 4px; border-radius: 8px; }
        .sidebar a:hover, .sidebar a.active { background: #e5e7eb; color: #2563eb; }
        
        .main-content { margin-left: 260px; padding: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-number { font-size: 32px; font-weight: bold; color: #2563eb; }
        
        .section-title { font-size: 20px; font-weight: bold; margin: 30px 0 20px; color: #1f2937; }
        table { width: 100%; background: white; border-radius: 12px; overflow: auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-collapse: collapse; }
        th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        
        .product-image { width: 50px; height: 50px; object-fit: cover; border-radius: 8px; }
        .btn-save { background: #22c55e; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; }
        .btn-edit { background: #2563eb; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; margin-right: 5px; display: inline-block; }
        .btn-delete { background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; display: inline-block; }
        .btn-update { background: #22c55e; color: white; padding: 4px 12px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; }
        
        input, select, textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; }
        form { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
        
        .status-pending { color: #d97706; font-weight: bold; }
        .status-processing { color: #2563eb; font-weight: bold; }
        .status-shipped { color: #7c3aed; font-weight: bold; }
        .status-delivered { color: #10b981; font-weight: bold; }
        .status-cancelled { color: #ef4444; font-weight: bold; }
        
        @media (max-width: 768px) { .sidebar { display: none; } .main-content { margin-left: 0; } }
    </style>
</head>
<body>

<?php if (!$isLoggedIn): ?>
    <div class="login-container">
        <div class="login-box">
            <h2>🔐 Admin Login</h2>
            <?php if(isset($error)) echo '<div class="error">❌ ' . $error . '</div>'; ?>
            <form method="POST">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login</button>
            </form>
            <p style="text-align:center; margin-top:20px;">admin@glance.com / admin123</p>
        </div>
    </div>
<?php else: ?>
    <div class="admin-header">
        <h1>🩺 Glance Healthcare Admin</h1>
        <div>
            👋 <?php echo htmlspecialchars($_SESSION['admin_name']); ?>
            <a href="?logout=1" class="logout-btn">Logout</a>
        </div>
    </div>
    
    <div class="sidebar">
        <a href="?page=dashboard">📊 Dashboard</a>
        <a href="?page=products">📦 Products</a>
        <a href="?page=add_product">➕ Add Product</a>
        <a href="?page=categories">📂 Categories</a>
        <a href="?page=orders">🛒 Orders</a>
        <a href="?page=users">👥 Users</a>
        <a href="?page=messages">💬 Messages</a>
    </div>
    
    <div class="main-content">
        <?php if(isset($success)) echo '<div class="success">✅ ' . $success . '</div>'; ?>
        <?php if(isset($error)) echo '<div class="error">❌ ' . $error . '</div>'; ?>
        
        <?php $page = $_GET['page'] ?? 'dashboard'; ?>
        
        <!-- Dashboard Page -->
        <?php if ($page === 'dashboard'): ?>
        <div class="stats-grid">
            <div class="stat-card"><h3>Products</h3><div class="stat-number"><?php echo $totalProducts; ?></div></div>
            <div class="stat-card"><h3>Orders</h3><div class="stat-number"><?php echo $totalOrders; ?></div></div>
            <div class="stat-card"><h3>Customers</h3><div class="stat-number"><?php echo $totalUsers; ?></div></div>
            <div class="stat-card"><h3>Messages</h3><div class="stat-number"><?php echo $totalMessages; ?></div></div>
        </div>
        
        <!-- Categories Page -->
        <?php elseif ($page === 'categories'): ?>
        <h2>📂 Category Management</h2>
        
        <form method="POST">
            <h3>Add New Category</h3>
            <input type="text" name="name" placeholder="Category Name" required>
            <textarea name="description" placeholder="Category Description" rows="2"></textarea>
            <button type="submit" name="add_category" class="btn-save">Add Category</button>
        </form>
        
        <h3>All Categories (<?php echo count($allCategories); ?>)</h3>
        <table>
            <thead><tr><th>ID</th><th>Name</th><th>Slug</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
                <?php foreach($allCategories as $cat): ?>
                <tr>
                    <td><?php echo $cat['id']; ?></td>
                    <td><strong><?php echo htmlspecialchars($cat['name']); ?></strong></td>
                    <td><code><?php echo $cat['slug']; ?></code></td>
                    <td><?php echo htmlspecialchars($cat['description'] ?? '-'); ?></td>
                    <td><a href="?delete_category=<?php echo $cat['id']; ?>" class="btn-delete" onclick="return confirm('Delete?')">Delete</a></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <!-- Add Product Page -->
        <?php elseif ($page === 'add_product'): ?>
        <h2>➕ Add New Product</h2>
        <form method="POST" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Product Name" required>
            <select name="category" required>
                <option value="">Select Category</option>
                <?php foreach($allCategories as $cat): ?>
                <option value="<?php echo htmlspecialchars($cat['name']); ?>"><?php echo htmlspecialchars($cat['name']); ?></option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="brand" placeholder="Brand" value="Glance Healthcare">
            <input type="number" name="price" placeholder="Price" step="0.01" required>
            <input type="text" name="volume" placeholder="Volume">
            <input type="number" name="stock" placeholder="Stock" value="100">
            <label><input type="checkbox" name="is_prescription_required"> Prescription Required</label>
            <textarea name="description" placeholder="Description" rows="3"></textarea>
            <label><strong>Product Image:</strong></label>
            <input type="file" name="product_image" accept="image/*">
            <button type="submit" name="add_product" class="btn-save">Add Product</button>
        </form>
        
        <!-- Products List Page -->
        <?php elseif ($page === 'products'): ?>
        <h2>📦 All Products</h2>
        <table>
            <thead>
                <tr><th>ID</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody>
                <?php foreach($allProducts as $product): 
                    $images = json_decode($product['images'], true);
                    $imgSrc = ($images && count($images) > 0) ? $images[0] : 'http://localhost:8080/images/medicines/placeholder.jpg';
                ?>
                <tr>
                    <td><?php echo $product['id']; ?></td>
                    <td><img src="<?php echo $imgSrc; ?>" class="product-image" onerror="this.src='http://localhost:8080/images/medicines/placeholder.jpg'"></td>
                    <td><?php echo htmlspecialchars($product['name']); ?></td>
                    <td><?php echo htmlspecialchars($product['category']); ?></td>
                    <td>₹<?php echo number_format($product['price'], 2); ?></td>
                    <td><?php echo $product['stock']; ?></td>
                    <td>
                        <a href="?page=edit_product&id=<?php echo $product['id']; ?>" class="btn-edit">Edit</a>
                        <a href="?delete_product=<?php echo $product['id']; ?>" class="btn-delete" onclick="return confirm('Delete this product?')">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <!-- Edit Product Page -->
        <?php elseif ($page === 'edit_product' && $editProduct): ?>
        <h2>✏️ Edit Product</h2>
        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="product_id" value="<?php echo $editProduct['id']; ?>">
            <input type="text" name="name" value="<?php echo htmlspecialchars($editProduct['name']); ?>" required>
            <select name="category" required>
                <option value="">Select Category</option>
                <?php foreach($allCategories as $cat): ?>
                <option value="<?php echo htmlspecialchars($cat['name']); ?>" <?php echo ($editProduct['category'] == $cat['name']) ? 'selected' : ''; ?>>
                    <?php echo htmlspecialchars($cat['name']); ?>
                </option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="brand" value="<?php echo htmlspecialchars($editProduct['brand']); ?>">
            <input type="number" name="price" value="<?php echo $editProduct['price']; ?>" step="0.01" required>
            <input type="text" name="volume" value="<?php echo htmlspecialchars($editProduct['volume']); ?>">
            <input type="number" name="stock" value="<?php echo $editProduct['stock']; ?>">
            <label><input type="checkbox" name="is_prescription_required" <?php echo $editProduct['is_prescription_required'] ? 'checked' : ''; ?>> Prescription Required</label>
            <textarea name="description" rows="3"><?php echo htmlspecialchars($editProduct['description']); ?></textarea>
            
            <?php 
            $currentImages = json_decode($editProduct['images'], true);
            $currentImage = ($currentImages && count($currentImages) > 0) ? $currentImages[0] : '';
            if ($currentImage): ?>
            <div style="margin:10px 0;">
                <label><strong>Current Image:</strong></label><br>
                <img src="<?php echo $currentImage; ?>" style="max-width:100px; max-height:100px; margin-top:5px;">
            </div>
            <?php endif; ?>
            
            <label><strong>Change Image (optional):</strong></label>
            <input type="file" name="product_image" accept="image/*">
            <button type="submit" name="update_product" class="btn-save">Update Product</button>
        </form>
        
        <!-- Orders Page -->
        <?php elseif ($page === 'orders'): ?>
        <h2>🛒 Orders Management</h2>
        <?php if (count($allOrders) == 0): ?>
            <p>No orders found.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($allOrders as $order): ?>
                    <tr>
                        <td><?php echo $order['id']; ?></td>
                        <td><?php echo $order['order_number']; ?></td>
                        <td><?php echo htmlspecialchars($order['customer_name'] ?? 'Guest'); ?></td>
                        <td>₹<?php echo number_format($order['total'], 2); ?></td>
                        <td class="status-<?php echo $order['status']; ?>"><?php echo ucfirst($order['status']); ?></td>
                        <td><?php echo ucfirst($order['payment_method'] ?? 'cod'); ?></td>
                        <td><?php echo date('d M Y', strtotime($order['created_at'])); ?></td>
                        <td>
                            <form method="POST" style="display:flex; gap:5px; padding:0; margin:0;">
                                <input type="hidden" name="order_id" value="<?php echo $order['id']; ?>">
                                <select name="status" style="width:100px; margin:0;">
                                    <option value="pending" <?php echo $order['status'] == 'pending' ? 'selected' : ''; ?>>Pending</option>
                                    <option value="processing" <?php echo $order['status'] == 'processing' ? 'selected' : ''; ?>>Processing</option>
                                    <option value="shipped" <?php echo $order['status'] == 'shipped' ? 'selected' : ''; ?>>Shipped</option>
                                    <option value="delivered" <?php echo $order['status'] == 'delivered' ? 'selected' : ''; ?>>Delivered</option>
                                    <option value="cancelled" <?php echo $order['status'] == 'cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                                </select>
                                <button type="submit" name="update_order_status" class="btn-update">Update</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        
        <!-- Users Page -->
        <?php elseif ($page === 'users'): ?>
        <h2>👥 User Management</h2>
        <?php if (count($allUsers) == 0): ?>
            <p>No users found.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($allUsers as $user): ?>
                    <tr>
                        <td><?php echo $user['id']; ?></td>
                        <td><?php echo htmlspecialchars($user['name']); ?></td>
                        <td><?php echo htmlspecialchars($user['email']); ?></td>
                        <td><?php echo htmlspecialchars($user['phone'] ?? '-'); ?></td>
                        <td><span class="status-<?php echo $user['role']; ?>"><?php echo ucfirst($user['role']); ?></span></td>
                        <td><?php echo date('d M Y', strtotime($user['created_at'])); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        
        <!-- Messages Page -->
        <?php elseif ($page === 'messages'): ?>
        <h2>💬 Contact Messages</h2>
        <?php if (count($allMessages) == 0): ?>
            <p>No messages found.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($allMessages as $msg): ?>
                    <tr>
                        <td><?php echo $msg['id']; ?></td>
                        <td><?php echo htmlspecialchars($msg['name']); ?></td>
                        <td><?php echo htmlspecialchars($msg['email']); ?></td>
                        <td><?php echo htmlspecialchars($msg['phone'] ?? '-'); ?></td>
                        <td><?php echo htmlspecialchars($msg['subject'] ?? '-'); ?></td>
                        <td><?php echo substr(htmlspecialchars($msg['message']), 0, 50); ?>...</td>
                        <td><?php echo date('d M Y', strtotime($msg['created_at'])); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        
        <?php endif; ?>
    </div>
<?php endif; ?>
</body>
</html>