<?php

if(isset($_POST['submit']))
{

    if (!isset($_COOKIE['member']))
    {
        setcookie("member", $_POST['pseudo']);
    }

    require 'Confirmation/confirmationModel.php';

    echo checkMember(connect(), $_POST['pseudo'], $_POST['password']);
}

else
{
    echo "test2";
}



/*require 'Confirmation/confirmationModel.php';

    echo $_POST['submit'];
    //echo checkMember(connect(), $_POST['pseudo'], $_POST['password']);
*/