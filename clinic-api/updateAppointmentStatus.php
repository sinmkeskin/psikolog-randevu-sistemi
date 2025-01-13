<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


include("db-config.php");

// İstekten gelen veriyi al
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['appointmentId'] ?? null; // appointmentId yerine id kullanılıyor
$status = $data['status'] ?? null;

// Eksik bilgi kontrolü
if (!$id || !$status) {
    echo json_encode(["success" => false, "error" => "Eksik bilgi."]);
    exit;
}

// Randevu durumu güncelle
$sql = "UPDATE appointments SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "SQL hatası: " . $conn->error]);
    exit;
}
$stmt->bind_param("si", $status, $id);

// Eğer randevu durumu başarılı şekilde güncellendiyse
if ($stmt->execute() && $status === "approved") {
    // appointments tablosundan tarih ve saat bilgilerini al
    $query = "SELECT doctorId, date, time FROM appointments WHERE id = ?";
    $selectStmt = $conn->prepare($query);
    $selectStmt->bind_param("i", $id);
    $selectStmt->execute();
    $result = $selectStmt->get_result();
    $appointment = $result->fetch_assoc();

    if ($appointment) {
        // doctor_schedule tablosunda bu tarihi ve saati "müsait değil" olarak işaretle
        $updateScheduleQuery = "UPDATE doctor_schedule SET is_available = 0 WHERE doctorId = ? AND date = ? AND time = ?";
        $updateScheduleStmt = $conn->prepare($updateScheduleQuery);
        $updateScheduleStmt->bind_param(
            "iss",
            $appointment['doctorId'],
            $appointment['date'],
            $appointment['time']
        );
        $updateScheduleStmt->execute();
        $updateScheduleStmt->close();
    }
    $selectStmt->close();
}

echo json_encode(["success" => true, "message" => "Randevu durumu güncellendi."]);

$stmt->close();
$conn->close();
?>
