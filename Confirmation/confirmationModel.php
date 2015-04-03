<?php
function connect(){
    try{
        $bdd = new PDO('mysql:host=localhost;dbname=xfpipgfd_tartiflette_2000', 'xfpipgfd_admin', '^35xgn*7opK0');
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

function setMember($email, $pseudo, $password, $bdd){
    $req = $bdd->prepare("INSERT INTO members(mail, pseudo, password) VALUES(:nwEmail, :nwPseudo, :nwPassword)");
    $req->execute(array(
        "nwEmail" => $email,
        "nwPseudo" => $pseudo,
        "nwPassword" => $password
    ));
}