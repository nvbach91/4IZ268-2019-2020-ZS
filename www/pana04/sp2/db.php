<?php
  include "promenne.php";
  $db = new PDO($servername, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
