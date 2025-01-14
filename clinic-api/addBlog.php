<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


include("db-config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Blog yazısının içeriği ve doktor ID'si
$doctorId = $data['doctorId'] ?? null;
$content = $data['content'] ?? null;

// Eksik bilgi kontrolü
if (!$doctorId || !$content) {
    echo json_encode(["success" => false, "error" => "Eksik bilgi."]);
    exit;
}

// SQL sorgusu: blog yazısını eklemek için
$sql = "INSERT INTO doctor_blog (doctorId, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "SQL sorgusu hazırlanamadı: " . $conn->error]);
    exit;
}

$stmt->bind_param("is", $doctorId, $content);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Blog yazısı başarıyla kaydedildi."]);
} else {
    echo json_encode(["success" => false, "error" => "Blog yazısı kaydedilemedi: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
