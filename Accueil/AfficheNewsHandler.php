<?php
if (isset($_GET['idNews']))
{
    require '../Confirmation/confirmationModel.php';
    $news = afficheNews($_GET['idNews']);

    echo json_encode($news);
}

else
{
    echo 0;
}
