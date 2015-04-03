<!DOCTYPE html>
<html>
<head lang="en">
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="../style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<header>
<h1>Inscription</h1>
</header>
<form id="inscription">
    <div class="info">Choisissez un pseudonyme et un mot de passe pour vos futures connexions</div>
    <label for="pseudo">Pseudo :</label>
    <input class="input" name="pseudo" id="pseudo" type="text" />
    <label for="password">Mot de passe :</label>
    <input class="input" name="password" id="password" type="password" />
    <input type="hidden" name="key" value="<?php echo $key ?>">
    <input name="submit" type="submit" value="Valider" class="button"/>
</form>
</body>
<script>
    document.getElementById("inscription").onsubmit = function(event){
        event.preventDefault();
        if(document.getElementById("pseudo").value.length <= 25 && document.getElementById("pseudo").value.length >= 3){
            if(document.getElementById("password").value.length <= 15 && document.getElementById("password").value.length >= 5){
                SendData(Response);
            }
            else
                Error("Votre mot de passe doit comprendre entre 5 et 15 charactères !");

        }
        else
            Error("Votre pseudo doit comprendre entre 3 et 25 charactères !");
    };

    /**
     * Envoie les données du formulaire au serveur en AJAX
     * @param callback La fonction de lecture des données après réception et traitement serveur
     */

    function SendData(callback){
        var form = document.forms.namedItem("inscription");
        var data = new FormData(form);
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
                callback(xhr.responseText);
            }
        };

        xhr.open("POST", "confirmationHandler.php", true);
        xhr.send(data);
    }

    /**
     * Réceptionne la réponse serveur et affiche les informations adéquates
     * @param gData Réponse du serveur en JSON
     */

    function Response(gData){
        var response = JSON.parse(gData);
        if(!response.error) {
            fadeOut(document.forms.namedItem("inscription"), function () {
                var div = document.createElement("div");
                div.className = "sucess-inscr";
                div.innerHTML = response.txt;
                appendAfter(document.getElementsByTagName("header")[0], div);
            });
        }
        else{
            Error(response.txt);
        }
    }

    /**
     * Fait disparaître un élément puis l'enlève, en appelant une fonction si spécifiée
     * @param element L'élément à faire disparaître
     * @param [callback] Fonction appelée à la disparition de l'élément
     */

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

    /**
     * Insère un élément après un autre
     * @param el Élément après lequel insérer
     * @param nwEl Élément à insérer
     */

    function appendAfter(el, nwEl){
        el.parentNode.insertBefore(nwEl, el.nextSibling);
    }
</script>
</html>