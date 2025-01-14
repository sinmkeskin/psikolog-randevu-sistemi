<?php
$servername = "bwg9g8ilezeklrvefyjv-mysql.services.clever-cloud.com";
$username = "u7wwallvnxp5gffz";
$password = "aAHd4tIiDaDcoQ1oiOiO";
$dbname = "bwg9g8ilezeklrvefyjv";

// Veritabanı bağlantısını kur
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Veritabanına bağlanılamadı: ' . $conn->connect_error]);
} else {
    echo json_encode(['message' => 'Veritabanı bağlantısı başarılı!']);
}
?>


