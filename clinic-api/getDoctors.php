<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Veritabanı bağlantısı
$servername = "localhost";
$username = "root"; // Varsayılan kullanıcı adı
$password = ""; // Varsayılan şifre
$dbname = "clinic"; // Veritabanı adı

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
