<?php
$servername = "wyqk6x041tfxg39e.chr7pe7iynqr.eu-west-1.rds.amazonaws.com";
$username = "l9n1gcqkz3jg4j1i";
$password = "ho5i9oja471s59bs";
$dbname = "ryyk9o8156jg4usp";

// Veritabanı bağlantısını kur
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}
?>