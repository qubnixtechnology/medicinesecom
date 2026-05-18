<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = __DIR__ . '/uploads/products/';
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
    
    $fileName = time() . '_' . $_FILES['test_image']['name'];
    $uploadPath = $uploadDir . $fileName;
    
    if (move_uploaded_file($_FILES['test_image']['tmp_name'], $uploadPath)) {
        echo "✅ Uploaded! <a href='/serve-image.php?file=" . urlencode($fileName) . "'>View Image</a>";
    } else {
        echo "❌ Upload failed";
    }
}
?>
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="test_image">
    <button type="submit">Upload</button>
</form>