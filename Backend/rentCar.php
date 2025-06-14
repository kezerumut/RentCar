<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
$conn = new mysqli("localhost", "root", "", "rentcar");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    echo json_encode(["success" => false, "message" => "Geçersiz veri"]);
    exit;
}

foreach ($data as $item) {
    // 🛡️ Güvenlik kontrolü
    $requiredFields = ['id', 'car_name', 'price', 'year', 'image', 'adres', 'tarih', 'saat', 'user_id'];
    foreach ($requiredFields as $field) {
        if (!isset($item[$field])) {
            echo json_encode(["success" => false, "message" => "Eksik alan: $field"]);
            exit;
        }
    }

    $car_id  = $item['id'];
    $name    = $item['car_name'];
    $price   = $item['price'];
    $year    = $item['year'];
    $image   = $item['image'];
    $adres   = $item['adres'];
    $tarih   = $item['tarih'];
    $saat    = $item['saat'];
    $user_id = $item['user_id'];

    $sql = "INSERT INTO rentals (car_id, car_name, price, year, image, adres, tarih, saat, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isdissssi", $car_id, $name, $price, $year, $image, $adres, $tarih, $saat, $user_id);

    if (!$stmt->execute()) {
        echo json_encode(["success" => false, "message" => "Hata: " . $stmt->error]);
        exit;
    }
}

echo json_encode(["success" => true, "message" => "Kiralama başarılı"]);
$conn->close();
