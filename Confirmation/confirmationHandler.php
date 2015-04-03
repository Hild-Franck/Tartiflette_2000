<?php
if(isset($_POST['submit'])){
    require_once 'confirmationModel.php';
    $bdd = connect();
    $email = getEmail($_POST['key'], $bdd);
    if(!$email) {
        $response = array(
            "txt" => "Erreur : clé invalide",
            "error" => true
        );
    }
    else {
        setMember($email, $_POST['pseudo'], $_POST['password'], $bdd);
        removeKey($_POST['key'], $bdd);
        $response = array(
            "txt" => "<p>Inscription terminée !</p><p>Vous pourrez vous connecter à la zone membre quand elle sera finie !</p>",
            "error" => false
        );
    }
}
else
    $response = array(
        "txt" => "Erreur, veuillez recharger la page",
        "error" => true
    );
if(isset($response))
    echo json_encode($response, JSON_PRETTY_PRINT);