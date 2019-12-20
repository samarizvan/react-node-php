<?php

function outofdraw(){
    require 'config.php';
    $loserinsertsql = "INSERT INTO drawdata_loser (
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

    $result = $db->query($loserinsertsql);

    $loserdeletesql = "Delete From drawdata_id
    Where ticketnumber in (
            SELECT ticketnumber
            FROM  drawdata_loser
            )";
    $result = $db->query($loserdeletesql);

    $losersqlid = "SELECT id FROM drawdata_loser WHERE 1";

    $loseridresult = mysqli_query($db,$losersqlid);
    $array = array();
    while ($row=mysqli_fetch_row($loseridresult))
    {
        $array[] = $row;
    }
    //echo $array[0][0]."<br>";

    foreach($array as $i => $item) {
    $lid = $array[$i][0];
    $result = mysqli_query($db,"SELECT * FROM drawdata_loser WHERE id = '".$lid."' LIMIT 1");
    //$row = mysqli_fetch_row($result);

    $outOfDraw = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $outOfDraw=json_encode($outOfDraw);

    echo '{"outOfDrawData":'.$outOfDraw.'}';

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
                                        'L'
                                FROM drawdata_loser WHERE id = '".$lid."'");

    mysqli_query($db,"DELETE FROM drawdata_loser WHERE id ='".$lid."'LIMIT 1");
    }
}
outofdraw();
?>