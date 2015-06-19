<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>

<header>
    <h1>Tartiflette 2000</h1>
</header>

<form id="connexion" name="connexion" method="post">
    <label for="connexion">Connexion</label>
    <input class="input" id="pseudo" name="pseudo" type="text" placeholder="Pseudo"/>
    <input class="input" id="password" name="password" type="password" placeholder="Mot de Passe"/>
    <input type="submit" value="Valider" class="button" name="submit"/>
</form>

<?php
require 'Confirmation/confirmationModel.php';

if(isset($_POST['submit']))
{
    if (checkMember(connect(), $_POST['pseudo'], $_POST['password']))
    {
        ?>
        <script type='text/javascript'>document.location.replace('Accueil.php');</script>
    <?
    }

    else
    {
        ?>
        <script>
            function appendAfter(el, nwEl)
            {
                el.parentNode.insertBefore(nwEl, el.nextSibling);
            }

            function fadeOut(element, callback) {
                var op = 1;
                var timer = setInterval(function () {
                    if (op <= 0.01){
                        if(callback)
                            callback();
                        clearInterval(timer);
                        element.remove();
                    }
                    element.style.opacity = op;
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.1;
                }, 25);
            }

        function Error(str){
        var error = document.getElementsByClassName("error-wrapper")[0];
        if(error != undefined)
        error.remove();
        var wrapper = document.createElement("div");
        wrapper.className = "error-wrapper";
        var div = document.createElement("div");
        div.className = "error";
        div.innerHTML = str;
        wrapper.appendChild(div);
        var header = document.getElementsByTagName("header")[0];
        appendAfter(header, wrapper);
        setTimeout(function() {fadeOut(wrapper); }, 2000);
        }

            Error("Mot de passe et/ou Pseudo incorrect");
        </script>
        <?
    }
}

?>


</body>
</html>