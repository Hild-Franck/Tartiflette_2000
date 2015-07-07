<?php
session_start();

function connect(){
    try{
        $dsn = 'mysql:dbname=Tartiflette-2000;host=localhost;port=8889';
        $user = 'root';
        $password = 'root';

        $bdd = new PDO($dsn, $user, $password);
        $bdd->exec("SET CHARACTER SET utf8");
    }
    catch(EXEPTION $e){
        die('ERREUR : ' . $e->getMessage());
    }
    return $bdd;
}

function checkEmail($str, $bdd){
    $req = $bdd->prepare("SELECT randKey, email FROM inscription WHERE randKey = :ckKey LIMIT 0, 1");
    $req->execute(array(
        "ckKey" => $str
    ));
    if(!$req->fetch())
        return false;
    else
        return true;
}

function checkInscr($str, $bdd){
    $req = $bdd->prepare("SELECT mail FROM members WHERE mail = :ckMail LIMIT 0, 1");
    $req->execute(array(
        "ckMail" => $str
    ));
    if(!$req->fetch())
        return false;
    else
        return true;
}

function getEmail($str, $bdd){
    $req = $bdd->prepare("SELECT email FROM inscription WHERE randKey = :ckKey LIMIT 0, 1");
    $req->execute(array(
        "ckKey" => $str
    ));
    $email = $req->fetch();
    return $email['email'];
}

function removeKey($str, $bdd){
    $req = $bdd->prepare("DELETE FROM inscription WHERE randKey = :ckKey");
    $req->execute(array(
        "ckKey" => $str
    ));
}

function setMember($email, $pseudo, $password, $bdd)
{
    $req = $bdd->prepare("INSERT INTO members(mail, pseudo, password)
                                              VALUES(:nwEmail, :nwPseudo, :nwPassword)");
    $req->execute(array(
        "nwEmail" => $email,
        "nwPseudo" => $pseudo,
        "nwPassword" => sha1($password)
    ));
}


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

   if(!empty($member))
    {
        $_SESSION['pseudo'] = $member['pseudo'];
        return 1;
    }

    else
    {
        return 0;
    }
}


function callNews()
{
    $req = connect()->prepare("SELECT *
                                               FROM News");
    $req->execute(array());

    $news = $req->fetchAll(MYSQL_BOTH);
    return $news;
}


function deleteNews($ID_News)
{
    $req = connect()->prepare("DELETE FROM News
                                                 WHERE ID_News = :news");

    $req->execute(array(':news' => $ID_News));
}


function createNews($titre, $news)
{
    $req = connect()->prepare("INSERT INTO News(TitreNews, TextNews)
                                                 VALUES(:titre, :news)");

    $req->execute(array(
        ":titre" => $titre,
        ":news" => $news
    ));
}

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
