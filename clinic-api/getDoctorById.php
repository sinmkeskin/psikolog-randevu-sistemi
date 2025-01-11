<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Veritabanı bilgileri
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clinic";

// Veritabanına bağlan
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı hatasını kontrol et
if ($conn->connect_error) {
    echo json_encode(["error" => "Bağlantı hatası: " . $conn->connect_error]);
    exit();
}

// Karakter setini ayarla
$conn->set_charset("utf8mb4");

// GET parametresinden doctor_id alın
$doctor_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Eğer id eksik veya geçersizse hata mesajı gönder
if ($doctor_id === 0) {
    echo json_encode(["error" => "Geçersiz doktor ID"]);
    exit();
}

// SQL sorgusunu hazırla
$sql = "SELECT doctor_id, name, speciality, experience, bio, photo FROM doctors WHERE doctor_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(["error" => "SQL Sorgusu Hazırlanamadı: " . $conn->error]));
}


// Eğer sorgu hazırlanamazsa hatayı döndür
if (!$stmt) {
    echo json_encode(["error" => "SQL Sorgusu Hazırlanamadı: " . $conn->error]);
    exit();
}

// Parametreyi bağla ve sorguyu çalıştır
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

// Sonuçları kontrol et ve döndür
if ($result->num_rows > 0) {
    $doctor = $result->fetch_assoc();
    echo json_encode($doctor, JSON_PRETTY_PRINT);
} else {
    echo json_encode(["error" => "Doktor bulunamadı"]);
}

// Kaynakları serbest bırak ve bağlantıyı kapat
$stmt->close();
$conn->close();
?>
