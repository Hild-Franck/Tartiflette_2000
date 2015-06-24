<?php
if(isset($_COOKIE['member']))
{
    header('Location: Connexion.php');
}

else
{
    header('Location: inscription.html');
}
?>