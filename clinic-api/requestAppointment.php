<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");
include("db-config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Parametreleri al
$doctorId = isset($data['doctorId']) ? (int) $data['doctorId'] : null;
$date = $data['date'] ?? null;
$time = $data['time'] ?? null;
$userEmail = $data['userEmail'] ?? null;

// Eksik bilgi kontrolü
if (!$doctorId || !$date || !$time || !$userEmail) {
    echo json_encode([
        "success" => false,
        "message" => "Eksik bilgi.",
        "missing" => [
            "doctorId" => $doctorId ? "Var" : "Eksik",
            "date" => $date ? "Var" : "Eksik",
            "time" => $time ? "Var" : "Eksik",
            "userEmail" => $userEmail ? "Var" : "Eksik",
        ]
    ]);
    exit;
}

// Randevu durumunu kontrol et
$checkQuery = "SELECT is_available FROM doctor_schedule WHERE doctorId = ? AND date = ? AND time = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("iss", $doctorId, $date, $time);
$stmt->execute();
$result = $stmt->get_result();
$availability = $result->fetch_assoc();

if ($availability && $availability['is_available']) {
    // Randevuyu kaydet
    $insertQuery = "INSERT INTO appointments (doctorId, user_email, date, time) VALUES (?, ?, ?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("isss", $doctorId, $userEmail, $date, $time);

    if ($insertStmt->execute()) {
        // Doktorun e-posta adresini çek
        $emailQuery = "SELECT Email FROM doctors WHERE doctorId = ?";
        $emailStmt = $conn->prepare($emailQuery);
        $emailStmt->bind_param("i", $doctorId);
        $emailStmt->execute();
        $emailResult = $emailStmt->get_result();
        $doctorEmail = $emailResult->fetch_assoc()['Email'];

        // Mail gönderme
        if (mail($doctorEmail, "Yeni Randevu Talebi", "Tarih: $date, Saat: $time")) {
            echo json_encode(["success" => true, "message" => "Randevu talebiniz gönderildi."]);
        } else {
            echo json_encode(["success" => false, "message" => "Mail gönderilemedi."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Randevu kaydı başarısız."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Bu saat dolu veya uygun değil."]);
}

$conn->close();
?>
