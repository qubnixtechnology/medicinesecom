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
        /* ===== BASE ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; }

        /* ===== LOGIN ===== */
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .login-box { background: white; padding: 40px; border-radius: 16px; width: 100%; max-width: 400px; }
        .login-box h2 { text-align: center; margin-bottom: 30px; }
        .login-box input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; font-size: 15px; }
        .login-box button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; }
        .error { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 8px; margin-bottom: 20px; }
        .success { background: #dcfce7; color: #16a34a; padding: 10px; border-radius: 8px; margin-bottom: 20px; }

        /* ===== HEADER ===== */
        .admin-header { background: white; padding: 0 20px; height: 60px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
        .admin-header h1 { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .header-right .admin-name { font-size: 13px; color: #555; display: none; }
        .logout-btn { background: #dc2626; color: white; padding: 7px 14px; text-decoration: none; border-radius: 6px; font-size: 13px; white-space: nowrap; }

        /* ===== HAMBURGER ===== */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #374151; border-radius: 2px; transition: all 0.3s; }

        /* ===== OVERLAY ===== */
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 199; }
        .sidebar-overlay.active { display: block; }

        /* ===== SIDEBAR ===== */
        .sidebar { width: 260px; background: white; position: fixed; left: 0; top: 60px; bottom: 0; padding: 20px 10px; box-shadow: 2px 0 8px rgba(0,0,0,0.1); overflow-y: auto; z-index: 200; transition: transform 0.3s ease; }
        .sidebar a { display: flex; align-items: center; gap: 8px; padding: 11px 14px; color: #4b5563; text-decoration: none; margin-bottom: 3px; border-radius: 8px; font-size: 14px; transition: background 0.2s; }
        .sidebar a:hover, .sidebar a.active { background: #eff6ff; color: #2563eb; font-weight: 600; }
        .sidebar-close { display: none; text-align: right; padding: 0 4px 10px; }
        .sidebar-close button { background: none; border: none; font-size: 22px; cursor: pointer; color: #6b7280; }

        /* ===== MAIN CONTENT ===== */
        .main-content { margin-left: 260px; padding: 80px 24px 24px; min-height: 100vh; }

        /* ===== STATS GRID ===== */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .stat-card h3 { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
        .stat-number { font-size: 30px; font-weight: bold; color: #2563eb; }

        /* ===== TABLE ===== */
        .table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        table { width: 100%; min-width: 520px; background: white; border-collapse: collapse; }
        th, td { padding: 11px 14px; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        th { background: #f9fafb; font-weight: 600; white-space: nowrap; }
        td { vertical-align: middle; }

        /* ===== BUTTONS ===== */
        .product-image { width: 46px; height: 46px; object-fit: cover; border-radius: 8px; }
        .btn-save { background: #22c55e; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; font-size: 14px; width: auto; }
        .btn-edit { background: #2563eb; color: white; padding: 5px 12px; border-radius: 5px; text-decoration: none; font-size: 12px; margin-right: 4px; display: inline-block; white-space: nowrap; }
        .btn-delete { background: #dc2626; color: white; padding: 5px 12px; border-radius: 5px; text-decoration: none; font-size: 12px; display: inline-block; white-space: nowrap; }

        /* ===== FORMS ===== */
        input:not([type=checkbox]):not([type=file]):not([type=submit]), select, textarea { width: 100%; padding: 10px 12px; margin: 8px 0; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
        form { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        form h3 { margin-bottom: 6px; font-size: 15px; }
        label { display: block; margin: 8px 0 2px; font-size: 13px; color: #374151; }

        /* ===== PAGE TITLE ===== */
        h2 { font-size: 18px; margin-bottom: 18px; color: #111827; }

        /* ===== GALLERY GRID ===== */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; margin-top: 16px; }
        .gallery-card { background: white; border-radius: 12px; padding: 12px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .gallery-card img { width: 100%; height: 130px; object-fit: cover; border-radius: 8px; }
        .gallery-card p { margin: 8px 0 4px; font-size: 13px; font-weight: 600; }
        .gallery-card small { font-size: 11px; color: #9ca3af; }

        /* ===== RESPONSIVE BREAKPOINTS ===== */

        /* Tablet */
        @media (max-width: 1024px) {
            .header-right .admin-name { display: inline; }
        }

        /* Mobile */
        @media (max-width: 768px) {
            /* Show hamburger */
            .hamburger { display: flex; }

            /* Sidebar slides off-screen by default */
            .sidebar { transform: translateX(-100%); top: 0; padding-top: 10px; }
            .sidebar.open { transform: translateX(0); }
            .sidebar-close { display: block; }

            /* Main content full width */
            .main-content { margin-left: 0; padding: 76px 14px 100px; }

            /* Header */
            .admin-header { padding: 0 14px; }
            .admin-header h1 { font-size: 14px; max-width: 160px; }
            .header-right .admin-name { display: none; }

            /* Login box */
            .login-box { padding: 28px 20px; }

            /* Stats: 2 cols on phone */
            .stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
            .stat-number { font-size: 24px; }

            /* Gallery: 2 cols on phone */
            .gallery-grid { grid-template-columns: 1fr 1fr; }

            /* Tables scroll horizontally */
            .table-wrap { border-radius: 8px; }
            table { min-width: 600px; }

            /* Forms full width */
            .btn-save { width: 100%; }
        }

        @media (max-width: 400px) {
            .stats-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: 1fr; }
        }
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
    <!-- Dark Overlay for mobile sidebar -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

    <div class="admin-header">
        <div style="display:flex;align-items:center;gap:12px;">
            <button class="hamburger" id="hamburgerBtn" onclick="toggleSidebar()" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
            <h1>🩺 Glance Healthcare Admin</h1>
        </div>
        <div class="header-right">
            <span class="admin-name">👋 <?php echo htmlspecialchars($_SESSION['admin_name']); ?></span>
            <a href="?logout=1" class="logout-btn">Logout</a>
        </div>
    </div>

    <div class="sidebar" id="sidebar">
        <div class="sidebar-close"><button onclick="closeSidebar()">✕</button></div>
        <?php $cur = $_GET['page'] ?? 'dashboard'; ?>
        <a href="?page=dashboard" class="<?php echo $cur==='dashboard'?'active':''; ?>">📊 Dashboard</a>
        <a href="?page=products" class="<?php echo $cur==='products'?'active':''; ?>">📦 Products</a>
        <a href="?page=add_product" class="<?php echo $cur==='add_product'?'active':''; ?>">➕ Add Product</a>
        <a href="?page=categories" class="<?php echo $cur==='categories'?'active':''; ?>">📂 Categories</a>
        <a href="?page=gallery" class="<?php echo $cur==='gallery'?'active':''; ?>">🖼️ Gallery</a>
        <a href="?page=orders" class="<?php echo $cur==='orders'?'active':''; ?>">🛒 Orders</a>
        <a href="?page=users" class="<?php echo $cur==='users'?'active':''; ?>">👥 Users</a>
        <a href="?page=messages" class="<?php echo $cur==='messages'?'active':''; ?>">💬 Messages</a>
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
        <div class="table-wrap">
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
        <a href="?edit_product=<?php echo $product['id']; ?>" class="btn-edit">Edit</a>
        <a href="?delete_product=<?php echo $product['id']; ?>" class="btn-delete" onclick="return confirm('Delete?')">Delete</a>
    </td>
</tr>
<?php endforeach; ?>
            </tbody>
        </table>
        </div>
        
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
        <div class="table-wrap">
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
        </div>

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
        <h3 style="margin-bottom:10px;">Gallery Images (<?php echo count($galleryImages); ?>)</h3>
        <?php if (empty($galleryImages)): ?>
            <p style="color:#888;">No images yet. Upload one above.</p>
        <?php else: ?>
        <div class="gallery-grid">
            <?php foreach ($galleryImages as $img): ?>
            <div class="gallery-card">
                <img src="<?php echo htmlspecialchars($img['image']); ?>"
                     onerror="this.src='http://localhost:8080/images/medicines/placeholder.jpg'">
                <p><?php echo htmlspecialchars($img['title'] ?: 'Untitled'); ?></p>
                <small><?php echo htmlspecialchars($img['category']); ?></small><br>
                <a href="?page=gallery&delete_gallery=<?php echo $img['id']; ?>"
                   class="btn-delete" style="margin-top:8px;display:inline-block;"
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
        <div class="table-wrap">
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
        <div class="table-wrap">
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
        </div>
        <?php endif; ?>

        <?php elseif ($page === 'messages'): ?>
        <h2>💬 Contact Messages</h2>
        <?php if (empty($allMessages)): ?>
            <p style="color:#888;">No messages yet.</p>
        <?php else: ?>
        <div class="table-wrap">
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
                <td style="max-width:200px;">
                    <span title="<?php echo htmlspecialchars($msg['message']); ?>">
                        <?php echo htmlspecialchars(substr($msg['message'], 0, 60)) . (strlen($msg['message']) > 60 ? '...' : ''); ?>
                    </span>
                </td>
                <td><?php echo date('d M Y', strtotime($msg['created_at'])); ?></td>
            </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        </div>
        <?php endif; ?>

        <?php endif; ?>
    </div>
<?php endif; ?>

<script>
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebarOverlay').classList.toggle('active');
    }
    function closeSidebar() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('active');
    }
    // Close sidebar on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) closeSidebar();
    });
</script>
</body>
</html>