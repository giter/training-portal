<?php
	if(isset($val)){
		
		echo "<div class='content'>";
		
		if(is_array($val) && count($val) > 0) {

			foreach($val as $util){

				$util["link"] = l("?func=util&id=".$util["_id"]);
				$util["time"] = date("Y/m/d",$util['created']);

				echo <<<EOD
				<a href='${util["link"]}'><span class='alert alert-info'>${util['title']}</span></a>
				&nbsp;
EOD;
			}

		}else{
			echo "<div class='time'>No more utils.</div>";
		}
		
		echo "</div>";
	}
