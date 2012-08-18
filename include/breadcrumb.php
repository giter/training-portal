<?php

	if($func != "home"){
		echo '<div class="container" id="breadcrumb">';
		echo '<ul class="breadcrumb">';
		echo '<li><a href="'.l("?func=home").'">HOME</a></li><span class="divider">»</span>';
		echo "<li class='active'>${funcs[$func]}</li>";
		echo '</ul>';
		echo "</div>";
	}