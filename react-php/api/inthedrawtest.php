<?php
function inthedraw(){
  require 'config.php';
  $json = json_decode(file_get_contents('php://input'), true);

    $sqlid = "SELECT id FROM drawdata_id";
    $idresult =$db->query($sqlid);

    $array = array();
    while ($row=mysqli_fetch_row($idresult))
    {
        $array[] = $row;
    }
foreach($array as $i => $item) {
$id = $array[$i][0];
  $query = "SELECT * FROM drawdata_id WHERE id = '".$id."'";
  $result = $db->query($query);

  $drawData = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $drawData=json_encode($drawData);

  echo '{"inTheDrawData":'.$drawData.'}';
}
}
inthedraw();
?>