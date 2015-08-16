Projet Tartiflette 2000
===================


Projet extra-scolaire d'un jeu massivement multijoueur en JavaScript

----------


Moteur
---------
Le moteur graphique du jeu utilise le canvas d'HTML 5 et les méthodes JS qui y sont consacrées. Il est prévu de basculer dans le webGL plus tard afin de profiter de tout ses avantages

#### Tester
Il est possible de tester le moteur en demarrant un logiciel de server local puis en se rendant sur **http://localhost/Tartiflette_2000/game.php**
>**Note:**
>Le jeu a été tester sur les version 44.x de Chrome et 40.x de Firefox

#### Documentation
Une documentation est disponible dans le dossier Doc HTML au sujet de la version 0.2.0 du moteur. Elle est mise à jour régulièrement ou peut être générer en exécutant **genDoc.bat**

#### Debug
Des informations de debug sont disponibles à coté du canvas. Elles sont générées par les méthodes du fichier de **debug.js**

> **Note:**
> Il possible de rajouter des fonctions de debug en les insérant dans
> ```
> setInterval(function(){
> ...
> }
> ```  
> à la fin du moteur, entre ```game.update();``` et ```debug.show();```

Serveur
---------

Le serveur contient la liste des ennemis, des joueurs et des objets sur la carte. Il calcule les collisions, l'IA des ennemis, les dégâts, etc.

#### Technologies

Le serveur est codé en node.JS et il utilise les modules suivant :

- **lokijs:** Base de donnée noSQL écrite en JS
	- <span class="octicon octicon-mark-github"></span>**https://github.com/techfort/LokiJS**
- **pm2:** Gestionnaire de processus pour Node.JS
	- <span class="octicon octicon-mark-github"></span>**https://github.com/Unitech/pm2**
- **socket.io** Communication temps réelle et bidirectionnelle client/serveur
	- <span class="octicon octicon-mark-github"></span>**https://github.com/socketio/socket.io**

####Démarrer un serveur

Node.JS doit être installer sur la machine qui lance le serveur. Dans le dossier **server**, il suffit ensuite de lancer **startServ.bat**.
