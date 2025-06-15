<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Eksik veri."]);
    exit;
}

$username = $data->username;
$password = $data->password;

// Şifreyi HASHLEMEDEN direkt olarak saklıyoruz (güvenli değildir)
$hashedPassword = $password;

$conn = new mysqli("localhost", "root", "", "rentcar");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantısı hatası"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Kayıt başarılı."]);
} else {
    echo json_encode(["success" => false, "message" => "Kayıt başarısız: " . $stmt->error]);
}

$conn->close();
?>
