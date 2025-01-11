<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clinic";

// Veritabanı bağlantısını kur
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Veritabanına bağlanılamadı: ' . $conn->connect_error]);
} else {
    echo json_encode(['message' => 'Veritabanı bağlantısı başarılı!']);
}
?>


