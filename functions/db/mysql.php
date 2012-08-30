<?php

/**
 * Get database connection from system
 */
function db(){

	global $db;
	global $DB;

	if(!isset($db)){
		$db = new PDO( 
			$DB["host"],
			$DB["user"], 
			$DB["password"], 
			array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") 
		); 
		//$db = new mysql_connect($DB["host"],$DB["user"],$DB["password"]);
		//mysql_select_db($DB["db"]);
		//mysql_query("SET NAMES utf8");
		//mysql_query("SET CHARACTER SET utf8");
	}

	return $db;
}

/**
 * Save $en to db()'s collection $type
 * @param $type collection name
 * @param $en entity 
 */
function save($type,$val){
	
	$first = true;
	$query = "replace $type set ";

	foreach($val as $k => $v){
		if(!$first){
			$query .= ",";	
		}else{
			$first = false;
		}
		$query .= "$k = :$k";
	}

	$stmt = db()->prepare($query);

	foreach($val as $k => $v){
		$stmt->bindValue(":$k",$v);
	}

	$stmt->execute();
}


function query($type,$query,$fields=array(),$sort=NULL,$limit=NULL){

	$_fields = "*";
	if(count($fields) > 0){
		$fields["_id"] = 1;
		$fields = array_keys($fields);
		$_fields = implode(",",$fields);
	}

	$_query = "1=1 ";
	if(count($query) > 0){
		foreach($query as $k => $v){
			$query .= "and $k = :$k";
		}
	}

	$_sort = "";
	if(count($sort) > 0){
		foreach($sort as $k=>$v){
			$_sort .= db()->quote($k) ." ".($v<0?"asc":"desc");
		}
		$_sort = "order by $_sort";
	}

	$_limit = "";
	if($limit > 0){
		$limit = "limit ".db()->quote($limit);
	}
	
	$stmt = db()->prepare(sprintf("select %s from %s where %s %s",$_fields,$type,$_query,$_sort,$_limit));
	foreach($query as $k => $v){
		$stmt->bindValue(":$k",$v);
	}

	$stmt->execute();
	return $stmt;
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
function get($type,$id,$fields=array()){
	$arr = fetch($type,array("_id"=>$id),$fields,NULL,1);
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
	$stmt = query($type,$query,$fields,$sort,$limit);
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


