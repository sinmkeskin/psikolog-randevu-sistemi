<?php
$servername = "sql104.infinityfree.com";
$username = "if0_38104156";
$password = "Gh9R7CSk7lDD";
$dbname = "if0_38104156_clinic";

// Veritabanı bağlantısını kur
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Veritabanına bağlanılamadı: ' . $conn->connect_error]);
} else {
    echo json_encode(['message' => 'Veritabanı bağlantısı başarılı!']);
}
?>


