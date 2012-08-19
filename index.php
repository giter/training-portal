<?php

	require __DIR__ . '/config.php';
	include __DIR__ . '/functions/functions.php';
	
	$func =  "home";
	
	if(isset($_GET['func'])){
		$func = $_GET['func'];
	}
	
	if(function_exists("view_".$func)){
		call_user_func("view_".$func);
	}
	
?><!DOCTYPE html >
<html>

	<head>
		<meta charset="utf-8"/>
		<title><?=$funcs[$func]?> - LEE's </title>
		<link rel='stylesheet' href='./css/global.css'/>
	</head>
	
	<body id='page-<?=$func?>'>
	
		<?php include 'include/top.php'; ?>
		<?php include './include/breadcrumb.php'; ?>

		<div id='main' class='container box'>
			<?php include './functions/' . $func . ".php" ?>
		</div>
		
		<?php include './include/foot.php'; ?>
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
	</body>
</html>
