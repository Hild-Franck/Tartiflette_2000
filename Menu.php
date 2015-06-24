<? session_start(); ?>

<nav>
        <ul id="nav">
            <li><a href="Accueil.php">ACCUEIL</a></li>
            <li><a href="">LE JEUX</a>
                <ul>
                    <li><a href="#">HISTOIRE</a></li>
                    <li><a href="#">PERSONNAGES</a></li>
                    <li><a href="#">ARMES</a></li>
                </ul>
            </li>
            <li><a href="game.php">JOUER</a></li>
            <li><a href="">COMPTE</a>
                <ul>
                    <?
                    if(isset($_SESSION['member']))
                    {
                        ?>
                            <li><a href="Mon Compte.php">GERER MON COMPTE</a></li>
                            <li><a href="Logout.php">DECONNEXION</a></li>
                        <?
                    }

                    else
                    {
                        ?>
                            <li><a href="inscription.html">INSCRIPTION</a></li>
                            <li><a href="Connexion.php">SE CONNECTER</a></li>
                        <?
                    }
                    ?>
                </ul>
            </li>
            <li><a href="">CONTACT</a></li>

            <?
            if($_SESSION['member'] == "jerome" ||
                $_SESSION['member'] == "Knarfux" ||
                $_SESSION['member'] == "AzSiAz" ||
                $_SESSION['member'] == "Swex")
            {
                ?>

            <li><a href="">NEWS</a>
                <ul>
                    <li><a href="createNews.php">AJOUTER NEWS</a></li>
                    <li><a href="modifiedNews.php">MODIFIER NEWS</a></li>
                </ul>
                <?
            }
            ?>
        </ul>
    </nav>
