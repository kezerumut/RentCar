<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "rentcar");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Bağlantı hatası"]);
    exit;
}

// Sepet tablosunu temizle
$sql = "DELETE FROM cart";
if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Silme hatası: " . $conn->error]);
}

$conn->close();
?>
