<?php
include("db-config.php");

// Takvim oluşturmak istediğiniz doktorun ID'sini belirtin
$doctorId = 1;

// Başlangıç ve bitiş tarihlerini tanımlayın
$startDate = "2025-01-01";
$endDate = "2025-12-31";

// Günlük çalışma saatlerini tanımlayın (örnek: 09:00 - 17:00)
$startTime = "09:00";
$endTime = "17:00";

// Saat aralığı (örneğin, 1 saatlik randevu dilimleri)
$intervalMinutes = 60;

// Tüm günler arasında döngü
$currentDate = $startDate;
while (strtotime($currentDate) <= strtotime($endDate)) {
    $currentTime = $startTime;

    // Günlük saat aralığı arasında döngü
    while (strtotime($currentTime) < strtotime($endTime)) {
        // Veritabanına ekle
        $stmt = $conn->prepare("INSERT INTO doctor_schedule (doctorId, date, time, is_available) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("issi", $doctorId, $currentDate, $currentTime, $isAvailable = 1); // Varsayılan olarak müsait

        if (!$stmt->execute()) {
            echo "Hata: " . $stmt->error . "\n";
        }

        // Zamanı güncelle
        $currentTime = date("H:i:s", strtotime("+$intervalMinutes minutes", strtotime($currentTime)));
    }

    // Tarihi bir gün ileri al
    $currentDate = date("Y-m-d", strtotime("+1 day", strtotime($currentDate)));
}

echo "Takvim başarıyla oluşturuldu!";
?>
