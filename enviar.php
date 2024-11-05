<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'files/Mailer/src/Exception.php';
    require 'files/Mailer/src/PHPMailer.php';
    require 'files/Mailer/src/SMTP.php';
    
    
    $emailTo = $_POST["correo"];
    $subject = "Libro de reclamaciones";
    $bodyEmail = "Estimado cliente, a continuacion le enviamos los detalles y respaldo de su reclamo.".
    '<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificaciones de libro de reclamaciones</title>
    </head>
    <body>
        <div>
            <h3>DATOS DEL CONSUMIDOR</h3>
            <strong>ID Reclamo: </strong>'.$_POST["token"].'<br>
            <strong>Orden de reclamo: </strong>'.$_POST["orden"].'<br>
            <strong>Razón Social/Nombres: </strong>'.$_POST["rs_nombre"].'<br>
            <strong>Número de documento: </strong>'.$_POST["num_documento"].'<br>
            <strong>Correo electrónico: </strong>'.$_POST["correo"].'<br>
            <strong>Celular: </strong>'.$_POST["celular"].'<br>
            <strong>Departamento: </strong>'.$_POST["departamento"].'<br>
            <strong>Provincia: </strong>'.$_POST["provincia"].'<br>
            <strong>Distrito: </strong>'.$_POST["distrito"].'<br>
            <strong>Dirección: </strong>'.$_POST["direccion"].'<br><br>
            <h3>DETALLE DEL PRODUCTO O SERVICIO</h3>
            <strong>Fecha de Reclamo/Queja: </strong>'.$_POST["fecha_atencion"].'<br>
            <strong>Canal de atención: </strong>'.$_POST["canal_atencion"].'<br>
            <strong>Tipo de bien: </strong>'.$_POST["lbx_tipo_bien"].'<br>
            <strong>Nombre del Producto/Servicio: </strong>'.$_POST["nombre_bien"].'<br>
            <strong>Precio del Producto/Servicio: </strong>'.$_POST["precio"].'<br>
            <strong>Descripción  del Producto/Servicio: </strong>'.$_POST["desc_producto"].'<br><br>
            <h3>DETALLE DE RECLAMACIÓN DEL CONSUMIDOR</h3>
            <strong>Tipo de incidente: </strong>'.$_POST["tipo_incidente"].'<br>
            <strong>Detalle de Reclamo/Queja: </strong>'.$_POST["detalles"].'<br>
            <strong>Pedido del consumidor: </strong>'.$_POST["pedido"].'<br>
        </div>
    </body>
    </html>';

    $fromemail = "area.ti.innova@gmail.com";
    $fromname = "Innova Sistemas Integrales";
    $host = "smtp.gmail.com";
    $port = "587";
    $SMTPAuth = "true";
    $SMTPSecure = "tls";
    $password = "okydimnixawgjgak";

    $mail = new PHPMailer();

    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Host = $host;
    $mail->Port = $port;
    $mail->SMTPAuth = $SMTPAuth;
    $mail->SMTPSecure = $SMTPSecure;
    $mail->Username = $fromemail;
    $mail->Password = $password;

    //el correo desde donde sale y el nombre del correo
    $mail->setFrom($fromemail, $fromname);
    $mail->addAddress($emailTo);

    //Asunto
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $bodyEmail;

    if (!$mail->send()) {
        error_log("MAILER: Nose pudo enviar el correo!!!");
    }else{
        echo "Correo enviado con éxito...";
    }
?>