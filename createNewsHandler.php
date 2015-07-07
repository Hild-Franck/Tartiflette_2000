<?php

if(isset($_POST['submit']))
{
    if(empty($_POST['titre']))
    {
        echo "noTitle";
    }

    elseif(empty($_POST['editor1']))
    {
        echo "noNews";
    }

    else
    {
        require "Confirmation/confirmationModel.php";
        createNews($_POST['titre'], $_POST['editor1']);
        echo 1;
    }
}
