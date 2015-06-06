<?php
header('Content-Type: text/html; charset=utf-8');

$response = "";

/**
 * Génère une clé aléatoire
 * @return string: Valeur de la clé
 */
function randomString()
{
    $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ^*!%?/";
    $randstring = "";
    for ($i = 0; $i < 10; $i++) {
        $randstring .= $characters[rand(0, strlen($characters) -1)];
    }
    return $randstring;
}

/**
 * Re-vérifie que l'email est dans un format correct
 * @param string $str L'email à vérifier
 * @return int Retourne 1 si l'email est correct, 0 sinon
 **/


function checkEmail($str){
    return preg_match("#^.+\..+@y-nov\.com$#", $str);
}

/**
 * Recherche un email dans la base de donnée
 * @param  string $str L'email à chercher
 * @param object $bdd La base de donnée à utiliser
 * @return bool Retourne vrai si l'email existe, faux sinon
 */

function getEmail($str, $bdd){
    $req = $bdd->prepare("SELECT email FROM inscription WHERE email = :ckEmail LIMIT 0, 1");
    $req->execute(array(
        "ckEmail" => $str
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

if(isset($_POST['email'])){
    try{
        $bdd = new PDO('mysql:host=localhost;dbname=xfpipgfd_tartiflette_2000', 'xfpipgfd_admin', '^35xgn*7opK0');
        $bdd->exec("SET CHARACTER SET utf8");
    }
    catch(EXEPTION $e){
        die('ERREUR : ' . $e->getMessage());
    }
    if(checkEmail($_POST['email'])){
        if(!getEmail($_POST['email'], $bdd)){
            if (!checkInscr($_POST['email'], $bdd)) {
                $key = randomString();
                $req = $bdd->prepare("INSERT INTO inscription(email, randKey) VALUES(:nwEmail, :nwKey) ");
                $req->execute(array(
                    "nwEmail" => $_POST['email'],
                    "nwKey" => $key
                ));
                $message = "http://hildfranck.fr/Tartiflette_2000/Confirmation/confirmationController.php?key=" . $key;
                mail($_POST['email'], 'Inscription - Tartiflette 2000', $message);
                $response = array(
                    "txt" => "<p>Votre email a été enregistré !</p><p>Attendez le mail de confirmation =)</p>",
                    "error" => false
                );
            }
            else
                $response = array(
                    "txt" => "Cet email correspond à un membre déjà inscrit !",
                    "error" => true
                );
        }
        else{
            $response = array(
                "txt" => "Cet email est déjà enregistré !",
                "error" => true
            );
        }
    }
    else{
        $response = array(
            "txt" => "L'email " . $_POST['email'] . " n",
            "error" => true
        );
    }
}

echo json_encode($response, JSON_PRETTY_PRINT);
