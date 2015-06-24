<?
session_start();
?>

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

<form id="connexion" name="connexion" method="post" action="testConnexion.php" style="text-align: center">
    <label class="connexion" for="connexion">Connexion</label>
    <input class="input" id="pseudo" name="pseudo" type="text"
           <?
           if(isset($_COOKIE['member']))
           {
               echo "value=".$_COOKIE['member'];
           }

           else
           {
               ?>
                placeholder="Pseudo"
               <?
           }
               ?>
           />
    <input class="input" id="password" name="password" type="password" placeholder="Mot de Passe"/>
    <input type="submit" id="submit" value="Valider" class="button" name="submit"/>
</form>


<a href="inscription.html" id="inscritOrNo">Vous n'êtes pas encore inscrit ?</a>

<?php
require 'Confirmation/confirmationModel.php';

if($_GET['check'] == 'false')
{
    ?>
        <script>
            function appendAfter(el, nwEl)
            {
                el.parentNode.insertBefore(nwEl, el.nextSibling);
            }

            function fadeOut(element, callback)
            {
                var op = 1;
                var timer = setInterval(function ()
                {
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
        div.style.marginTop = "30px";
        div.className = "error";
        div.innerHTML = str;
        wrapper.appendChild(div);
        var header = document.getElementById("submit");
        appendAfter(header, wrapper);
        setTimeout(function() {fadeOut(wrapper); }, 2000);
        }

            Error("Mot de passe et/ou Pseudo incorrect");
        </script>
        <?
}

?>


</body>
</html>