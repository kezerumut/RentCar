<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "rentcar";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    exit(json_encode(["error" => "DB bağlantı hatası: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");
