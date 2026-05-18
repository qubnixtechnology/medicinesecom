<?php
$pdo = new PDO('mysql:host=localhost;port=3307;dbname=glance_db', 'root', '');
$stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin - Contact Messages</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #4CAF50; color: white; }
        tr:nth-child(even) { background: #f9f9f9; }
        .unread { background: #fff3cd; }
    </style>
</head>
<body>
    <h1>Contact Form Submissions</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
        </tr>
        <?php foreach($messages as $msg): ?>
        <tr class="<?php echo $msg['is_read'] ? '' : 'unread'; ?>">
            <td><?php echo $msg['id']; ?></td>
            <td><?php echo htmlspecialchars($msg['name']); ?></td>
            <td><?php echo htmlspecialchars($msg['email']); ?></td>
            <td><?php echo htmlspecialchars($msg['phone']); ?></td>
            <td><?php echo htmlspecialchars($msg['subject']); ?></td>
            <td><?php echo htmlspecialchars($msg['message']); ?></td>
            <td><?php echo $msg['is_read'] ? 'Read' : 'Unread'; ?></td>
            <td><?php echo $msg['created_at']; ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>