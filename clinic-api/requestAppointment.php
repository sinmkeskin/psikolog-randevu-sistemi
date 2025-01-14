<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("db-config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Parametreleri al
$doctorId = $data['doctorId'] ?? null;
$date = $data['date'] ?? null;
$time = $data['time'] ?? null;
$email = $data['email'] ?? null; // Burada 'email' parametresini kullanıyoruz

// Eksik bilgi kontrolü
if (!$doctorId || !$date || !$time || !$email) {
    echo json_encode([
        "success" => false,
        "message" => "Eksik bilgi.",
        "missing" => [
            "doctorId" => $doctorId ? "Var" : "Eksik",
            "date" => $date ? "Var" : "Eksik",
            "time" => $time ? "Var" : "Eksik",
            "Email" => $email ? "Var" : "Eksik", // 'Email' kontrolü
        ]
    ]);
    exit;
}

// Randevu durumunu kontrol et
$checkQuery = "SELECT is_available FROM doctor_schedule WHERE doctorId = ? AND date = ? AND time = ?";
$stmt = $conn->prepare($checkQuery);

if (!$stmt) {
    echo json_encode(["error" => "SQL Hatası: " . $conn->error]);
    exit;
}

$stmt->bind_param("iss", $doctorId, $date, $time);
$stmt->execute();
$result = $stmt->get_result();
$availability = $result->fetch_assoc();

if ($availability && $availability['is_available']) {
    // Randevuyu kaydet
    $insertQuery = "INSERT INTO appointments (doctorId, Email, date, time) VALUES (?, ?, ?, ?)";
    $insertStmt = $conn->prepare($insertQuery);

    if (!$insertStmt) {
        echo json_encode(["error" => "Randevu ekleme sorgusu hatası: " . $conn->error]);
        exit;
    }

    $insertStmt->bind_param("isss", $doctorId, $email, $date, $time);

    if ($insertStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Randevu talebiniz başarıyla gönderildi."]);
    } else {
        echo json_encode(["success" => false, "message" => "Randevu kaydı başarısız."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Bu saat dolu veya uygun değil."]);
}

$conn->close();
?>
