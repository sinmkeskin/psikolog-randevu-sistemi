<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("db-config.php");

$doctorId = $_GET['doctorId'] ?? null; // GET parametresinden doctorId alıyoruz

if (!$doctorId) {
    echo json_encode(["error" => "Doktor ID belirtilmedi."]);
    exit;
}

// Doktorun randevularını al
$sql = "SELECT id, doctorId, Email, date, time, status FROM appointments WHERE doctorId = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "SQL Hatası: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $doctorId);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = [
        "id" => $row["id"],
        "email" => $row["Email"],
        "date" => $row["date"],
        "time" => $row["time"],
        "status" => $row["status"] ?? "Bekliyor" // Status sütunu boşsa "Bekliyor" olarak göster
    ];
}

echo json_encode(["appointments" => $appointments]);

$stmt->close();
$conn->close();
?>
