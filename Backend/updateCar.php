<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "rentcar");

$data = json_decode(file_get_contents("php://input"), true);

$id    = $data['id'];
$name  = $data['name'];
$price = $data['price'];
$image = $data['image'];
$year  = $data['year'];

$sql = "UPDATE cars SET name = ?, price = ?, image = ?, year = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdssi", $name, $price, $image, $year, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Araç güncellendi"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
