<?php

function blogs_load(){

	$query = array();

	$id = $_GET['id'];

	if($id){
		$query["id"] = array("$lt"=>$id);
	}

	$tag = $_GET['tag'];
	if($tag){
		$query["tags"] = array('$in'=>array($tag));
	}

	return fetch("blog",$query,array("title"=>1,"created"=>1,"tags"=>1),array("_id"=>-1),$PAGE_COUNT);
}

function blogs_breadcrumb($val){
	global $func;
	$breads =  array(
		"home"=>l("?func=home")
	);
	if($_GET['tag']){
		$breads += array("blogs"=>l("?func=blogs"),$_GET['tag']=>"");
	}else{
		$breads += array("blogs"=>$func=='blogs'?"":l("?func=blogs"));
	}
	return $breads;
}


function blog_load(){
	$val = get($_GET['func'],$_GET['id']);
	return $val;
}

function blog_breadcrumb($val){
	return blogs_breadcrumb($val) + array(
		($val['title']) => ""
	);
}

function blog_tabid(){
	return "blogs";
}

