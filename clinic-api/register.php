<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include('db-config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Kullanıcıyı ekle
    $sql = "INSERT INTO users (Email, Password) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Kayıt başarılı!";
    } else {
        echo "Hata: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Kayıt Ol</title>
</head>
<body>
    <form action="register.php" method="POST">
        <label for="email">E-posta:</label><br>
        <input type="email" name="email" required><br>
        <label for="password">Şifre:</label><br>
        <input type="password" name="password" required><br><br>
        <button type="submit">Kayıt Ol</button>
    </form>
</body>
</html>
