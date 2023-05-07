<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include "conexao.php";

$id = filter_input(INPUT_GET, "id");

$query_select = "SELECT foto FROM products WHERE id=:id LIMIT 1";
$query_select_product = $conn->prepare($query_select);
$query_select_product->bindParam(":id", $id);
$query_select_product->execute();

$response = ["MSG" => "DS"];

if(($query_select_product) and ($query_select_product->rowCount() != 0)){
    $row_product = $query_select_product->fetch(PDO::FETCH_ASSOC);
    extract($row_product);
    unlink("images/".$foto);
}

$query_delete = "DELETE FROM products WHERE id=:id LIMIT 1";
$delete_delete_product = $conn->prepare($query_delete);
$delete_delete_product->bindParam(":id", $id, PDO::PARAM_INT);

if($delete_delete_product->execute()){
    /*$response = [
        "erro" => false,
        "mensagem" => "Produto deletado"
    ];*/
}else{
    /*$response = [
        "erro" => true,
        "mensagem" => "Produto não deletado"
    ];*/
}



echo json_encode($response)

?>