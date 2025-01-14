<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "wyqk6x041tfxg39e.chr7pe7iynqr.eu-west-1.rds.amazonaws.com";
$username = "l9n1gcqkz3jg4j1i";
$password = "ho5i9oja471s59bs";
$dbname = "ryyk9o8156jg4usp";
// Bağlantıyı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die(json_encode(["error" => "Bağlantı hatası: " . $conn->connect_error]));
}

// SQL sorgusu
$sql = "SELECT doctorId, name, photo, bio FROM doctors"; // Tablonuzun adı 'doctors' ise
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $doctors = [];
    while ($row = $result->fetch_assoc()) {
        // BLOB sütununu base64 olarak kodla
        $row['photo'] = base64_encode($row['photo']); 
        $doctors[] = $row;
    }
    echo json_encode($doctors); // JSON formatında veri döndür
} else {
    echo json_encode([]); // Eğer sonuç yoksa boş bir dizi döndür
}

// Bağlantıyı kapat
$conn->close();
?>
