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

function obj($type,$id,$fields){
}


function view_blogs(){
	$_REQUEST['blogs'] = db()->blog->find()->limit(10)->sort(array("_id"=>-1));
}

