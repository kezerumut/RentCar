<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "rentcar");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "user_id eksik"]);
    exit;
}

$user_id = (int)$data['user_id'];

$sql = "SELECT * FROM rentals WHERE user_id = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$rentals = [];
while ($row = $result->fetch_assoc()) {
    $rentals[] = $row;
}

echo json_encode(["success" => true, "data" => $rentals]);

$stmt->close();
$conn->close();
?>
