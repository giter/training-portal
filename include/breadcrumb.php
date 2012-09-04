<?php

	if(count($breadcrumb)>0){
		echo '<div class="container" id="breadcrumb">';
		echo '<ul class="breadcrumb">';
		$first = true;
		foreach($breadcrumb as $title => $url){

			if(!$first){
				echo '<span class="divider">&raquo;</span>';
			}else{
				$first = false;
			}

			$title = strtoupper($title);

			if($url){
				echo "<li><a href='$url'>$title</a></li>";
			}else{
				echo "<li>$title</li>";
			}
		}
		echo '</ul>';
		echo "</div>";

	}else if($func != "home"){
		echo '<div class="container" id="breadcrumb">';
		echo '<ul class="breadcrumb">';
		echo '<li><a href="'.l("?func=home").'">HOME</a></li><span class="divider">»</span>';
		echo "<li class='active'>${navs[$func]}</li>";
		echo '</ul>';
		echo "</div>";
	}
