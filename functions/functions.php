<?php

function l($url){
	return $url;
}

function db(){

	global $db;

	if(!isset($db)){
		$m = new Mongo("127.0.0.1");

		$db = $m->lee;

		if(isset($DB["user"]) && isset($DB["password"])){
			$db->authenticate($DB["user"],$DB["password"]);
		}
	}

	return $db;
}

function get($type,$id,$fields=NULL){
	$c = db()->$type;
	return $fields ? $c->find(array("_id"=>$id),$fields) : $c->find(array("_id"=>$id));
}


function view_blogs(){
	$_REQUEST['blogs'] = db()->blog->find()->limit(10)->sort(array("_id" => -1));
}

