function afficheChangePassword()
{
    if (document.getElementById('formChangePassword') == null)
    {
        var f = document.createElement("form");
        f.setAttribute('method', "post");
        f.setAttribute('id', "formChangePassword");
        f.style.marginTop = "30px";

        var i1 = document.createElement("input");
        i1.setAttribute('type', "password");
        i1.setAttribute('name', "ancienPassword");
        i1.setAttribute('placeholder', "Ancien Mot de Passe");
        i1.style.width = "15%";

        var i2 = document.createElement("input");
        i2.setAttribute('type', "password");
        i2.setAttribute('name', "nouveauPassword");
        i2.setAttribute('placeholder', "Nouveau Mot de Passe");
        i2.style.width = "15%";

        var i3 = document.createElement("input");
        i3.setAttribute('type', "password");
        i3.setAttribute('name', "nouveauPasswordConfirmation");
        i3.setAttribute('placeholder', "Confirmer Nouveau Mot de Passe");
        i3.style.width = "15%";

        var s = document.createElement("input");
        s.setAttribute('type', "submit");
        s.setAttribute('name', "submit");
        s.setAttribute('id', "submitChangePassword");


        f.appendChild(i1);
        f.appendChild(document.createElement("br"));
        f.appendChild(i2);
        f.appendChild(document.createElement("br"));
        f.appendChild(i3);
        f.appendChild(document.createElement("br"));
        f.appendChild(s);

        // Ajoute la balise form et ses inputs pour changer le mot de passe
        document.getElementById('changePassword').parentElement.appendChild(f);

        document.getElementById("formChangePassword").onsubmit = function (event)
        {
            event.preventDefault();
            SendData(Response);
        }


        function SendData(callback)
        {
            var form = document.forms.namedItem("formChangePassword");
            var data = new FormData(form);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function ()
            {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
                {
                    callback(xhr.responseText);
                }
            };
            xhr.open("POST", "changePasswordHandler.php", true);
            xhr.send(data);
        }


        function Response(gData)
        {
            var response = gData;
            if (response == 1)
            {
                alert("OK");
            }
            else if (response == 2)
            {
                Error("mots de passe inegaux");
            }

            else
            {
                Error("Mauvais mot de passe");
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
                if (op <= 0.01)
                {
                    if (callback)
                        callback();
                    clearInterval(timer);
                    element.remove();
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, 25);
        }


        function Error(str)
        {
            var error = document.getElementsByClassName("error-wrapper")[0];
            if (error != undefined)
                error.remove();
            var wrapper = document.createElement("div");
            wrapper.className = "error-wrapper";
            var div = document.createElement("div");
            div.style.marginTop = "30px";
            div.className = "error";
            div.innerHTML = str;
            wrapper.appendChild(div);
            var header = document.getElementById("submit");
            appendAfter(document.getElementById('formChangePassword'), wrapper);
            setTimeout(function ()
            {
                fadeOut(wrapper);
            }, 2000);
        }
    }
}
