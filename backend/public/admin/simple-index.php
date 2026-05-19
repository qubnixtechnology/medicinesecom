<?php
session_start();
$pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=glance_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Simple admin check
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND role = 'admin'");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_logged_in'] = true;
        $isLoggedIn = true;
    } else {
        $error = "Invalid credentials";
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: simple-index.php');
    exit;
}

// Get data
$totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$totalOrders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$totalUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE role='customer'")->fetchColumn();
$totalMessages = $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
$allProducts = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
$allCategories = $pdo->query("SELECT * FROM categories")->fetchAll();
$allOrders = $pdo->query("SELECT * FROM orders ORDER BY id DESC")->fetchAll();
$allUsers = $pdo->query("SELECT * FROM users ORDER BY id DESC")->fetchAll();
$allMessages = $pdo->query("SELECT * FROM contacts ORDER BY id DESC")->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <style>
        body { font-family: Arial; margin: 0; padding: 20px; background: #f0f2f5; }
        .header { background: white; padding: 15px; margin-bottom: 20px; border-radius: 8px; display: flex; justify-content: space-between; }
        .sidebar { width: 200px; background: white; position: fixed; left: 0; top: 70px; bottom: 0; padding: 20px; }
        .main { margin-left: 220px; }
        .stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 15px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 15px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 28px; font-weight: bold; color: #2563eb; }
        table { width: 100%; background: white; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f0f0f0; }
        .btn { display: inline-block; padding: 5px 10px; margin: 2px; text-decoration: none; border-radius: 4px; color: white; }
        .btn-edit { background: #2563eb; }
        .btn-delete { background: #dc2626; }
        .login-box { width: 300px; margin: 100px auto; background: white; padding: 30px; border-radius: 8px; text-align: center; }
        input { width: 100%; padding: 8px; margin: 10px 0; }
        button { background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .sidebar a { display: block; padding: 10px; margin: 5px 0; text-decoration: none; color: #333; border-radius: 4px; }
        .sidebar a:hover { background: #e0e0e0; }
    </style>
</head>
<body>

<?php if (!$isLoggedIn): ?>
<div class="login-box">
    <h2>Admin Login</h2>
    <?php if(isset($error)) echo "<p style='color:red'>$error</p>"; ?>
    <form method="POST">
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit" name="login">Login</button>
    </form>
    <p>admin@glance.com / admin123</p>
</div>
<?php else: ?>

<div class="header">
    <h2>Glance Healthcare Admin</h2>
    <a href="?logout=1">Logout</a>
</div>

<div class="sidebar">
    <a href="?page=dashboard">Dashboard</a>
    <a href="?page=products">Products</a>
    <a href="?page=categories">Categories</a>
    <a href="?page=orders">Orders</a>
    <a href="?page=users">Users</a>
    <a href="?page=messages">Messages</a>
</div>

<div class="main">
    <?php $page = $_GET['page'] ?? 'dashboard'; ?>
    
    <?php if ($page === 'dashboard'): ?>
    <div class="stats">
        <div class="stat-card"><div class="stat-number"><?php echo $totalProducts; ?></div><div>Products</div></div>
        <div class="stat-card"><div class="stat-number"><?php echo $totalOrders; ?></div><div>Orders</div></div>
        <div class="stat-card"><div class="stat-number"><?php echo $totalUsers; ?></div><div>Users</div></div>
        <div class="stat-card"><div class="stat-number"><?php echo $totalMessages; ?></div><div>Messages</div></div>
    </div>
    <?php endif; ?>
    
    <?php if ($page === 'products'): ?>
    <h2>Products (<?php echo count($allProducts); ?>)</h2>
    <table>
        <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
        <tbody>
        <?php foreach($allProducts as $p): ?>
        <tr>
            <td><?php echo $p['id']; ?></td>
            <td><?php echo $p['name']; ?></td>
            <td><?php echo $p['category']; ?></td>
            <td>₹<?php echo $p['price']; ?></td>
            <td><?php echo $p['stock']; ?></td>
        </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
    
    <?php if ($page === 'categories'): ?>
    <h2>Categories (<?php echo count($allCategories); ?>)</h2>
    <table>
        <thead><tr><th>ID</th><th>Name</th><th>Slug</th></tr></thead>
        <tbody>
        <?php foreach($allCategories as $c): ?>
        <tr><td><?php echo $c['id']; ?></td><td><?php echo $c['name']; ?></td><td><?php echo $c['slug']; ?></td></tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
    
    <?php if ($page === 'orders'): ?>
    <h2>Orders (<?php echo count($allOrders); ?>)</h2>
    <table>
        <thead><tr><th>ID</th><th>Order #</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
        <?php foreach($allOrders as $o): ?>
        <tr><td><?php echo $o['id']; ?></td><td><?php echo $o['order_number']; ?></td><td>₹<?php echo $o['total']; ?></td><td><?php echo $o['status']; ?></td><td><?php echo $o['created_at']; ?></td></tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
    
    <?php if ($page === 'users'): ?>
    <h2>Users (<?php echo count($allUsers); ?>)</h2>
    <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
        <?php foreach($allUsers as $u): ?>
        <tr><td><?php echo $u['id']; ?></td><td><?php echo $u['name']; ?></td><td><?php echo $u['email']; ?></td><td><?php echo $u['role']; ?></td></tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
    
    <?php if ($page === 'messages'): ?>
    <h2>Messages (<?php echo count($allMessages); ?>)</h2>
    <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
        <tbody>
        <?php foreach($allMessages as $m): ?>
        <tr><td><?php echo $m['id']; ?></td><td><?php echo $m['name']; ?></td><td><?php echo $m['email']; ?></td><td><?php echo substr($m['message'], 0, 50); ?>...</td><td><?php echo $m['created_at']; ?></td></tr>
        <?php endforeach; ?>
        </tbody>
    <table>
    <?php endif; ?>
</div>

<?php endif; ?>
</body>
</html>