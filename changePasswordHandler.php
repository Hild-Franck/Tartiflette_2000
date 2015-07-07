<?php
require 'Confirmation/confirmationModel.php';
session_start();

if(checkMember(connect(), $_SESSION['pseudo'], $_POST['ancienPassword']))
{
    if($_POST['nouveauPassword'] == $_POST['nouveauPasswordConfirmation'])
    {
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