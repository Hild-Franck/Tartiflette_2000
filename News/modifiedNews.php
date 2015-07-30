<?
include 'kikou.php';
?>

<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href="http://localhost:7777/Tartiflette_2000/style.css" rel="stylesheet" type="text/css"/>
    <link href="modifiedNews.css" rel="stylesheet" type="text/css"/>
    <link href="http://localhost:7777/Tartiflette_2000/Menu/Menu.css" rel="stylesheet" type="text/css"/>

</head>

<body>

<header>
    <? include '../Menu/Menu.php'; ?>
</header>

<div class="news">
    <?
    require '../Confirmation/confirmationModel.php';
    ?><script language="JavaScript" type="text/javascript" src="../Accueil/onclick.js"></script><?
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
            // idNews non apparent
        case 0:
            ?>
            <div class="idNews" style="display: none"><? echo $contenu ?></div>
                    <?
        break;


        // Ligne 1: TitreNews
        case 1:
        ?>
                            <h2 class="titre"><? echo $contenu ?></h2>
                     <?
        break;

        // Ligne 2: TextNews
        case 2:
        ?>
                     <script>
            var img = document.getElementsByTagName("img")[0];
            document.getElementsByClassName("news")[0].style.backgroundImage = img;
        </script>
                     <?
        /* $contenu = (strlen($contenu) > 25 ) ? substr($contenu, 0, 25) . '...' : ($contenu);
         ?>
                 <p class="texte"><? echo $contenu ?></p>
         <?*/
        break;

        // Ligne 3:  DateNews
        case 3:
        ?>
                <p class="date">Publié le <time><? echo $contenu; ?></time></p>

                <button name="supprimer" class="supprimer"  value="Supprimer" onclick="deleteNews(this.parentNode.childNodes[1].textContent)">Supprimer</button>
                <br>
                <button name="modifier" class="modifier" value="Modifier" onclick="modifiedNews(this.parentNode.childNodes[1].textContent)">Modifier</button>
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

<script>
    function deleteNews(idNews)
    {
        SendData(idNews, Response);
    }

    function SendData(idNews, callback)
    {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            {
                callback(xhr.responseText);
            }
        };
        xhr.open("GET", "deleteNews.php?id="+idNews, true);
        xhr.send(null);
    }


    function Response(gData)
    {
        var response = gData;

        if(response != 0)
        {
            var test2 = document.getElementById('idNews'+gData);
            test2.parentNode.remove();
        }

        else
        {
           alert("faux");
        }
    }
</script>




<script>
    function modifiedNews(idNews)
    {
        window.location = "editNews.php?idNews="+idNews;
    }

</script>

</body>
</html>