<?php
$imgPath = __DIR__ . '/public/images/medicines/placeholder.jpg';
$dir = dirname($imgPath);
if (!file_exists($dir)) {
    mkdir($dir, 0777, true);
}

// Create a simple image using built-in functions
$width = 400;
$height = 400;
$img = imagecreatetruecolor($width, $height);

// Colors
$bg = imagecolorallocate($img, 204, 204, 204); // Gray background
$textColor = imagecolorallocate($img, 255, 255, 255); // White text
$borderColor = imagecolorallocate($img, 100, 100, 100); // Dark gray border

// Fill background
imagefilledrectangle($img, 0, 0, $width, $height, $bg);

// Add border
imagerectangle($img, 0, 0, $width-1, $height-1, $borderColor);

// Add text
$text = "No Image Available";
$fontSize = 5; // Built-in font
$textWidth = imagefontwidth($fontSize) * strlen($text);
$textHeight = imagefontheight($fontSize);
$x = ($width - $textWidth) / 2;
$y = ($height - $textHeight) / 2;
imagestring($img, $fontSize, $x, $y, $text, $textColor);

// Save image
imagejpeg($img, $imgPath, 90);
imagedestroy($img);

echo "✅ Placeholder created at: " . $imgPath . "\n";
echo "File size: " . filesize($imgPath) . " bytes\n";
?>