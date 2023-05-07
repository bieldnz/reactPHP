<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once "conexao.php";

$query_products = "SELECT * FROM products ORDER BY id DESC";
$result_products = $conn->prepare($query_products);
$result_products->execute();

if (($result_products) and ($result_products->rowCount() != 0)) {
    while ($row_product = $result_products->fetch(PDO::FETCH_ASSOC)) {
        extract($row_product);
        $products_list["products"][$id] = [
            'id' => $id,
            'name' => $name,
            'descricao' => $descricao,
            'preco' => $preco,
            'foto' => $foto
        ];
    }
    
}else{
    $products_list = ["MSG" => "Não há itens"];
}
echo json_encode($products_list);
http_response_code(200);
