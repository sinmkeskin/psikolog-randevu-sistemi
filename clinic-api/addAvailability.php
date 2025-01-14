<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include("db-config.php");

$data = json_decode(file_get_contents("php://input"), true);

$doctorId = $data['doctorId'] ?? null;
$date = $data['date'] ?? null;
$time = $data['time'] ?? null;
$isAvailable = $data['isAvailable'] ?? null;

// Hata raporlamayı aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Eksik bilgi kontrolü
if (!$doctorId || !$date || !$time || !isset($isAvailable)) {
    echo json_encode(["success" => false, "error" => "Eksik bilgi."]);
    exit;
}

// SQL sorgusu
$sql = "INSERT INTO doctor_schedule (doctorId, date, time, is_available) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "SQL sorgusu hazırlanamadı: " . $conn->error]);
    exit;
}

$stmt->bind_param("issi", $doctorId, $date, $time, $isAvailable);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Müsaitlik saati eklendi."]);
} else {
    echo json_encode(["success" => false, "error" => "Saat eklenemedi: " . $stmt->error]);
}

$stmt->close();
$conn->close();
