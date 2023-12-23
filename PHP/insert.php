<?php 
    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include 'conexao.php';
    
    if(isset($_FILES['foto'])){
        $foto = uniqid(rand()).$_FILES['foto']['name'];
        $foto_temp = $_FILES['foto']['tmp_name'];
        $name = $_POST['name'];
        $descricao = $_POST['descricao'];
        $categorias = $_POST['categorias'];
        $preco = $_POST['preco'];
        $destination_path = getcwd().DIRECTORY_SEPARATOR;
        $target_path = $destination_path . "images". DIRECTORY_SEPARATOR . $foto;
        $users_id = (int)$_POST['users_id'];

        $result = "INSERT INTO products (name, preco, descricao, foto, categorias, users_id) VALUES ('$name', '$preco', '$descricao','$foto', '$categorias', $users_id)";
        $insert_products = $conn->prepare($result);

        $insert_products->execute();

        if($result){
            if(move_uploaded_file($foto_temp, $target_path)){
                $response = [
                    "MSG" => "Funcionou"
                ];
            }
            else{
              $response = [
                    "MSG" => "não funcionou"
                ];
            }
        }
    }else{
        $response = [
            "MSG" => "Insira uma imagem"
        ];
    }

    echo json_encode($response);
    
?>