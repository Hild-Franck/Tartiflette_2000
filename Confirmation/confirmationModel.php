<?php
session_start();

// Retourne la BDD
function connect()
{
    try
    {
        $dsn = 'mysql:dbname=Tartiflette-2000;host=localhost;port=8889';
        $user = 'root';
        $password = 'root';

        $bdd = new PDO($dsn, $user, $password);
        $bdd->exec("SET CHARACTER SET utf8");
    } catch (EXEPTION $e)
    {
        die('ERREUR : ' . $e->getMessage());
    }
    return $bdd;
}


// Compare les clés aléatoires correspondent à celle en BDD
function checkEmail($str, $bdd)
{
    $req = $bdd->prepare("SELECT randKey, email FROM inscription WHERE randKey = :ckKey LIMIT 0, 1");
    $req->execute(array(
        "ckKey" => $str
    ));
    if (!$req->fetch())
        return false;
    else
        return true;
}


// Vérifie que l'email entré existe en BDD
function checkInscr($str, $bdd)
{
    $req = $bdd->prepare("SELECT mail FROM members WHERE mail = :ckMail LIMIT 0, 1");
    $req->execute(array(
        "ckMail" => $str
    ));
    if (!$req->fetch())
        return false;
    else
        return true;
}


// Retourne l'email correspondant à la clé aléatoire
function getEmail($str, $bdd)
{
    $req = $bdd->prepare("SELECT email FROM inscription WHERE randKey = :ckKey LIMIT 0, 1");
    $req->execute(array(
        "ckKey" => $str
    ));
    $email = $req->fetch();
    return $email['email'];
}


// Supprime la clé en BDD
function removeKey($str, $bdd)
{
    $req = $bdd->prepare("DELETE FROM inscription WHERE randKey = :ckKey");
    $req->execute(array(
        "ckKey" => $str
    ));
}


// Crée un membre en BDD
function setMember($email, $pseudo, $password, $bdd)
{
    $req = $bdd->prepare("INSERT INTO members(mail, pseudo, password)
                                              VALUES(:nwEmail, :nwPseudo, :nwPassword)");
    $req->execute(array(
        "nwEmail" => $email,
        "nwPseudo" => $pseudo,
        "nwPassword" => sha1($password) // Cryptage du mot de passe
    ));
}


// Changement de mot de passe
function newPassword($password, $pseudo)
{
    $req = connect()->prepare("UPDATE members
                                                      SET password = :password
                                                      WHERE pseudo = :pseudo");

    $req->execute(array(
        ':pseudo' => $pseudo,
        ':password' => sha1($password)
    ));
}


// Test si le pseudo et le password entrés existent
function checkMember($bdd, $pseudo, $password)
{
    $req = $bdd->prepare("SELECT pseudo
                                                FROM members
                                                WHERE pseudo = :pseudo
                                                AND password = :password");
    $req->execute(array(
        ':pseudo' => $pseudo,
        ':password' => sha1($password)
    ));
    $member = $req->fetch();

    if (!empty($member))
    {
        $_SESSION['pseudo'] = $member['pseudo'];
        return 1;
    }

    else
    {
        return 0;
    }
}


// Appelle de toutes les news en BDD
function callNews()
{
    $req = connect()->prepare("SELECT *
                                               FROM News");
    $req->execute(array());

    $news = $req->fetchAll(MYSQL_BOTH);
    return $news;
}


// Supprime la news sélectionnée
function deleteNews($ID_News)
{
    $req = connect()->prepare("DELETE FROM News
                                                 WHERE ID_News = :news");

    $req->execute(array(':news' => $ID_News));
}


// Crée une news
function createNews($titre, $news)
{
    $req = connect()->prepare("INSERT INTO News(TitreNews, TextNews)
                                                 VALUES(:titre, :news)");

    $req->execute(array(
        ":titre" => $titre,
        ":news" => $news
    ));
}


//  Affiche pseudo et mail de la personne connectée
function afficheInfosCompte()
{
    session_start();

    $req = connect()->prepare("SELECT pseudo, mail
                                                 FROM members
                                                 WHERE pseudo = :pseudo");

    $req->execute(array(
        ":pseudo" => $_SESSION['pseudo']
    ));

    $infos = $req->fetchAll(MYSQL_BOTH);
    return $infos;
}


// Selectionne l'annonce (texte uniquement) entrée
function textNews($idNews)
{
    $req = connect()->prepare("SELECT TextNews
                                                      FROM News
                                                      WHERE ID_News = :idNews");

    $req->execute(array(
        ":idNews" => $idNews
    ));

    $textNews = $req->fetch(MYSQL_BOTH);
    return $textNews;
}


// Modifie le texte d'une news
function modifyNews($idNews, $TitleNews, $TextNews)
{
    $req = connect()->prepare("UPDATE News
                                                      SET TitreNews = :TitleNews,
                                                      TextNews = :TextNews
                                                      WHERE ID_News = :idNews");
    $req->execute(array(
        ':TitleNews' => $TitleNews,
        ':TextNews' => $TextNews,
        ':idNews' => $idNews
    ));

    return 1;
}


// Renvoie le titre de la news selon l'ID
function titleNews($idNews)
{
    $req = connect()->prepare("SELECT TitreNews
                                                      FROM News
                                                      WHERE ID_News = :idNews");

    $req->execute(array(
        ":idNews" => $idNews
    ));

    $titleNews = $req->fetch();
    return $titleNews['TitreNews'];
}


function afficheNews($idNews)
{
    $req = connect()->prepare("SELECT *
                                                      FROM News
                                                      WHERE ID_News = :idNews");

    $req->execute(array(
        ":idNews" => $idNews
    ));

    $news = $req->fetchAll(MYSQL_BOTH);

    return $news;
}