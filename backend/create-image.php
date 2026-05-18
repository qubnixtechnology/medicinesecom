<?php
// Create a blue placeholder image
$width = 400;
$height = 400;
$img = imagecreatetruecolor($width, $height);

// Colors
$blue = imagecolorallocate($img, 37, 99, 235);  // Blue background
$white = imagecolorallocate($img, 255, 255, 255); // White text

// Fill background
imagefilledrectangle($img, 0, 0, $width, $height, $blue);

// Add text
$text = "Medicine";
$fontSize = 5; // Built-in font
$textWidth = imagefontwidth($fontSize) * strlen($text);
$textHeight = imagefontheight($fontSize);
$x = ($width - $textWidth) / 2;
$y = ($height - $textHeight) / 2;
imagestring($img, $fontSize, $x, $y, $text, $white);

// Save image
$outputPath = __DIR__ . '/public/images/medicines/placeholder.jpg';
$dir = dirname($outputPath);
if (!file_exists($dir)) {
    mkdir($dir, 0777, true);
}
imagejpeg($img, $outputPath, 90);
imagedestroy($img);

echo "✅ Placeholder created at: " . $outputPath . "\n";
echo "File size: " . filesize($outputPath) . " bytes\n";
?>