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

// Handle Add Product with Full Details
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
    $name = $_POST['name'] ?? '';
    $category = $_POST['category'] ?? '';
    $brand = $_POST['brand'] ?? 'Glance Healthcare';
    $price = $_POST['price'] ?? 0;
    $volume = $_POST['volume'] ?? '';
    $stock = $_POST['stock'] ?? 100;
    $prescription = isset($_POST['is_prescription_required']) ? 1 : 0;
    $description = $_POST['description'] ?? '';
    $composition = $_POST['composition'] ?? '';
    $benefits = $_POST['benefits'] ?? '';
    $dosage = $_POST['dosage'] ?? '';
    
    // Create slug
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
        $uploadDir = __DIR__ . '/../uploads/products/';
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
    header('Location: index.php?page=products&msg=added');
    exit;
}

// Handle Delete Product
if (isset($_GET['delete_product'])) {
    $id = (int)$_GET['delete_product'];
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: index.php?page=products&msg=deleted");
    exit;
}

// Handle Update Order Status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_order_status'])) {
    $order_id = (int)$_POST['order_id'];
    $status = $_POST['status'];
    $allowed = ['pending','processing','shipped','delivered','cancelled'];
    if (in_array($status, $allowed)) {
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$status, $order_id]);
    }
    header('Location: index.php?page=orders&msg=updated');
    exit;
}

// Handle Add Category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_category'])) {
    $catName = trim($_POST['cat_name'] ?? '');
    $catDesc = trim($_POST['cat_description'] ?? '');
    if ($catName) {
        $catSlug = preg_replace('/[^a-z0-9-]/', '', strtolower(str_replace(' ', '-', $catName)));
        $check = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
        $check->execute([$catSlug]);
        if ($check->rowCount() > 0) {
            $error = "Category already exists!";
        } else {
            $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)");
            $stmt->execute([$catName, $catSlug, $catDesc]);
            header('Location: index.php?page=categories&msg=added');
            exit;
        }
    }
}

// Handle Delete Category
if (isset($_GET['delete_category'])) {
    $id = (int)$_GET['delete_category'];
    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$id]);
    header('Location: index.php?page=categories&msg=deleted');
    exit;
}

// Handle Gallery Image Upload
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload_gallery'])) {
    $title = trim($_POST['image_title'] ?? '');
    $category = $_POST['image_category'] ?? 'general';

    if (isset($_FILES['gallery_image']) && $_FILES['gallery_image']['error'] == 0) {
        // FIX: Save to backend/public/uploads/gallery/ so URL /uploads/gallery/ works
        $uploadDir = __DIR__ . '/../uploads/gallery/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $ext = strtolower(pathinfo($_FILES['gallery_image']['name'], PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        if (in_array($ext, $allowedExt)) {
            $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', basename($_FILES['gallery_image']['name'])) . '.' . $ext;
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['gallery_image']['tmp_name'], $uploadPath)) {
                $imageUrl = '/uploads/gallery/' . $fileName;
                $stmt = $pdo->prepare("INSERT INTO gallery (title, image, category) VALUES (?, ?, ?)");
                $stmt->execute([$title, $imageUrl, $category]);
                $success = "Image uploaded successfully!";
                header('Location: index.php?page=gallery&msg=uploaded');
                exit;
            } else {
                $error = "Failed to move uploaded file. Check folder permissions.";
            }
        } else {
            $error = "Invalid file type. Use JPG, PNG, GIF, or WEBP.";
        }
    } else {
        $error = "Please select an image file. Error code: " . ($_FILES['gallery_image']['error'] ?? 'no file');
    }
}

