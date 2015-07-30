<?php
require '../Confirmation/confirmationModel.php';
session_start();

if(checkMember(connect(), $_SESSION['pseudo'], $_POST['ancienPassword']))
{
    // Vérifie que les 2 mots de passes entrés sont bien identiques
    if($_POST['nouveauPassword'] == $_POST['nouveauPasswordConfirmation'])
    {
        // Change le mot de passe
        newPassword($_POST['nouveauPassword'], $_SESSION['pseudo']);
        echo 1;
    }

    else
    {
        echo 2;
    }
}

else
{
    echo sha1($_POST['ancienPassword']);
}