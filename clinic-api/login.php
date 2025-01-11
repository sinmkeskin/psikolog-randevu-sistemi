<?php
header("Access-Control-Allow-Origin: *");
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

    $stmt = $conn->prepare("SELECT FirstName, LastName, Email, Password FROM users WHERE Email = ?");
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

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user['Password'])) {
        echo json_encode(['error' => 'Geçersiz şifre.']);
        exit;
    }

    echo json_encode([
        'message' => 'Giriş başarılı!',
        'name' => $user['FirstName'] . ' ' . $user['LastName'],
        'email' => $user['Email']
    ]);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Geçersiz istek yöntemi.']);
}