// Handle Delete Gallery Image
if (isset($_GET['delete_gallery'])) {
    $id = (int)$_GET['delete_gallery'];
    $stmt = $pdo->prepare("SELECT image FROM gallery WHERE id = ?");
    $stmt->execute([$id]);
    $img = $stmt->fetch();
    if ($img) {
        // FIX: correct path to match the corrected upload path
        $filePath = __DIR__ . '/../' . ltrim($img['image'], '/');
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
        $stmt->execute([$id]);
    }
    header('Location: index.php?page=gallery&msg=deleted');
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
    $galleryImages = $pdo->query("SELECT * FROM gallery ORDER BY id DESC")->fetchAll();
    $allOrders = $pdo->query("SELECT o.*, u.name as customer_name, u.email as customer_email FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.id DESC")->fetchAll();
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
        
        table { width: 100%; background: white; border-radius: 12px; overflow: auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-collapse: collapse; }
        th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        
        .product-image { width: 50px; height: 50px; object-fit: cover; border-radius: 8px; }
        .btn-save { background: #22c55e; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; }
        .btn-edit { background: #2563eb; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; margin-right: 5px; display: inline-block; }
        .btn-delete { background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; display: inline-block; }
        
        input, select, textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; }
        form { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
        
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
        <a href="?page=gallery">🖼️ Gallery</a>
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
        
        <!-- Add Product Page -->
        <?php elseif ($page === 'add_product'): ?>
        <h2>➕ Add New Product</h2>
        <form method="POST" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Product Name *" required>
            <select name="category" required>
                <option value="">Select Category *</option>
                <?php foreach($allCategories as $cat): ?>
                <option value="<?php echo htmlspecialchars($cat['name']); ?>"><?php echo htmlspecialchars($cat['name']); ?></option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="brand" placeholder="Brand" value="Glance Healthcare">
            <input type="number" name="price" placeholder="Price (₹) *" step="0.01" required>
            <input type="text" name="volume" placeholder="Volume/Pack Size (e.g., 200ml, 30 Capsules)">
            <input type="number" name="stock" placeholder="Stock Quantity" value="100">
            <label><input type="checkbox" name="is_prescription_required"> Prescription Required</label>
            <textarea name="description" placeholder="Product Description" rows="3"></textarea>
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
    <td><img src="<?php echo $imgSrc; ?>" class="product-image" style="width:50px; height:50px; object-fit:cover;" onerror="this.src='http://localhost:8080/images/medicines/placeholder.jpg'"></td>
    <td><?php echo htmlspecialchars($product['name']); ?></td>
    <td><?php echo htmlspecialchars($product['category']); ?></td>
    <td>₹<?php echo number_format($product['price'], 2); ?></td>
    <td><?php echo $product['stock']; ?></td>
    <td>
        <a href="?edit_product=<?php echo $product['id']; ?>" class="btn-edit">Edit</a>
        <a href="?delete_product=<?php echo $product['id']; ?>" class="btn-delete" onclick="return confirm('Delete?')">Delete</a>
    </td>
</tr>
<?php endforeach; ?>
            </tbody>
        </table>
        
        <?php elseif ($page === 'categories'): ?>
        <h2>📂 Category Management</h2>
        <?php if (isset($_GET['msg']) && $_GET['msg'] === 'added'): ?><div class="success">✅ Category added!</div><?php endif; ?>
        <?php if (isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?><div class="success">✅ Category deleted!</div><?php endif; ?>
        <?php if (isset($error)): ?><div class="error">❌ <?php echo $error; ?></div><?php endif; ?>

        <form method="POST">
            <h3 style="margin-bottom:10px;">Add New Category</h3>
            <input type="text" name="cat_name" placeholder="Category Name" required>
            <textarea name="cat_description" placeholder="Description (optional)" rows="2"></textarea>
            <button type="submit" name="add_category" class="btn-save">Add Category</button>
        </form>

        <h3 style="margin:20px 0 10px;">All Categories (<?php echo count($allCategories); ?>)</h3>
        <table>
            <thead><tr><th>ID</th><th>Name</th><th>Slug</th><th>Description</th><th>Action</th></tr></thead>
            <tbody>
                <?php foreach ($allCategories as $cat): ?>
                <tr>
                    <td><?php echo $cat['id']; ?></td>
                    <td><strong><?php echo htmlspecialchars($cat['name']); ?></strong></td>
                    <td><code><?php echo $cat['slug']; ?></code></td>
                    <td><?php echo htmlspecialchars($cat['description'] ?? '-'); ?></td>
                    <td><a href="?page=categories&delete_category=<?php echo $cat['id']; ?>" class="btn-delete" onclick="return confirm('Delete category?')">Delete</a></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <!-- Gallery Page -->
        <?php elseif ($page === 'gallery'): ?>
        <h2>🖼️ Gallery Management</h2>

        <?php if (isset($_GET['msg']) && $_GET['msg'] === 'uploaded'): ?>
            <div class="success">✅ Image uploaded successfully!</div>
        <?php elseif (isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
            <div class="success">✅ Image deleted!</div>
        <?php endif; ?>

        <!-- Upload Form -->
        <form method="POST" enctype="multipart/form-data">
            <h3>Upload New Image</h3>
            <input type="text" name="image_title" placeholder="Image Title">
            <select name="image_category">
                <option value="general">General</option>
                <option value="products">Products</option>
                <option value="banner">Banner</option>
                <option value="promotion">Promotion</option>
            </select>
            <input type="file" name="gallery_image" accept="image/*" required>
            <button type="submit" name="upload_gallery" class="btn-save">Upload Image</button>
        </form>

        <!-- Gallery Grid -->
        <h3>Gallery Images (<?php echo count($galleryImages); ?>)</h3>
        <?php if (empty($galleryImages)): ?>
            <p style="color:#888;">No images yet. Upload one above.</p>
        <?php else: ?>
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:20px; margin-top:20px;">
            <?php foreach ($galleryImages as $img): ?>
            <div style="background:white; border-radius:12px; padding:15px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <img src="<?php echo htmlspecialchars($img['image']); ?>"
                     style="width:100%; height:150px; object-fit:cover; border-radius:8px;"
                     onerror="this.src='http://localhost:8080/images/medicines/placeholder.jpg'">
                <p style="margin:10px 0 5px;"><strong><?php echo htmlspecialchars($img['title'] ?: 'Untitled'); ?></strong></p>
                <p style="font-size:12px; color:#666; margin-bottom:10px;"><?php echo htmlspecialchars($img['category']); ?></p>
                <a href="?page=gallery&delete_gallery=<?php echo $img['id']; ?>"
                   class="btn-delete"
                   onclick="return confirm('Delete this image?')">Delete</a>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <?php elseif ($page === 'orders'): ?>
        <h2>🛒 Orders Management</h2>
        <?php if (isset($_GET['msg']) && $_GET['msg'] === 'updated'): ?><div class="success">✅ Order status updated!</div><?php endif; ?>
        <?php if (empty($allOrders)): ?>
            <p style="color:#888;">No orders yet.</p>
        <?php else: ?>
        <div style="overflow-x:auto;">
        <table>
            <thead><tr><th>ID</th><th>Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Update Status</th></tr></thead>
            <tbody>
            <?php foreach ($allOrders as $order): ?>
            <tr>
                <td><?php echo $order['id']; ?></td>
                <td><?php echo htmlspecialchars($order['order_number'] ?? '-'); ?></td>
                <td>
                    <strong><?php echo htmlspecialchars($order['customer_name'] ?? 'Guest'); ?></strong><br>
                    <small style="color:#888;"><?php echo htmlspecialchars($order['customer_email'] ?? ''); ?></small>
                </td>
                <td><strong>₹<?php echo number_format($order['total'], 2); ?></strong></td>
                <td><?php echo ucfirst($order['payment_method'] ?? 'cod'); ?></td>
                <td>
                    <?php
                    $sc = ['pending'=>'#d97706','processing'=>'#2563eb','shipped'=>'#7c3aed','delivered'=>'#16a34a','cancelled'=>'#dc2626'];
                    $s = $order['status'] ?? 'pending';
                    ?>
                    <span style="color:<?php echo $sc[$s] ?? '#333'; ?>; font-weight:bold;"><?php echo ucfirst($s); ?></span>
                </td>
                <td><?php echo date('d M Y', strtotime($order['created_at'])); ?></td>
                <td>
                    <form method="POST" style="display:flex;gap:5px;padding:0;margin:0;background:none;box-shadow:none;">
                        <input type="hidden" name="order_id" value="<?php echo $order['id']; ?>">
                        <select name="status" style="width:120px;margin:0;padding:6px;">
                            <?php foreach (['pending','processing','shipped','delivered','cancelled'] as $st): ?>
                            <option value="<?php echo $st; ?>" <?php echo $s === $st ? 'selected' : ''; ?>><?php echo ucfirst($st); ?></option>
                            <?php endforeach; ?>
                        </select>
                        <button type="submit" name="update_order_status" style="background:#22c55e;color:white;padding:6px 10px;border:none;border-radius:6px;cursor:pointer;font-size:12px;">Update</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        </div>
        <?php endif; ?>

        <?php elseif ($page === 'users'): ?>
        <h2>👥 User Management</h2>
        <?php if (empty($allUsers)): ?>
            <p style="color:#888;">No users found.</p>
        <?php else: ?>
        <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
            <?php foreach ($allUsers as $u): ?>
            <tr>
                <td><?php echo $u['id']; ?></td>
                <td><strong><?php echo htmlspecialchars($u['name']); ?></strong></td>
                <td><?php echo htmlspecialchars($u['email']); ?></td>
                <td><?php echo htmlspecialchars($u['phone'] ?? '-'); ?></td>
                <td>
                    <?php $roleColor = $u['role'] === 'admin' ? '#7c3aed' : '#2563eb'; ?>
                    <span style="color:<?php echo $roleColor; ?>;font-weight:bold;"><?php echo ucfirst($u['role']); ?></span>
                </td>
                <td><?php echo date('d M Y', strtotime($u['created_at'])); ?></td>
            </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>

        <?php elseif ($page === 'messages'): ?>
        <h2>💬 Contact Messages</h2>
        <?php if (empty($allMessages)): ?>
            <p style="color:#888;">No messages yet.</p>
        <?php else: ?>
        <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
            <tbody>
            <?php foreach ($allMessages as $msg): ?>
            <tr>
                <td><?php echo $msg['id']; ?></td>
                <td><strong><?php echo htmlspecialchars($msg['name']); ?></strong></td>
                <td><?php echo htmlspecialchars($msg['email']); ?></td>
                <td><?php echo htmlspecialchars($msg['phone'] ?? '-'); ?></td>
                <td><?php echo htmlspecialchars($msg['subject'] ?? '-'); ?></td>
                <td style="max-width:250px;">
                    <span title="<?php echo htmlspecialchars($msg['message']); ?>">
                        <?php echo htmlspecialchars(substr($msg['message'], 0, 60)) . (strlen($msg['message']) > 60 ? '...' : ''); ?>
                    </span>
                </td>
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