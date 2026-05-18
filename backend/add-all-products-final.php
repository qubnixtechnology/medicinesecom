<?php
session_start();

// Database connection
$host = 'localhost';
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

// Handle Add Product
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
    $name = $_POST['name'];
    $slug = strtolower(str_replace(' ', '-', $name));
    $category = $_POST['category'];
    $category_slug = strtolower(str_replace(' ', '-', $category));
    $brand = $_POST['brand'];
    $price = $_POST['price'];
    $volume = $_POST['volume'];
    $stock = $_POST['stock'];
    $prescription = isset($_POST['is_prescription_required']) ? 1 : 0;
    $description = $_POST['description'];
    $images = json_encode(['/images/medicines/placeholder.jpg']);
    
    $stmt = $pdo->prepare("INSERT INTO products (name, slug, category, category_slug, brand, price, volume, stock, is_prescription_required, description, images, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $slug, $category, $category_slug, $brand, $price, $volume, $stock, $prescription, $description, $images]);
    
    $success = "Product added successfully!";
}

// Handle Delete Product
if (isset($_GET['delete_product'])) {
    $id = $_GET['delete_product'];
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $success = "Product deleted successfully!";
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
    
    $stmt = $pdo->prepare("UPDATE products SET name = ?, category = ?, brand = ?, price = ?, volume = ?, stock = ?, is_prescription_required = ? WHERE id = ?");
    $stmt->execute([$name, $category, $brand, $price, $volume, $stock, $prescription, $id]);
    
    $success = "Product updated successfully!";
}

// Handle Update Order Status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_order'])) {
    $order_id = $_POST['order_id'];
    $status = $_POST['status'];
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->execute([$status, $order_id]);
    $success = "Order status updated!";
}

