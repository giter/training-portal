<?php

/**
 * Get database connection from system
 */
function db(){

	global $db;
	global $DB;

	if(!isset($db)){
		$db = new mysql_connect($DB["host"],$DB["user"],$DB["password"]);
		mysql_select_db($DB["db"]);
		mysql_query("SET NAMES utf8");
		mysql_query("SET CHARACTER SET utf8");
	}

	return $db;
}

function query($type,$query,$fields=array(),$sort=NULL,$limit=NULL){

	$_fields = "*";
	if(count($fields) > 0){
		$fields = array_map(mysql_escape_string,array_keys($fields));
		$_fields = implode(",",$fields);
	}

	$_query = "1=1 ";
	if(count($query) > 0){
		foreach($query as $k => $v){
			$query .= "and ".mysql_escape_string($k)."=".mysql_escape_string($v);
		}
	}

	$_sort = "";
	if(count($sort) > 0){
		foreach($sort as $k=>$v){
			$_sort .= mysql_escape_string($k) ." ".($v<0?"asc":"desc");
		}
		$_sort = "order by $_sort";
	}

	$_limit = "";
	if($limit > 0){
		$limit = "limit $limit";
	}

	return sprintf("select %s from %s where %s %s",$_fields,mysql_escape_string($type),$_query,$_sort,$_limit);
}

/**
 * Fetch item from db() 
 * @param $type
 *	type of collection
 * @param $id
 *	id of column
 * @param $fields
 *  fields of column returned
 */
function get($type,$id,$fields=NULL){
	$arr = fetch($type,array("_id"=>$id),NULL,1));
	return count($arr) > 0 ? $arr[0] : NULL;
}

/**
 * Fetch items from db()
 * @param $type
 *	type of collection
 * @param $query
 *  query of items
 * @param $fields
 *  fields of column returned
 * @param $sort
 *  sort order
 * @param $limit
 *  maxiunm fetched items
 */
function fetch($type,$query,$fields=array(),$sort=NULL,$limit=NULL){

	$result = mysql_query(query($type,$query,$fields,$sort,$limit));

	$arr = array();

	while ($row = mysql_fetch_assoc($result)) {
		array_push($row);
	}

	return $arr;
}

