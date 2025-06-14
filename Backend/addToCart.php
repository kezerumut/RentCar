<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
$conn = new mysqli("localhost", "root", "", "rentcar");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$required = ['id', 'name', 'price', 'year', 'image', 'user_id'];
foreach ($required as $field) {
    if (!isset($data[$field])) {
        echo json_encode(["success" => false, "message" => "Eksik alan: $field"]);
        exit;
    }
}

// 💡 Tip dönüşümü
$car_id = (int)$data['id'];
$name = $data['name'];
$price = (float)$data['price'];
$year = $data['year'];
$image = $data['image'];
$user_id = (int)$data['user_id'];

$sql = "INSERT INTO cart (car_id, car_name, price, year, image, user_id)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isdssi", $car_id, $name, $price, $year, $image, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Sepete eklendi"]);
} else {
    echo json_encode(["success" => false, "message" => "Hata: " . $stmt->error]);
}

$stmt->close();
$conn->close();