// Get statistics
if ($isLoggedIn) {
    $totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $totalOrders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $totalUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'customer'")->fetchColumn();
    $totalMessages = $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
    $unreadMessages = $pdo->query("SELECT COUNT(*) FROM contacts WHERE is_read = 0")->fetchColumn();
    $totalRevenue = $pdo->query("SELECT COALESCE(SUM(total), 0) FROM orders WHERE status != 'cancelled'")->fetchColumn();
    
    // Get data for tables
    $recentOrders = $pdo->query("SELECT o.*, u.name as user_name FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 10")->fetchAll();
    $allProducts = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
    $allUsers = $pdo->query("SELECT * FROM users ORDER BY id DESC")->fetchAll();
    $allMessages = $pdo->query("SELECT * FROM contacts ORDER BY id DESC")->fetchAll();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glance Healthcare - Admin Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f0f2f5; }
        
        /* Login Page */
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .login-box { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 400px; }
        .login-box h2 { text-align: center; color: #333; margin-bottom: 30px; }
        .login-box input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; }
        .login-box button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 20px; }
        .error { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .success { background: #dcfce7; color: #16a34a; padding: 10px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        
        /* Admin Dashboard */
        .admin-header { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
        .admin-header h1 { font-size: 20px; color: #2563eb; }
        .logout-btn { background: #dc2626; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; }
        
        .sidebar { width: 260px; background: white; position: fixed; left: 0; top: 60px; bottom: 0; box-shadow: 2px 0 4px rgba(0,0,0,0.1); overflow-y: auto; }
        .sidebar nav { padding: 20px; }
        .sidebar a { display: block; padding: 12px 16px; color: #4b5563; text-decoration: none; border-radius: 8px; margin-bottom: 4px; }
        .sidebar a:hover, .sidebar a.active { background: #e5e7eb; color: #2563eb; }
        
        .main-content { margin-left: 260px; padding: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card h3 { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
        .stat-number { font-size: 28px; font-weight: bold; color: #2563eb; }
        
        .section-title { font-size: 20px; font-weight: bold; margin: 30px 0 20px; color: #1f2937; }
        table { width: 100%; background: white; border-radius: 12px; overflow: auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-collapse: collapse; }
        th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        
        .btn-add { background: #22c55e; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 20px; }
        .btn-edit { background: #2563eb; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; margin-right: 5px; }
        .btn-delete { background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; }
        .btn-save { background: #22c55e; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; }
        
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; }
        .modal-content { background: white; margin: 50px auto; padding: 30px; width: 500px; border-radius: 12px; max-height: 80%; overflow-y: auto; }
        .modal-content input, .modal-content select, .modal-content textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; }
        .close { float: right; font-size: 28px; cursor: pointer; }
        
        @media (max-width: 768px) { .sidebar { display: none; } .main-content { margin-left: 0; } }
    </style>
</head>
<body>

<?php if (!$isLoggedIn): ?>
    <!-- Login Page -->
    <div class="login-container">
        <div class="login-box">
            <h2>🔐 Admin Login</h2>
            <?php if(isset($error)) echo '<div class="error">❌ ' . $error . '</div>'; ?>
            <form method="POST">
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login to Dashboard</button>
            </form>
            <p style="text-align:center; margin-top:20px; font-size:12px; color:#666;">admin@glance.com / admin123</p>
        </div>
    </div>
<?php else: ?>
    <!-- Admin Dashboard -->
    <div class="admin-header">
        <h1>🩺 Glance Healthcare - Admin Dashboard</h1>
        <div>
            <span style="margin-right:15px;">👋 Welcome, <?php echo htmlspecialchars($_SESSION['admin_name']); ?></span>
            <a href="?logout=1" class="logout-btn">🚪 Logout</a>
        </div>
    </div>
    
    <div class="sidebar">
        <nav>
            <a href="?page=dashboard" class="<?php echo (!isset($_GET['page']) || $_GET['page'] == 'dashboard') ? 'active' : ''; ?>">📊 Dashboard</a>
            <a href="?page=products" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'products') ? 'active' : ''; ?>">📦 Products</a>
            <a href="?page=add_product" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'add_product') ? 'active' : ''; ?>">➕ Add Product</a>
            <a href="?page=orders" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'orders') ? 'active' : ''; ?>">🛒 Orders</a>
            <a href="?page=users" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'users') ? 'active' : ''; ?>">👥 Users</a>
            <a href="?page=messages" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'messages') ? 'active' : ''; ?>">💬 Messages</a>
        </nav>
    </div>
    
    <div class="main-content">
        <?php if(isset($success)) echo '<div class="success">✅ ' . $success . '</div>'; ?>
        
        <?php
        $page = $_GET['page'] ?? 'dashboard';
        
        if ($page === 'dashboard'):
        ?>
        <div class="stats-grid">
            <div class="stat-card"><h3>📦 Total Products</h3><div class="stat-number"><?php echo $totalProducts; ?></div></div>
            <div class="stat-card"><h3>🛒 Total Orders</h3><div class="stat-number"><?php echo $totalOrders; ?></div></div>
            <div class="stat-card"><h3>👥 Customers</h3><div class="stat-number"><?php echo $totalUsers; ?></div></div>
            <div class="stat-card"><h3>💬 Messages</h3><div class="stat-number"><?php echo $totalMessages; ?> (<?php echo $unreadMessages; ?> unread)</div></div>
            <div class="stat-card"><h3>💰 Revenue</h3><div class="stat-number">₹<?php echo number_format($totalRevenue, 2); ?></div></div>
        </div>
        
        <h3 class="section-title">🛒 Recent Orders</h3>
        <table><thead><tr><th>ID</th><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody><?php foreach($recentOrders as $order): ?>
        <tr><td><?php echo $order['id']; ?></td><td><?php echo $order['order_number']; ?></td><td><?php echo htmlspecialchars($order['user_name'] ?? 'Guest'); ?></td><td>₹<?php echo number_format($order['total'], 2); ?></td><td><?php echo ucfirst($order['status']); ?></td><td><?php echo date('d M Y', strtotime($order['created_at'])); ?></td></tr>
        <?php endforeach; ?></tbody></table>
        
        <?php elseif ($page === 'products'): ?>
        <h3 class="section-title">📦 All Products</h3>
        <table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody><?php foreach($allProducts as $product): ?>
        <tr>
            <td><?php echo $product['id']; ?></td>
            <td><?php echo htmlspecialchars($product['name']); ?></td>
            <td><?php echo htmlspecialchars($product['category']); ?></td>
            <td>₹<?php echo number_format($product['price'], 2); ?></td>
            <td><?php echo $product['stock']; ?></td>
            <td>
                <button class="btn-edit" onclick="editProduct(<?php echo $product['id']; ?>, '<?php echo addslashes($product['name']); ?>', '<?php echo addslashes($product['category']); ?>', '<?php echo addslashes($product['brand']); ?>', <?php echo $product['price']; ?>, '<?php echo $product['volume']; ?>', <?php echo $product['stock']; ?>, <?php echo $product['is_prescription_required']; ?>)">Edit</button>
                <a href="?delete_product=<?php echo $product['id']; ?>" class="btn-delete" onclick="return confirm('Delete this product?')">Delete</a>
            </td>
        </tr>
        <?php endforeach; ?></tbody></table>
        
        <?php elseif ($page === 'add_product'): ?>
        <h3 class="section-title">➕ Add New Product</h3>
        <form method="POST" style="background:white; padding:20px; border-radius:12px;">
            <input type="text" name="name" placeholder="Product Name" required>
            <input type="text" name="category" placeholder="Category" required>
            <input type="text" name="brand" placeholder="Brand" value="Glance Healthcare" required>
            <input type="number" name="price" placeholder="Price (₹)" step="0.01" required>
            <input type="text" name="volume" placeholder="Volume/Pack Size">
            <input type="number" name="stock" placeholder="Stock Quantity" value="100">
            <label><input type="checkbox" name="is_prescription_required"> Prescription Required</label>
            <textarea name="description" placeholder="Product Description" rows="3"></textarea>
            <button type="submit" name="add_product" class="btn-save">Add Product</button>
        </form>
        
        <?php elseif ($page === 'orders'): ?>
        <h3 class="section-title">🛒 All Orders</h3>
        <table><thead><tr><th>ID</th><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Update Status</th><th>Date</th></tr></thead>
        <tbody>
        <?php $allOrders = $pdo->query("SELECT o.*, u.name as user_name FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.id DESC")->fetchAll(); ?>
        <?php foreach($allOrders as $order): ?>
        <tr>
            <td><?php echo $order['id']; ?></td>
            <td><?php echo $order['order_number']; ?></td>
            <td><?php echo htmlspecialchars($order['user_name'] ?? 'Guest'); ?></td>
            <td>₹<?php echo number_format($order['total'], 2); ?></td>
            <td><?php echo ucfirst($order['status']); ?></td>
            <td>
                <form method="POST" style="margin:0;">
                    <input type="hidden" name="order_id" value="<?php echo $order['id']; ?>">
                    <select name="status" onchange="this.form.submit()">
                        <option value="pending" <?php echo $order['status'] == 'pending' ? 'selected' : ''; ?>>Pending</option>
                        <option value="processing" <?php echo $order['status'] == 'processing' ? 'selected' : ''; ?>>Processing</option>
                        <option value="shipped" <?php echo $order['status'] == 'shipped' ? 'selected' : ''; ?>>Shipped</option>
                        <option value="delivered" <?php echo $order['status'] == 'delivered' ? 'selected' : ''; ?>>Delivered</option>
                        <option value="cancelled" <?php echo $order['status'] == 'cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                    </select>
                    <input type="submit" name="update_order" value="Update" style="margin-left:5px;">
                </form>
            </td>
            <td><?php echo date('d M Y', strtotime($order['created_at'])); ?></td>
        </tr>
        <?php endforeach; ?>
        </tbody></table>
        
        <?php elseif ($page === 'users'): ?>
        <h3 class="section-title">👥 Registered Users</h3>
        <table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Registered</th></tr></thead>
        <tbody><?php foreach($allUsers as $user): ?>
        <tr><td><?php echo $user['id']; ?></td><td><?php echo htmlspecialchars($user['name']); ?></td><td><?php echo htmlspecialchars($user['email']); ?></td><td><?php echo htmlspecialchars($user['phone']); ?></td><td><?php echo ucfirst($user['role']); ?></td><td><?php echo date('d M Y', strtotime($user['created_at'])); ?></td></tr>
        <?php endforeach; ?></tbody></table>
        
        <?php elseif ($page === 'messages'): ?>
        <h3 class="section-title">💬 Contact Messages</h3>
        <table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
        <tbody><?php foreach($allMessages as $msg): ?>
        <tr><td><?php echo $msg['id']; ?></td><td><?php echo htmlspecialchars($msg['name']); ?></td><td><?php echo htmlspecialchars($msg['email']); ?></td><td><?php echo htmlspecialchars($msg['phone']); ?></td><td><?php echo htmlspecialchars($msg['subject']); ?></td><td><?php echo htmlspecialchars(substr($msg['message'], 0, 50)); ?>...</td><td><?php echo date('d M Y', strtotime($msg['created_at'])); ?></td></tr>
        <?php endforeach; ?></tbody></table>
        <?php endif; ?>
    </div>
    
    <!-- Edit Product Modal -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h3>✏️ Edit Product</h3>
            <form method="POST" id="editForm">
                <input type="hidden" name="product_id" id="edit_id">
                <input type="text" name="name" id="edit_name" placeholder="Product Name" required>
                <input type="text" name="category" id="edit_category" placeholder="Category" required>
                <input type="text" name="brand" id="edit_brand" placeholder="Brand" required>
                <input type="number" name="price" id="edit_price" placeholder="Price" step="0.01" required>
                <input type="text" name="volume" id="edit_volume" placeholder="Volume">
                <input type="number" name="stock" id="edit_stock" placeholder="Stock">
                <label><input type="checkbox" name="is_prescription_required" id="edit_prescription"> Prescription Required</label>
                <button type="submit" name="update_product" class="btn-save">Update Product</button>
            </form>
        </div>
    </div>
    
    <script>
        function editProduct(id, name, category, brand, price, volume, stock, prescription) {
            document.getElementById('edit_id').value = id;
            document.getElementById('edit_name').value = name;
            document.getElementById('edit_category').value = category;
            document.getElementById('edit_brand').value = brand;
            document.getElementById('edit_price').value = price;
            document.getElementById('edit_volume').value = volume;
            document.getElementById('edit_stock').value = stock;
            document.getElementById('edit_prescription').checked = prescription == 1;
            document.getElementById('editModal').style.display = 'block';
        }
        
        function closeModal() {
            document.getElementById('editModal').style.display = 'none';
        }
        
        window.onclick = function(event) {
            if (event.target == document.getElementById('editModal')) {
                closeModal();
            }
        }
    </script>
<?php endif; ?>
</body>
</html>