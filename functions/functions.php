<?php

function l($url){
	return $url;
}

function db(){

	global $db;

	if(!isset($db)){
		$m = new Mongo("127.0.0.1");

		$db = $m->lee;

		if(isset($DB["user"])){
			$db->authenticate($DB["user"],$DB["password"]);
		}
	}

	return $db;
}

function html($text){
	$md = MarkdownDocument::createFromString($text);
	$md->compile();
	return $md->getHtml();
}

function get($type,$id,$fields=NULL){
	$c = db()->$type;
	$o = $fields ? $c->findOne(array("_id"=>$id),$fields) : $c->findOne(array("_id"=>$id));
	return $o;
}

foreach(glob(__DIR__."/modules/*.php") as $file){
	include $file;
}
