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
    <link href="http://localhost:7777/Tartiflette_2000/style.css" rel="stylesheet" type="text/css" />
</head>

<body>

<header>
    <h1 id="tartiflette">Tartiflette 2000</h1>
</header>

<form id="connexion" name="connexion" style="text-align: center">
    <label class="connexion" for="connexion">Connexion</label>
    <input class="input" id="pseudo" name="pseudo" type="text"
        <?
        if(isset($_COOKIE['member']))
        {
            // Affiche le pseudo si il est enregistré dans le cookie
            // Permet d'éviter de retaper son pseudo
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


<a href="http://localhost:7777/Tartiflette_2000/Inscription/inscription.html" id="inscritOrNo">Vous n'êtes pas encore inscrit ?</a>


<script>
    document.getElementById("connexion").onsubmit = function(event)
    {
        event.preventDefault();
        SendData(Response);
    }


    function SendData(callback)
    {
        var form = document.forms.namedItem("connexion");
        var data = new FormData(form);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            {
                callback(xhr.responseText);
            }
        };
        xhr.open("POST", "http://localhost:7777/Tartiflette_2000/Connexion/connexionHandler.php", true);
        xhr.send(data);
    }


    function Response(gData)
    {
        var response = gData;

        // Si les identifiants entrés existent, alors on redirige vers l'Accueil
        if(response == 1)
        {
            //document.getElementsByTagName("body")[0].remove();

            document.location = 'http://localhost:7777/Tartiflette_2000/Accueil/Accueil.php';
        }

        else
        {
            Error("Mauvais Mot de Passe");
        }
    }

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

</script>

</body>
</html>