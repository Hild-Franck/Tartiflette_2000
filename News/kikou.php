<?
session_start();
if($_SESSION['pseudo'] != "jerome" &&
    $_SESSION['pseudo'] != "Knarfux" &&
    $_SESSION['pseudo'] != "AzSiAz" &&
    $_SESSION['pseudo'] != "Swex")
{
    header('Location: ../Accueil/Accueil.php?kikou=true');
}
?>