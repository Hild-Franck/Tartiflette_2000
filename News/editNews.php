<?
include 'kikou.php';
?>

<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="http://localhost:7777/Tartiflette_2000/style.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost:7777/Tartiflette_2000/Menu/Menu.css" rel="stylesheet" type="text/css" />
    <script src="http://localhost:7777/Tartiflette_2000/ckeditor/ckeditor.js"></script>
</head>

<body>

<header>
    <? include '../Menu/Menu.php'; ?>
</header>

<div id="formulaire" style="text-align: center">
    <form method="post" id="sendNews">
        <input id="idNews" name="idNews" style="display: none" value=<? echo $_GET['idNews']?>>
        <h2>Titre</h2>
        <input type="text" name="titre" placeholder="Titre"
            value=" <?
            require '../Confirmation/confirmationModel.php';
            echo titleNews($_GET['idNews']);
            ?>">
        <br><br>
        <textarea name="editor1" id="editor1" rows="10" cols="20" style="width: 200px">
            <?
            $news = textNews($_GET['idNews']);
            foreach($news as $partieNews => $textNews)
            {
                echo $textNews;
            }
            ?>
        </textarea>
        <script>
            // Replace the <textarea id="editor1"> with a CKEditor
            // instance, using default configuration.
            CKEDITOR.replace( 'editor1',{
                language: 'fr',
                uiColor: '#34A6C9',
            } );
        </script>
        <br>
        <input type="submit" name="submit" id="submit">
    </form>
</div>

</body>

<script>

    document.getElementById("sendNews").onsubmit = function(event)
    {
        event.preventDefault();
        for ( var instance in CKEDITOR.instances )
            CKEDITOR.instances[instance].updateElement();
        SendData(Response);
    }


        function SendData(callback)
        {
            var form = document.forms.namedItem("sendNews");
            var data = new FormData(form);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function ()
            {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
                {
                    callback(xhr.responseText);
                }
            };
            xhr.open("POST", "editNewsHandler.php", true);
            xhr.send(data);
        }


        function Response(gData)
        {
            var response = gData;

            if (response == "noTitle")
            {
                alert("Entrez un titre");
            }

            else  if (response == "noNews")
            {
                alert("Entrez un texte");
            }

            else if (response == 0)
            {
                alert("Probleme de connexion");
            }

            else if (response == 1)
            {
                alert("News Modifiée");
            }

            else if (response == "noID")
            {
                alert("pas id");
            }

            else
            {
                alert("faux");
            }
        }
</script>