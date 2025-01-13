<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('db-config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$email || !$password) {
        echo json_encode(['error' => 'E-posta ve şifre gereklidir.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT doctorId, name, email, password FROM doctors WHERE email = ?");
    if (!$stmt) {
        echo json_encode(['error' => 'SQL hatası: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['error' => 'Kullanıcı bulunamadı.']);
        exit;
    }

    $doctor = $result->fetch_assoc();

    // Şifreyi kontrol et
    if ($password === $doctor['password']) {
        echo json_encode([
            "success" => true,
            "doctor" => [
                "doctorId" => $doctor['doctorId'],
                "name" => $doctor['name'],
                "email" => $doctor['email']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Geçersiz şifre."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Geçersiz istek yöntemi.']);
}
?>
