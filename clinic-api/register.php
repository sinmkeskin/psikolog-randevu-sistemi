<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clinic_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası."]));
}

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Kayıt başarılı."]);
} else {
    echo json_encode(["success" => false, "message" => "Kayıt başarısız."]);
}

$stmt->close();
$conn->close();
?>
