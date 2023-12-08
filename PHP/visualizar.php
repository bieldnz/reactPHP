<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once "conexao.php";

$id = filter_input(INPUT_GET, "id");
$query = "SELECT * FROM products WHERE id=:id LIMIT 1";
$query_product = $conn->prepare($query);
$query_product->bindParam(":id", $id, PDO::PARAM_INT);
$query_product->execute();

if($query_product){
    extract($query_product->fetch(PDO::FETCH_ASSOC));
    $response = [
        "name" => $name,
        "preco" => $preco,
        "descricao" => $descricao,
        "foto" => $foto,
        "users_id" => $users_id
    ];
}else{
    $response = ["msg" => "Não funcionou"];
}

echo json_encode($response);
http_response_code(200)

?>