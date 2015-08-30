<?php
/**
 * Fichier qui accueille le jeu
 * Created by PhpStorm.
 * User: Hild Franck le Génie
 * Date: 6/6/2015
 * Time: 5:48 PM
 */
?>
<html>
<head>
    <meta charset="utf-8" />
    <title>Tarti-game</title>
    <link rel="stylesheet" href="style.css">
    <link href="Menu/Menu.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="./debug/debug.css">
</head>

<body>

<header>
    <? include 'Menu/Menu.php'; ?>
</header>

    <canvas id="canvas" width="320" height="320">
    </canvas>

<script src="./socket.io/node_modules/socket.io-client/socket.io.js"></script>
    <script>
        var socket = io.connect('http://localhost:8081');
    </script>
<script src="./debug/debug.v0.2.0.js" charset="utf-8"></script>
<script src="Tarti-game.v0.2.0.js" charset="utf-8"></script>
</body>
</html>