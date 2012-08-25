<?php

include(__DIR__ . "/db.php");

function l($url){
	return $url;
}

function html($text){
	$md = MarkdownDocument::createFromString($text);
	$md->compile();
	return $md->getHtml();
}

function compile($text){
	ob_start();
	eval($text);
	return ob_get_clean();
}

function content($text,$type){
	switch($type){
		case "html":
			echo $text;
			break;
		case "php":
			echo compile($text);
			break;
		case "markdown":
		default:
			echo html($text);
			break;
	}	
}

foreach(glob(__DIR__."/modules/*.php") as $file){
	include $file;
}
