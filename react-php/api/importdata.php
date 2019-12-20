<?php

function importdata(){
  require 'config.php';

  if (isset($_POST["import"])) {
  $deleteidrecords = "TRUNCATE TABLE drawdata_id";
  mysqli_query($conn, $deleteidrecords);

  $deleteWrecords = "TRUNCATE TABLE drawdata_winner";
  mysqli_query($conn, $deleteWrecords);

  $deleteWFinalrecords = "TRUNCATE TABLE drawdata_winnerfinal";
  mysqli_query($conn, $deleteWFinalrecords);

  $deleteLrecords = "TRUNCATE TABLE drawdata_loser";
  mysqli_query($conn, $deleteLrecords);

  $deleteLFinalrecords = "TRUNCATE TABLE drawdata_loserfinal";
  mysqli_query($conn, $deleteLFinalrecords);

  $deleteWLrecords = "TRUNCATE TABLE drawdata_winnerloser";
  mysqli_query($conn, $deleteWLrecords);

  $fileName = $_FILES["file"]["tmp_name"];

  if ($_FILES["file"]["size"] > 0) {

      $file = fopen($fileName, "r");

      while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
          $sqlInsert = "INSERT into drawdata_id (location,ticketnumber,ticketname,salesperson)
                 values ('" . $column[0] . "','" . $column[1] . "','" . $column[2] . "','" . $column[3] . "')";
          $result = mysqli_query($conn, $sqlInsert);

          if (! empty($result)) {

              $type = "success";
              $message = "CSV Data Imported into the Database Successfully!!!";
          } else {
              $type = "error";
              $message = "Problem in Importing CSV Data";
          }
      }
  }
}
}
importdata();