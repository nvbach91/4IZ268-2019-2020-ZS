<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title><?php echo htmlspecialchars("Úspěšná registrace"); ?></title>
    <link rel="stylesheet" href="css/signupsuccess.css">
    <link href= 'https://fonts.googleapis.com/css?family=Product+Sans' rel='stylesheet' />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
      <div class="message-container">
        <br>
        <img src="img/vse.png" class="logo" alt="">
        <br>
        <div class="message">
          <?php echo htmlspecialchars("Úspěšně jste se zaregistroval(a)"); ?>
        </div>
        <br>
        <a class="back" href="index.php"><?php echo htmlspecialchars("Zpět na úvodní stránku"); ?></a>
      </div>
  </body>
</html>
