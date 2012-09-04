<?php
	session_start();

	global $user;
	$user = $_SESSION['user'];

	include __DIR__ . '/config.php';
	include __DIR__ . '/functions/functions.php';

	$func = "home";
	if($_GET['func']){
		$func = $_GET['func'];
	}

	$val = null;

	if(function_exists($func."_load")){
		$val = call_user_func($func."_load");
	}

	if(function_exists($func."_auth")){

		$user = $_SESSION['user'];
		
		if(!$user || !call_user_func($func."_auth",$user,$val)){
			echo "<h2>Permission Denied!</h2>";
			die;	
		}
	}

	if($_SERVER['REQUEST_METHOD'] == "POST"){
		if(function_exists($func."_post")){
			call_user_func($func."_post",$val);
			exit;
		}
		echo "<h2>POST method is NOT supported in " . $func . " module!</h2>";
		die;
	}


	$tabid = $func;
	if(function_exists($func."_tabid")){
		$tabid = call_user_func($func."_tabid");
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
			}else if($navs[$func]){
				$title = strtoupper($navs[$func]);
			}else{
				$title = strtoupper($func);
			}
		?>
		<title><?php echo($title); ?> - LEE's </title>
		<link rel='stylesheet' href='./css/global.css'/>
	</head>
	
	<body id='page-<?php echo($func); ?>'>
	
		<?php include __DIR__ . '/include/top.php'; ?>
		<?php include __DIR__ . '/include/breadcrumb.php'; ?>

		<div id='main' class='container box'>
			<?php include __DIR__ . '/views/' . $func . ".php" ?>
		</div>
		
		<?php include __DIR__  . '/include/foot.php'; ?>
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/Markdown.Converter.js"></script>
		<script type="text/javascript" src="js/Markdown.Editor.js"></script>
		<script type="text/javascript" src="js/Markdown.Sanitizer.js"></script>
		<script type="text/javascript" src="js/prettify.js"></script>
		<script type="text/javascript" src="js/lang-hs.js"></script>
		<script type="text/javascript" src="js/global.js"></script>
	</body>
</html>
