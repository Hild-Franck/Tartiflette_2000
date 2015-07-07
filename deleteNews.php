<?php
if(isset($_GET['id']))
{
    require('Confirmation/confirmationModel.php');

    deleteNews($_GET['id']);
    echo $_GET['id'];
}

else
{
    echo 0;
}

