<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include("db-config.php");

$doctorId = $_GET['doctor_id'] ?? null;

if (!$doctorId) {
    echo json_encode(["error" => "Doktor ID belirtilmedi."]);
    exit;
}

// Doktor bilgisi ve uygunluk bilgilerini al
$sql = "SELECT name, photo FROM doctors WHERE doctor_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "SQL Hatası: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $doctorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $doctor = $result->fetch_assoc();

    // Randevu uygunluk bilgisi
    $availability = [];
    $scheduleQuery = "SELECT date, time, is_available FROM doctor_schedule WHERE doctor_id = ?";
    $scheduleStmt = $conn->prepare($scheduleQuery);

    if (!$scheduleStmt) {
        echo json_encode(["error" => "Randevu SQL Hatası: " . $conn->error]);
        exit;
    }

    $scheduleStmt->bind_param("i", $doctorId);
    $scheduleStmt->execute();
    $scheduleResult = $scheduleStmt->get_result();

    while ($row = $scheduleResult->fetch_assoc()) {
        $availability[] = $row;
    }

    echo json_encode([
        "doctor" => [
            "name" => $doctor['name'],
            "photo" => base64_encode($doctor['photo']) // Blob'u Base64'e çevir
        ],
        "availability" => $availability
    ]);
} else {
    echo json_encode(["error" => "Doktor bulunamadı."]);
}

$conn->close();
?>
