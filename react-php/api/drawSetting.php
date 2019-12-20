<?php

function drawSetting(){
  require 'config.php';
  $json = json_decode(file_get_contents('php://input'), true);

  $query = "SELECT * FROM drawdata_buildoptions";
  $result = $db->query($query);

  $drawSettingData = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $drawSettingData=json_encode($drawSettingData);

  echo '{"drawSettingData":'.$drawSettingData.'}';
}
drawSetting();