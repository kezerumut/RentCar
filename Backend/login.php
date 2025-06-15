<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start(); // Burada başlatıyoruz

// Veritabanı bağlantısı
$conn = new mysqli("localhost", "root", "", "rentcar");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası"]);
    exit;
}

// JSON verisini al ve ayrıştır
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// SQL sorgusu – kullanıcıyı getir
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if ($password === $row['password']) { // NOT: Şifre hash'li değilse doğrudan kontrol
        $_SESSION['user_id'] = $row['id']; // Burada atama yapıyoruz
        
        echo json_encode([
            "success" => true,
            "id" => $row["id"],
            "username" => $row["username"],
            "role" => $row["role"]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Şifre yanlış"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Kullanıcı bulunamadı"]);
}

$stmt->close();
$conn->close();
