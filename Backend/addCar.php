<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "rentcar");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Geçersiz veri"]);
    exit;
}

$name = $data['name'];
$price = $data['price'];
$image = $data['image'];
$year = $data['year'];

$sql = "INSERT INTO cars (name, price, image, year) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdsi", $name, $price, $image, $year);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Araç eklendi"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
