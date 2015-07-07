<?php
if(isset($_COOKIE['member']))
{
    include 'Connexion.php';
}

else
{
   include 'inscription.html';
}
?>