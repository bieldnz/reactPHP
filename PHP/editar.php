<?php 
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once "conexao.php";

$nome = $_POST["name"];
$descricao = $_POST["descricao"];
$preco = $_POST["preco"];
$fotoUpdate = uniqid(rand()).$_FILES["foto"]["name"];
$foto_temp = $_FILES["foto"]["tmp_name"];
$destination = getcwd().DIRECTORY_SEPARATOR;
$target_path = $destination . "images" . DIRECTORY_SEPARATOR . $fotoUpdate;
$id = filter_input(INPUT_GET, "id");

if(isset($fotoUpdate)){

    if(move_uploaded_file($foto_temp, $target_path)){
        $query_select = "SELECT foto FROM products WHERE id=:id LIMIT 1";
        $query_select_product = $conn->prepare($query_select);
        $query_select_product->bindParam(":id", $id);
        $query_select_product->execute();

        if(($query_select_product) and ($query_select_product->rowCount())){
            $row_product = $query_select_product->fetch(PDO::FETCH_ASSOC);
            extract($row_product);
            unlink("images/".$foto);

            $response2 = [
                "MSG imagem upload" => "Funcionou",
                "Foto antiga" => $foto,
                "Foto nova" => $fotoUpdate
            ];
        }else{
            $response2 = [
                "MSG imagem upload" => "Não funcionou"
            ];
        }
        
    }else{
        $response2 = [
            "MSG imagem upload" => "Não funcionou"
        ];
    }

    $query = "UPDATE products SET name=:name, descricao=:descricao, preco=:preco, foto=:foto WHERE id=:id";
    $query_product = $conn->prepare($query);
    $query_product->bindParam(":id", $id, PDO::PARAM_INT);
    $query_product->bindParam(":name", $nome, PDO::PARAM_STR);
    $query_product->bindParam(":descricao", $descricao, PDO::PARAM_STR);
    $query_product->bindParam(":preco", $preco, PDO::PARAM_STR);
    $query_product->bindParam(":foto", $fotoUpdate);
    $query_product->execute();

    if($query_product){
        $response = [
            "ID" => $id,
            "nome" => $nome,
            "descrição" => $descricao,
            "preco" => $preco,
            "foto" => $fotoUpdate
        ];

    }else{
        $response = [
            "MSG" => "Dados não enviados"
        ];
    }

}else{
    $response = [
        "Mensagem foto" => "Não funcionou"
    ];
}

echo json_encode($response);
echo json_encode($response2)

?>