<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// Output buffering temizle
if (ob_get_length()) ob_clean();

// Kullanıcı silme, user_id GET veya POST ile alınabilir.
// DELETE metoduyla gelen query param: ?user_id=...
$user_id = 0;
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // parse_str ile PHP $_GET zaten query param olarak alır
    $user_id = intval($_GET['user_id'] ?? 0);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $user_id = intval($input['user_id'] ?? 0);
} else {
    // GET ile de destekleyebilirsin
    $user_id = intval($_GET['user_id'] ?? 0);
}

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Geçersiz user_id"]);
    exit;
}

// Veritabanı bağlantısı
$conn = new mysqli("localhost", "root", "", "rentcar");
if ($conn->connect_error) {
    error_log("DB bağlantı hatası delete_user: " . $conn->connect_error);
    echo json_encode(["success" => false, "message" => "DB bağlantı hatası"]);
    exit;
}

// İlişkili kayıtları silme gereksinimine göre:
//// Örneğin önce cart tablosundaki kayıtları sil
$stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();

// Belki rentals tablosu varsa:
$stmt = $conn->prepare("DELETE FROM rentals WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();

// Son olarak kullanıcı tablosu
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
if (!$stmt->execute()) {
    error_log("Kullanıcı silme hatası: " . $stmt->error);
    echo json_encode(["success" => false, "message" => "Kullanıcı silinemedi"]);
} else {
    echo json_encode(["success" => true, "message" => "Kullanıcı silindi"]);
}
$stmt->close();
$conn->close();
exit;
