<?php

	require __DIR__ . '/config.php';
	include __DIR__ . '/functions/functions.php';
	
	
	extract($_GET,EXTR_SKIP);
	
	if(!isset($func)){
		$func =  "home";
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
	
		<?php include __DIR__ . '/include/top.php'; ?>
		<?php include __DIR__ . '/include/breadcrumb.php'; ?>

		<div id='main' class='container box'>
			<?php include __DIR__ . '/functions/' . $func . ".php" ?>
		</div>
		
		<?php include __DIR__  . '/include/foot.php'; ?>
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
	</body>
</html>
