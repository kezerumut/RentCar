<?php
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
require_once "db.php";

$sql    = "SELECT id, name, price, image, year FROM cars";
$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Sorgu hatası"]);
    exit;}
$cars = [];
while ($row = $result->fetch_assoc()) {
    $row['image'] = "http://localhost/rentcar-api/images/" . $row['image'];
    $cars[] = $row;
}
echo json_encode($cars);
$conn->close();
exit;