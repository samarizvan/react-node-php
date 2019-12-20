<?php

function drawwinner(){
    require 'config.php';

    $insertsql = "INSERT INTO drawdata_winner (
        location,
        ticketnumber,
        ticketname,
        salesperson )
    SELECT location,
        ticketnumber,
        ticketname,
        salesperson
    FROM drawdata_id
    ORDER BY RAND()
    LIMIT 1";
    $resultinsertw = $db->query($insertsql);

    $deletesql = "Delete From drawdata_id
    Where ticketnumber in (
                SELECT ticketnumber
                FROM  drawdata_winner
                )";
    $resultdeletew = $db->query($deletesql);

    $sqlid = "SELECT id FROM drawdata_winner WHERE 1";
    $idresult = mysqli_query($db,$sqlid);

    $array = array();
    while ($row=mysqli_fetch_row($idresult))
    {
        $array[] = $row;
    }

    foreach($array as $i => $item) {
        $id = $array[$i][0];
        $result = mysqli_query($db,"SELECT * FROM drawdata_winner WHERE id = '".$id."'");
        //$row=mysqli_fetch_row($result);

        $drawWinner = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $drawWinner=json_encode($drawWinner);
    
        echo '{"drawWinnerData":'.$drawWinner.'}';

        mysqli_query($db,"INSERT INTO drawdata_winnerloser (
                                                location,
                                                ticketnumber,
                                                ticketname,
                                                salesperson,
                                                wlstatus)
                                        SELECT location,
                                                ticketnumber,
                                                ticketname,
                                                salesperson,
                                                'W'
                                        FROM drawdata_winner");

        mysqli_query($db,"DELETE FROM drawdata_winner WHERE id ='".$id."'LIMIT 1");
    }
}
drawwinner();
?>