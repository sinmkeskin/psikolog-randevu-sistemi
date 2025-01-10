<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clinic_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

$doctor_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT doctor_id, name, specialty, experience, bio, photo FROM doctors WHERE doctor_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $doctor = $result->fetch_assoc();
    echo json_encode($doctor);
} else {
    echo json_encode(null);
}

$stmt->close();
$conn->close();
?>
