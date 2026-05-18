<?php
$images = [
    'Actron.jpeg', 'averion.jpg', 'brainsusp.jpeg', 'brainzendrop.jpg',
    'cogniup.jpg', 'DiazoneAct.jpeg', 'galcimacd3.jpg', 'galcimactab.jpg',
    'minarva.jpg', 'liverish.jpg', 'Melton.jpeg', 'onea.jpg', 'histatone.jpg',
    'caremyo.jpg', 'growargin.jpeg', 'gutsoft.jpg', 'gutsoft2.jpeg',
    'reutisafe.jpg', 'glan.jpg', 'folmecp.jpg', 'brainzen.jpeg'
];

$uploadDir = __DIR__ . '/uploads/products/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

foreach ($images as $image) {
    $imgPath = $uploadDir . $image;
    if (!file_exists($imgPath)) {
        $img = imagecreatetruecolor(400, 400);
        $bg = imagecolorallocate($img, 37, 99, 235);
        $textColor = imagecolorallocate($img, 255, 255, 255);
        imagefilledrectangle($img, 0, 0, 400, 400, $bg);
        $text = pathinfo($image, PATHINFO_FILENAME);
        imagestring($img, 5, 50, 190, substr($text, 0, 20), $textColor);
        imagejpeg($img, $imgPath, 80);
        imagedestroy($img);
        echo "Created: $image\n";
    }
}
echo "\n✅ All images created!\n";
?>