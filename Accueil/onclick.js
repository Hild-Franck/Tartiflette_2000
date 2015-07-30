function afficheNews(idNews)
{
        SendData(Response);


    function SendData(callback)
    {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
            {
                callback(xhr.responseText);
            }
        };
        xhr.open("GET", "afficheNewsHandler.php?idNews=" + idNews, true);
        xhr.send(null);
    }


    function Response(gData)
    {
        var response = gData;

        if (!response)
        {
            alert("Erreur");
        }

        else
        {
            var news = JSON.parse(response);
            var contenu = document.getElementById("contenu");
            var newContenu = document.createElement("div");
            newContenu.id = "contenu";

            for (var i=1; i< 4; i++)
            {

                switch (i)
                {
                    case 1:
                        var element = document.createElement("h1");
                        element.id = "titreNews";
                        element.style.textAlign = "center";
                        break;

                    case 2:
                        var element = document.createElement("p");
                        element.id = "textNews";
                        element.style.textAlign = "justify";
                        element.style.padding = "5% 10% 5% 10%";
                        element.style.justifyContent;
                        break;

                    case 3:
                        var element = document.createElement("time");
                        element.id = "dateNews";
                        element.style.textAlign = "right";
                        element.style.paddingRight = "10%";
                        break;
                    }
                element.style.display = "block";
                element.innerHTML = news[0][i];
                newContenu.appendChild(element);
                }

            contenu.parentNode.replaceChild(newContenu, contenu);

            // Replacement en haut de page
            window.scrollTo(0, 0);
        }
        var img = document.getElementById("textNews").getElementsByTagName("img");
        for (var i = 0; i< img.length; i++)
         {
             img[i].style.display = "block";
             img[i].style.width = "70vw";
             img[i].style.height = "auto";
             img[i].style.margin = "auto";
         }
    }

}


