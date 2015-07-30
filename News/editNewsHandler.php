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

    elseif(empty($_POST['idNews']))
    {
        echo "noID";
    }

    else
    {
        require "../Confirmation/confirmationModel.php";

        if (modifyNews($_POST['idNews'], $_POST['titre'], $_POST['editor1']))
        {
            echo 1;
        }

        else
        {
            echo 0;
        }
    }
}
