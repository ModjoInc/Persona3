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
           $message3 = "All seems goody";
        }  else  {
           $message3 =  "There is something missing...i guess :)";
        }
    //methode validation
    $errors = 1;
    $errorName="";
    $errorMail="";
    $errorMessage="";
      if ($_POST['nom'] != "") {
      $_POST['nom'] = trim($_POST['nom']);
      if ($_POST['nom'] == "") {
        $errors++;
        $errorsName = 'So...What is your name again?';
      }
      } else {
        $errors++;
      $errorName .= 'There is something wrong with the name...sorry ^^';
      }

    if ($_POST['email'] != "") {
     $email = trim($_POST['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         $errors++;
         $errorMail = "? are you sure this is an email?.";
        }
        } else {
          $errors++;
        $errorMail .= 'Are you sure this is a valid email?';
      }
    if ($_POST['message'] != "") {
       $_POST['message'] = trim($_POST['message']);
    if ($_POST['message'] == "") {
       $errors++;
       $errorMessage = 'Would you please write me a message? I need that ;)';
       }
       } else {
         $errors++;
       $errorMessage .= 'Would you please write me a message? I need that ;)';
     }

    if ($errors = 1 ) {
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
        $message4 = 'Would you Check the form for missing elements?thx!' ;
      }
      if (isset($envoi)) {
        $message2 =  ', thank you! Your message has been sent! <sup>:happyFace</sup>';
      } else {
        $message2 = '<a href="#contact">, waaaaat? the message went all 404 on us <sub>:sadFace:</sub></a> ';
      }
}







 ?>
