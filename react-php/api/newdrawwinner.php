<?php

include 'config.php';

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

	// Fetch one by one row
while ($row=mysqli_fetch_row($idresult))
{
	$array[] = $row;
}
	//echo $array[0][0]."<br>";
	echo "<table class=rtbl>";
		echo "<thead>";
			echo "<tr>";
				echo "<th class=tcknumw> Ticket Number </th>";
				echo "<th class=tcknamew> Ticket Name </th>";
				echo "<th class=tcksalepw> Salesperson </th>";
			echo "</tr>";
		echo "</thead>";
		echo "<tbody>";

			foreach($array as $i => $item) {
				$id = $array[$i][0];
				$result = mysqli_query($db,"SELECT * FROM drawdata_winner WHERE id = '".$id."'");
				$row=mysqli_fetch_row($result);

				echo "<tr>";
					echo "<td class=tcknumw>" . $row[2] . "</td>";
					echo "<td class=tcknamew>" . $row[3] . "</td>";
					echo "<td class=tcksalepw>" . $row[4] . "</td>";
				echo "</tr>";

				mysqli_query($conn,"INSERT INTO drawdata_winnerloser (
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

		echo "</tbody>";
    echo "</table>";
    
    ?>