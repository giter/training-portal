<?php
	if(isset($val)){
		
		echo "<div class='content'>";
		
		if($val->hasNext()) {

			while($val->hasNext()){

				$util =	 $val->getNext();
				$util["link"] = l("?func=util&id=".$util["_id"]);
				$util["time"] = date("Y/m/d",$util['created']);

				echo <<<EOD
				<a href='${util["link"]}'><span class='alert alert-info'>${util['title']}</span></a>
				&nbsp;
EOD;
			}

		}else{
			echo "<div class='item time'>No more entries!</div>";
		}
		
		echo "</div>";
	}
