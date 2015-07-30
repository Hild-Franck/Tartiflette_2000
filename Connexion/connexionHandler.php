<?php

if(isset($_POST['submit']))
{
    require '../Confirmation/confirmationModel.php';

    // Renvoi 0 ou 1
    if(checkMember(connect(), $_POST['pseudo'], $_POST['password']))
    {
        // Création du cookie 'member' si il n'existe pas
        // Le cookie stockera le pseudo
        if (!isset($_COOKIE['member']))
        {
            setcookie("member", $_POST['pseudo']);
        }

        echo 1;
    }

    else
    {
        echo 0;
    }
}