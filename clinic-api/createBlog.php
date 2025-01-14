<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Content-Type: application/json");

include("db-config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Gerekli parametreleri al
$doctorId = $data['doctorId'] ?? null;
$title = $data['title'] ?? null;
$content = $data['content'] ?? null;

if (!$doctorId || !$title || !$content) {
    echo json_encode(["error" => "Eksik bilgi."]);
    exit;
}

// Blog yazısını ekle
$sql = "INSERT INTO doctor_blogs (doctor_id, title, content) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $doctorId, $title, $content);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Blog yazısı oluşturuldu."]);
} else {
    echo json_encode(["error" => "Blog yazısı oluşturulamadı."]);
}

$stmt->close();
$conn->close();
?>
