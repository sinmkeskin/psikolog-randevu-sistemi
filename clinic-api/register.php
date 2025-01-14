<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Hata ayıklama için
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('db-config.php');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // JSON girişini al ve çözümlenebilir mi kontrol et
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (!$data) {
            echo json_encode(['error' => 'Geçersiz JSON verisi.']);
            exit;
        }

        // Gerekli alanları al
        $firstName = $data['firstName'] ?? null;
        $lastName = $data['lastName'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Alanları doğrula
        if (!$firstName || !$lastName || !$email || !$password) {
            echo json_encode(['error' => 'Ad, soyad, email ve şifre gereklidir.']);
            exit;
        }

        // Şifreyi hashle
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // SQL sorgusunu hazırla ve çalıştır
        $stmt = $conn->prepare("INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            echo json_encode(['error' => 'SQL Sorgusu Hatası: ' . $conn->error]);
            exit;
        }

        $stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Kayıt başarılı!']);
        } else {
            echo json_encode(['error' => 'Bir hata oluştu: ' . $stmt->error]);
        }

        // Kaynakları serbest bırak
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['error' => 'Geçersiz istek yöntemi. Sadece POST desteklenir.']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Bir istisna oluştu: ' . $e->getMessage()]);
}
