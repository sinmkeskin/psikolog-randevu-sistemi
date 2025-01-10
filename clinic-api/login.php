<?php
include('db-config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Kullanıcıyı veritabanına ekle
    $sql = "INSERT INTO users (name, e-mail, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Kayıt başarılı!"]);
    } else {
        echo json_encode(["error" => "Kayıt başarısız!", "details" => $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
