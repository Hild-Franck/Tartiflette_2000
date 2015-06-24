<?php
require 'Confirmation/confirmationModel.php';


if (!checkMember(connect(), $_POST['pseudo'], $_POST['password']))
{
    header('Location: Connexion.php?check=false');
}


else
{
    setcookie("member", $_POST['pseudo']);
    header('Location: Accueil.php');
}
?>