<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $dni = htmlspecialchars($_POST['dni']);
    $direccion = htmlspecialchars($_POST['direccion']);
    $nivel_educativo = htmlspecialchars($_POST['nivel_educativo']);
    $interes = htmlspecialchars($_POST['interes']);
    
    // Destinatario
    $to = "alumnocejainfo@gmail.com";
    $subject = "Nueva Preinscripción - CEJA Villa Quinteros";
    
    // Construir el mensaje
    $message = "
    NUEVA PREINSCRIPCIÓN RECIBIDA
    
    Nombre: $nombre
    Email: $email
    Teléfono: $telefono
    DNI: $dni
    Dirección: $direccion
    Nivel Educativo: $nivel_educativo
    
    Motivaciones/Intereses:
    $interes
    
    ---
    Enviado desde el sitio web de CEJA Villa Quinteros
    ";
    
    // Headers
    $headers = "From: no-reply@cejavillaquinteros.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Enviar email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo "OK";
    } else {
        http_response_code(500);
        echo "ERROR";
    }
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>