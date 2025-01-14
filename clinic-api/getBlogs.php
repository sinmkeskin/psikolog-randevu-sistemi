<?php
header("Access-Control-Allow-Origin: https://psikolog-randevu-sistemi.vercel.app");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("db-config.php");

$sql = "SELECT blog.id, blog.content, blog.created_at, doctor.name as doctor_name, doctor.email as doctor_email
        FROM doctor_blog AS blog
        LEFT JOIN doctors AS doctor ON blog.doctorId = doctor.doctorId
        ORDER BY blog.created_at DESC"; // Blogları tarihe göre sıralama
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "SQL sorgusu hazırlanamıyor: " . $conn->error]);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

$blogs = [];
while ($row = $result->fetch_assoc()) {
    $blogs[] = $row;
}

echo json_encode(["blogs" => $blogs]);

$stmt->close();
$conn->close();
?>
