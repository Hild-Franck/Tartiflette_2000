<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link href="Menu.css" rel="stylesheet" type="text/css" />
    <script src="ckeditor/ckeditor.js"></script>
</head>

<body>

<header>
    <? include 'Menu.php'; ?>
</header>

<div id="formulaire" style="text-align: center">
    <form method="post" id="sendNews">
        <h2>Titre</h2>
        <input type="text" name="titre" placeholder="Titre">
        <br><br>
        <textarea name="editor1" id="editor1" rows="10" cols="20" style="width: 200px">
            <?
            require 'Confirmation/confirmationModel.php';
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
                uiColor: '#34A6C9'
            } );
        </script>
        <br>
        <input type="submit" name="submit" id="submit">
    </form>
</div>

</body>