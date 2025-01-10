<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Veritabanı bağlantısı
$servername = "localhost";
$username = "root"; // Varsayılan kullanıcı adı
$password = ""; // Varsayılan şifre
$dbname = "clinic"; // Daha önce oluşturduğunuz veritabanı adı

// Bağlantıyı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// SQL sorgusu
$sql = "SELECT * FROM doctors"; // Tablonuzun adı 'doctors' ise
$result = $conn->query($sql);

// Verileri JSON formatında döndür
if ($result->num_rows > 0) {
    $doctors = array();
    while($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
    echo json_encode($doctors, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([]);
}

// Bağlantıyı kapat
$conn->close();
?>
