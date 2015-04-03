<?php
header('Content-Type: text/html; charset=utf-8');
if(isset($_GET['key'])){
    require_once 'confirmationModel.php';
    $bdd = connect();
    if(checkEmail($_GET['key'], $bdd)){
        $key = $_GET['key'];
        require_once 'confirmationVue.php';
    }
    else {
        echo "<html><head><link href='../style.css' rel='stylesheet' type='text/css' /></head>
            <body><div class='error-wrapper'><p class='error'>Clé invalide ou expirée</p></div></body></html>";
    }
}
else
    header('Location: ../');