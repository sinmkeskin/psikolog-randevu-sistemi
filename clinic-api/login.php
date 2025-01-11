<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Hata ayıklama için
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('db-config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON girişini al
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(['error' => 'Geçersiz JSON verisi.']);
        exit;
    }

    // Gerekli alanları al
    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    // Alanları doğrula
    if (!$name || !$email || !$password) {
        echo json_encode(['error' => 'Ad, e-posta ve şifre gereklidir.']);
        exit;
    }

    // Şifreyi hashle
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // SQL sorgusunu hazırla
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(['error' => 'SQL sorgusu hazırlama hatası: ' . $conn->error]);
        exit;
    }

    // Parametreleri bağla ve sorguyu çalıştır
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Kayıt başarılı!']);
    } else {
        echo json_encode(['error' => 'Kayıt başarısız!', 'details' => $stmt->error]);
    }

    // Kaynakları serbest bırak
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Geçersiz istek yöntemi. Sadece POST desteklenir.']);
}
