<?php 
    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "marketplace";
    $port = "3306";

    $conn = new PDO("mysql:host=$host;dbname=". $dbname, $user, $pass);
?>