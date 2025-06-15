<?php
// Hata ekranı kapalı, log açık
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// JSON header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Gereksiz olası çıktı varsa temizle
if (ob_get_length()) {
    ob_clean();
}

$user_id = intval($_GET['user_id'] ?? 0);
if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Geçersiz user_id"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "rentcar");
if ($conn->connect_error) {
    error_log("DB bağlantı hatası: " . $conn->connect_error);
    echo json_encode(["success" => false, "message" => "DB bağlantı hatası"]);
    exit;
}

// Sorgu: doğru tablo ve sütunları kullandığından emin ol
$sql = "SELECT car_name, tarih, saat, created_at FROM rentals WHERE user_id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    error_log("Prepare hatası: " . $conn->error);
    echo json_encode(["success" => false, "message" => "Sorgu hazırlama hatası"]);
    exit;
}
$stmt->bind_param("i", $user_id);
if (!$stmt->execute()) {
    error_log("Execute hatası: " . $stmt->error);
    echo json_encode(["success" => false, "message" => "Sorgu yürütme hatası"]);
    exit;
}
$result = $stmt->get_result();
$history = [];
while ($row = $result->fetch_assoc()) {
    // Gerekirse tarih/saat formatını ayarla
    $history[] = $row;
}
echo json_encode(["success" => true, "data" => $history]);
exit;
