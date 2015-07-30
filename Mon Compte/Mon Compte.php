<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="../style.css" rel="stylesheet" type="text/css"/>
    <link href="../Menu/Menu.css" rel="stylesheet" type="text/css"/>
</head>

<body>

<header>
    <? include '../Menu/Menu.php'; ?>
</header>

<?
    require '../Confirmation/confirmationModel.php';

    // Affiche le pseudo et le mail dans une div
    foreach(afficheInfosCompte() as $mesInfos => $monTableauInfos)
    {
        foreach($monTableauInfos as $contenant => $contenu)
        {
            ?><div id="infos"><?

            switch ($contenant)
            {
                case 0:
                    ?>
                    <p>Votre Pseudo</p>

                    <h2><? echo $contenu ?></h2><br> <?;
                    break;

                case 1:
                    ?>
                    <p>Mail</p>

                    <h2><? echo $contenu ?></h2> <?;
                    break;
            }

            ?></div><?
        }
    }
?>
<script language="JavaScript" type="text/javascript" src="Mon%20Compte.js"></script>

<div class="changePassword">
    <button id="changePassword" onclick="afficheChangePassword()">Changer de Mot de Passe</button>
</div>


</body>
</html>