<? session_start(); ?>

<nav>
        <ul id="nav">
            <li><a href="http://localhost:7777/Tartiflette_2000/Accueil/Accueil.php">ACCUEIL</a></li>
            <li><a href="#">LE JEUX</a>
                <ul>
                    <li><a href="#">HISTOIRE</a></li>
                    <li><a href="http://localhost:7777/Tartiflette_2000/Personnages/Personnages.php">PERSONNAGES</a></li>
                    <li><a href="#">ARMES</a></li>
                </ul>
            </li>

            <? if (isset($_SESSION['pseudo']))
            {
                ?>
                <li><a href="http://localhost:7777/Tartiflette_2000/game.php">JOUER</a></li>
                <li><a href="#">COMPTE</a>
                    <ul>
                        <?
                        if (isset($_SESSION['pseudo']))
                        {
                            ?>
                            <li><a href="http://localhost:7777/Tartiflette_2000/Mon%20Compte/Mon%20Compte.php">GERER MON
                                    COMPTE</a></li>
                            <li><a href="http://localhost:7777/Tartiflette_2000/Connexion/Logout.php">DECONNEXION</a>
                            </li>
                        <?
                        } else
                        {
                            ?>
                            <li><a href="http://localhost:7777/Tartiflette_2000/inscription.html">INSCRIPTION</a></li>
                            <li><a href="http://localhost:7777/Tartiflette_2000/Connexion/Connexion.php">SE
                                    CONNECTER</a></li>
                        <?
                        }
                        ?>
                    </ul>
                </li>
            <?
            }
            ?>


            <li><a href="#">CONTACT</a></li>

            <?
            // Autorise les modérateurs à accéder à la création et la modification de news
            if($_SESSION['pseudo'] == "jerome" ||
                $_SESSION['pseudo'] == "Knarfux" ||
                $_SESSION['pseudo'] == "AzSiAz" ||
                $_SESSION['pseudo'] == "Swex")
            {
                ?>

            <li><a href="#">NEWS</a>
                <ul>
                    <li><a href="http://localhost:7777/Tartiflette_2000/News/createNews.php">AJOUTER</a></li>
                    <li><a href="http://localhost:7777/Tartiflette_2000/News/modifiedNews.php">MODIFIER SUPPRIMER</a></li>
                </ul>
                <?
            }
            ?>

                <?
                if(!isset($_SESSION['pseudo']))
                {
                    ?>
                    <li><a href="http://localhost:7777/Tartiflette_2000/Inscription/inscription.html">INSCRIPTION</a></li>
                    <?
                }
                ?>

        </ul>
    </nav>
