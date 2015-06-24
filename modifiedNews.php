<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
<link href="style.css" rel="stylesheet" type="text/css"/>
<link href="Menu.css" rel="stylesheet" type="text/css"/>

</head>

<body>

<header>
    <? include 'Menu.php'; ?>
</header>

<div class="news" id="news">
    <?
    require 'Confirmation/confirmationModel.php';
    $news = callNews();

    foreach ($news as $numeroNews => $arrayNews)
    {
        ?>
        <span class="news" id="news">
    <?

    foreach ($arrayNews as $contenant => $contenu)
    {

        switch ($contenant)
        {
            case 1:
                ?>
                <table class="news">
                <thead>
                <tr>
                    <th><? echo wordwrap($contenu, 30, "<br>", false) . "<br>"; ?></th>
                </tr>
                </thead>
                <?
                break;

        case 2:
            ?>
            <tbody>
            <tr>
                <td><? echo wordwrap($contenu, 30, "<br>", true) . "<br>"; ?></td>
            </tr>
            <?
            break;

            case 3:
                ?>
                <tr>
                    <td class="date">Publié le <time><? echo $contenu; ?></time></td>
                </tr>
                </tbody>
                </table>
                <input type="submit" class="change" id="supprimer" value="Supprimer" onclick="<? deleteNews($contenu) ?>">
                <br>
                <input type="submit" class="change" id="modifier" value="Modifier" onclick="">
                <?
                break;
        }
    }

    ?>
        </span>
    <?
    }
    ?>

</div>

</body>
</html>