<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "rentcar");

$data = json_decode(file_get_contents("php://input"), true);
$carId = $data['id'] ?? null;

if (!$carId) {
    echo json_encode(["success" => false, "message" => "ID gönderilmedi"]);
    exit;
}

$sql = "DELETE FROM cars WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $carId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Araç silindi"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
