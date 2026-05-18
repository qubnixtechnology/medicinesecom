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
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

// Handle Add Category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_category'])) {
    $name = trim($_POST['name']);
    $slug = strtolower(str_replace(' ', '-', $name));
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    $description = trim($_POST['description']);
    
    // Check if category already exists
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

// Handle Update Category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_category'])) {
    $id = $_POST['category_id'];
    $name = trim($_POST['name']);
    $slug = strtolower(str_replace(' ', '-', $name));
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    $description = trim($_POST['description']);
    
    $stmt = $pdo->prepare("UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?");
    $stmt->execute([$name, $slug, $description, $id]);
    $success = "Category updated successfully!";
}

// Handle Delete Category
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    
    // Check if category has products
    $check = $pdo->prepare("SELECT COUNT(*) FROM products WHERE category_slug = (SELECT slug FROM categories WHERE id = ?)");
    $check->execute([$id]);
    $productCount = $check->fetchColumn();
    
    if ($productCount > 0) {
        $error = "Cannot delete category! It has $productCount products. Move products first.";
    } else {
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        $success = "Category deleted successfully!";
    }
}

// Get all categories
$categories = $pdo->query("SELECT c.*, COUNT(p.id) as product_count 
                           FROM categories c 
                           LEFT JOIN products p ON c.slug = p.category_slug 
                           GROUP BY c.id 
                           ORDER BY c.name")->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Categories - Admin Panel</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f0f2f5; padding: 20px; }
        
        .container { max-width: 1200px; margin: 0 auto; }
        
        .header { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { color: #2563eb; }
        .back-btn { background: #6b7280; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; }
        .back-btn:hover { background: #4b5563; }
        
        .card { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card h2 { margin-bottom: 20px; color: #1f2937; }
        
        input, textarea { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
        button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
        button:hover { background: #1d4ed8; }
        .delete-btn { background: #dc2626; }
        .delete-btn:hover { background: #b91c1c; }
        .edit-btn { background: #eab308; }
        .edit-btn:hover { background: #ca8a04; }
        
        .success { background: #dcfce7; color: #16a34a; padding: 12px; border-radius: 8px; margin-bottom: 20px; }
        .error { background: #fee2e2; color: #dc2626; padding: 12px; border-radius: 8px; margin-bottom: 20px; }
        
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        .actions { display: flex; gap: 10px; }
        .actions button { padding: 5px 12px; font-size: 12px; }
        
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; }
        .modal-content { background: white; margin: 50px auto; padding: 30px; width: 500px; border-radius: 12px; }
        .close { float: right; font-size: 28px; cursor: pointer; }
        
        @media (max-width: 768px) { table { font-size: 12px; } th, td { padding: 8px; } .actions { flex-direction: column; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📂 Category Management</h1>
            <a href="index.php" class="back-btn">← Back to Dashboard</a>
        </div>
        
        <?php if(isset($success)): ?>
            <div class="success">✅ <?php echo $success; ?></div>
        <?php endif; ?>
        
        <?php if(isset($error)): ?>
            <div class="error">❌ <?php echo $error; ?></div>
        <?php endif; ?>
        
        <!-- Add Category Form -->
        <div class="card">
            <h2>➕ Add New Category</h2>
            <form method="POST">
                <input type="text" name="name" placeholder="Category Name (e.g., Heart Health)" required>
                <textarea name="description" placeholder="Category Description" rows="2"></textarea>
                <button type="submit" name="add_category">Add Category</button>
            </form>
        </div>
        
        <!-- Categories List -->
        <div class="card">
            <h2>📋 All Categories (<?php echo count($categories); ?>)</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($categories as $cat): ?>
                    <tr>
                        <td><?php echo $cat['id']; ?></td>
                        <td><strong><?php echo htmlspecialchars($cat['name']); ?></strong></td>
                        <td><code><?php echo $cat['slug']; ?></code></td>
                        <td><?php echo htmlspecialchars($cat['description'] ?? '-'); ?></td>
                        <td><?php echo $cat['product_count']; ?> products</td>
                        <td class="actions">
                            <button class="edit-btn" onclick="editCategory(<?php echo $cat['id']; ?>, '<?php echo addslashes($cat['name']); ?>', '<?php echo addslashes($cat['description']); ?>')">Edit</button>
                            <a href="?delete=<?php echo $cat['id']; ?>" class="delete-btn" style="color:white; text-decoration:none; padding:5px 12px; border-radius:4px;" onclick="return confirm('Delete this category? Products will NOT be deleted but will lose category.')">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Edit Modal -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>✏️ Edit Category</h2>
            <form method="POST">
                <input type="hidden" name="category_id" id="edit_id">
                <input type="text" name="name" id="edit_name" required>
                <textarea name="description" id="edit_description" rows="2"></textarea>
                <button type="submit" name="update_category">Update Category</button>
            </form>
        </div>
    </div>
    
    <script>
        function editCategory(id, name, description) {
            document.getElementById('edit_id').value = id;
            document.getElementById('edit_name').value = name;
            document.getElementById('edit_description').value = description || '';
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
</body>
</html>