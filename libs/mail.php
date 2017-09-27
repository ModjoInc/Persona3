<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST["submit"])) {

//   nom
// email
// message
  //methode sanitization
    $options = array(
      'nom' => FILTER_SANITIZE_STRING,
      'email' => FILTER_SANITIZE_EMAIL,
      'message' => FILTER_SANITIZE_STRING);
      $result = filter_input_array(INPUT_POST, $options);
      if ($result != null AND $result!= FALSE){
           $message3 = "Tous les champs ont été nettoyés !";
        }  else  {
           $message3 =  "Un champs est vide ou n'est pas correct!";
        }
    //methode validation
    $errors='';
      if ($_POST['nom'] != "") {
      $_POST['nom'] = trim($_POST['nom']);
      if ($_POST['nom'] == "") {
      $errors .= 'Entrez votre nom.<br/><br/>';
      }
      } else {
      $errors .= 'Le nom est mal écrit.<br/>';
      }

    if ($_POST['email'] != "") {
     $email = trim($_POST['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors .= $email . "n'est  <strong>pas</strong> un format valide.<br/><br/>";
        }
        } else {
        $errors .= 'Veuillez écrire une adresse mail valide<br/>';
      }
    if ($_POST['message'] != "") {
       $_POST['message'] = trim($_POST['message']);
    if ($_POST['message'] == "") {
       $errors .= 'Veuillez écrire un message décrivant votre problème.<br/>';
       }
       } else {
       $errors .= 'Veuillez décrire votre problème.<br/>';
     }
    if (!$errors) {
       $to = 'habibem@gmail.com';
       $subject = 'Internship Webapp: message';
       $headers = 'Mime-Version: 1.0'."\r\n";
       $headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
       $headers .= "\r\n";
       $message  = 'De: ' . $_POST["nom"] . "<br />";
       $message .= 'Email: ' . $_POST["email"] . "<br />";
       $message .= "Message:<br />" . $_POST["message"] . "<br />";
       $envoi = mail($to, $subject, $message, $headers);
        } else {
        echo '<div style="color: red">' . $errors . '<br/></div>';
      }
    if ($envoi) {
        $message2 =  'Your kind message has been sent! :happyFace';
      } else {
        $message2 = 'Waaaaat? no way...it seems the message was not sent :sadFace:';
      }
}







 ?>
