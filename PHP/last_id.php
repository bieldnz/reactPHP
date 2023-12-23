<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once("conexao.php");

$users_id = filter_input(INPUT_GET, "users_id");

$query_products = "SELECT id FROM products WHERE users_id=$users_id ORDER BY id DESC LIMIT 1";
$result_products = $conn->prepare($query_products);
$result_products->execute();

if($result_products){
    if (($result_products->rowCount() != 0)) {
        $products_list = $result_products->fetchColumn(0);
    } else {
        $products_list = [];
    }
} else {
    $products_list = [];
}

echo json_encode($products_list);
http_response_code(200);

?>