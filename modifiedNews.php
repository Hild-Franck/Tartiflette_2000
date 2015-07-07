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
            case 0:
                ?>
                <div id="idNews<? echo "$contenu" ?>" class="idNews" style="display: none"><? echo "$contenu" ?></div>
                <?
                break;

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