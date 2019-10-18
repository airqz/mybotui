<?php
require 'vendor/autoload.php';
require 'config.php';

// Create the Transport
$transport = (new Swift_SmtpTransport(_SMTP_HOST_, _SMTP_PORT_))
    ->setUsername(_SMTP_USERNAME_)
    ->setPassword(_SMTP_PASSWORD_)
;

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);

// Create a message
$message = (new Swift_Message('Wonderful Subject'))
    ->setFrom(['john@doe.com' => $_POST['firstname']])
    ->setTo(['receiver@domain.org', 'other@domain.org' => 'A name'])
    ->setBody($_POST['message'], 'text/plain')
    ;

// Send the message
$result = $mailer->send($message);
