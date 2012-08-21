<?php

	require __DIR__ . '/config.php';
	include __DIR__ . '/functions/functions.php';
	
	$func = "home";
	if($_GET['func']){
		$func = $_GET['func'];
	}
	
	$val = null;

	if(function_exists($func."_load")){
		$val = call_user_func($func."_load");
	}

	$breadcrumb = null;
	if(function_exists($func."_breadcrumb")){
		$breadcrumb = call_user_func($func."_breadcrumb",$val);
	}
	
?><!DOCTYPE html >
<html>

	<head>
		<meta charset="utf-8"/>
		<?php
			if($val && is_array($val) && $val['title']){
				$title = $val['title'];
			}else if($funcs[$func]){
				$title = strtoupper($funcs[$func]);
			}else{
				$title = strtoupper($func);
			}
		?>
		<title><?=$title?> - LEE's </title>
		<link rel='stylesheet' href='./css/global.css'/>
	</head>
	
	<body id='page-<?=$func?>'>
	
		<?php include __DIR__ . '/include/top.php'; ?>
		<?php include __DIR__ . '/include/breadcrumb.php'; ?>

		<div id='main' class='container box'>
			<?php include __DIR__ . '/views/' . $func . ".php" ?>
		</div>
		
		<?php include __DIR__  . '/include/foot.php'; ?>
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
	</body>
</html>
