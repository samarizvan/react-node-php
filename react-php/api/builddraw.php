<?php
if(isset($_POST['submit'])){
	$deleterecords = "TRUNCATE TABLE drawdata_buildoptions";
	mysqli_query($conn, $deleterecords);

	$sqlInsert = "INSERT INTO drawdata_buildoptions (displayoption, nexttcktoption, logooption, winningtcktoption, manualdrawoption, midpointoption)
				 values ('" . $_POST['displayoption'] . "','" . $_POST['nexttcktoption'] . "','" . $_POST['logooption'] . "','" . $_POST['winningtcktoption'] . "','" . $_POST['manualdrawoption'] . "','" . $_POST['midpointoption'] . "')";
	$result = mysqli_query($conn, $sqlInsert);
	mysqli_free_result($result);
	mysqli_close($conn);
	}
?>