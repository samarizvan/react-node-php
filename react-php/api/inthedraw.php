<?php

function inthedraw(){
  require 'config.php';
  $json = json_decode(file_get_contents('php://input'), true);

  $query = "SELECT * FROM drawdata_id ORDER BY id";
  $result = $db->query($query);

  $drawData = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $drawData=json_encode($drawData);

  echo '{"inTheDrawData":'.$drawData.'}';
}
inthedraw();

/*function totalticket(){
  require 'config.php';
  $json = json_decode(file_get_contents('php://input'), true);

  $query = "SELECT COUNT(*) AS total FROM drawdata_id";
  $result = $db->query($query);

  $row = mysqli_fetch_assoc($result);
  $totalTicket = $row['total'];
  $totalTicket=json_encode($totalTicket);

  echo '{"TotalTicket":'.$totalTicket.'}';
}
totalticket();*/

?>