<?php

// Si le cookie existe, on charge la page Connexion
if(isset($_COOKIE['member']))
{
    include 'Connexion/Connexion.php';
}

// Sinon, on charge la page Inscription
else
{
   include 'Inscription/inscription.html';
}
