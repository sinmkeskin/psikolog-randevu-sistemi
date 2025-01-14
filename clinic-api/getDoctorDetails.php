<?php
// PHP başlıkları:
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include('db-config.php');

$doctorId = $_GET['doctorId'] ?? null; // doktor_id parametresini al
if (!$doctorId) {
    echo json_encode(["error" => "Doktor ID belirtilmedi."]);
    exit;
}


$sql = "SELECT name, photo FROM doctors WHERE doctorId = ?";
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
    $availability = [];
    $scheduleQuery = "SELECT date, time, is_available FROM doctor_schedule WHERE doctorId = ?";
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
