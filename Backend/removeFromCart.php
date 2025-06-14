<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

$conn = new mysqli("localhost", "root", "", "rentcar");
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM cart WHERE id = ?");
    $stmt->bind_param("i", $id);
    $success = $stmt->execute();

    echo json_encode(["success" => $success]);
} else {
    echo json_encode(["success" => false, "message" => "ID bulunamadı"]);
}
?>
