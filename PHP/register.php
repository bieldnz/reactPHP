<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once "conexao.php";

$login = $_POST['login'];
$password = $_POST['password'];

$query = "INSERT INTO users (login, password) VALUES ('$login', '$password')";
$query_result = $conn->prepare($query);
$query_result->execute();

if($query_result){
    $responce = [
        "mensagem" => "Funcionou"
    ];
}else{
    $responce = [
        "mensagem" => "Não funcionou"
    ];
}
echo json_encode($responce);
http_response_code(200)
?>