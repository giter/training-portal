<?php

	require 'config.php';
	require 'functions/functions.php';
	
	$func =  "home";
	
	if(isset($_GET['func'])){
		$func = $_GET['func'];
	}
	
?><!DOCTYPE html >
<html>

	<head>
		<meta charset="utf-8"/>
		<title><?=$funcs[$func]?> - LEE </title>
		<link rel='stylesheet' href='./css/bootstrap.css'/>
		<link rel='stylesheet' href='./css/global.css'/>
	</head>
	
	<body id='page-<?=$func?>'>
	
		<?php include 'include/top.php'; ?>
		<?php include './include/breadcrumb.php'; ?>

		<div id='main' class='container box'>
			<?php include './functions/'.$func.".php" ?>
		</div>
		
		<?php include './include/foot.php'; ?>
		
	</body>
</html>
