<?php

/**
 * Get database connection from system
 */
function db(){

	global $db;
	global $DB;

	if(!isset($db)){
		$m = new Mongo($DB["host"]);

		$db = $m->$DB["db"];

		if(isset($DB["user"])){
			$db->authenticate($DB["user"],$DB["password"]);
		}
	}

	return $db;
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

	$query = db()->$type->find($query,$fields);

	if($sort){
		$query->sort($sort);	
	}

	if($limit > 0){
		$query->limit($limit);
	}

	$arr = array();

	while($query->hasNext()){
		array_push($arr,$query->getNext());	
	}

	return $arr;

}

