<?php
	if(isset($_REQUEST["blogs"])){
		$blogs = $_REQUEST["blogs"];
		while($blogs->hasNext()){
			$blog = $blogs->getNext();
			echo $blog["title"];
		}
	}