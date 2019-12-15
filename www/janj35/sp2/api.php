<?php

if($_GET["action"] == "get"){
  $xml=simplexml_load_file("score.xml");
  $results = array();
  foreach($xml->score as $score){
    $jmeno = (string)$score->jmeno;
    $level = (string)$score->level;
    $cas = (string)$score->cas;
    $result = array(
      "jmeno"=>$jmeno,
      "level"=>$level,
      "cas"=>$cas
    );
    array_push($results,$result);
  }
  die(json_encode($results));
}
if($_GET["action"] == "post"){

  $jmeno = $_POST["jmeno"];
  $level = $_POST["level"];
  $cas = $_POST["cas"];
  if(isset($level) && isset($cas) && isset($jmeno)){
    $xml = "<?xml version='1.0' encoding='UTF-8'?>";
    $xml.= "<scores>";
    $data=simplexml_load_file("score.xml");
    foreach($data->score as $score){
      $j = (string)$score->jmeno;
      $l = (string)$score->level;
      $c = (string)$score->cas;
      $xml.= "<score>";
        $xml.= "<jmeno>{$j}</jmeno>";
        $xml.= "<level>{$l}</level>";
        $xml.= "<cas>{$c}</cas>";
      $xml.= "</score>";
    }




    $xml.= "<score>";
      $xml.= "<jmeno>{$jmeno}</jmeno>";
      $xml.= "<level>{$level}</level>";
      $xml.= "<cas>{$cas}</cas>";
    $xml.= "</score>";
    $xml.= "</scores>";


    file_put_contents("score.xml", $xml);
  }else{
    print_r("chyba");
    die();
  }



}
  ?>
