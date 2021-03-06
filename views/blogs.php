<?php
	if(isset($val)){
		
		echo "<div class='items'>";
		
		if(is_array($val) && count($val) > 0) {

			$first = null;
			$last = null;
			$count = 0;

			foreach($val as $blog){

				$count ++;
				
				if(!$first){
					$first = $blog['_id'];
				}

				$blog["link"] = l("?func=blog&id=".$blog["_id"]);
				$blog["time"] = date("Y/m/d",$blog['created']);
				if($blog['tags']){
					$tags = "";
					foreach($blog['tags'] as $t){
						$tags .= "<a href='".l("?func=blogs&tag=".$t)."' class='label label-info'>$t</a> ";
					}
					$blog["tags"] = $tags;
				}

				echo <<<EOD
			<div class='item'>
				<h4>
					<a href='${blog["link"]}'><strong>${blog['title']}</strong></a>
					<span class='pull-right'>${blog["tags"]}</span>
				</h4>
				<p class='time'>${blog['time']}</p>
			</div>			
EOD;
			}

			if(!$last){
				$last = $blog['_id'];
			}

			$first = l("?func=blogs&id=$first");
			$last  = l("?func=blogs&id=$last");

			if(!$_GET['id']){
				unset($first);
			}else{
				$first = "<li class='pull-left'><a href='$first'>PREV</a></li>";
			}

			if($count == $PAGE_COUNT){
				$last = "<li class='pull-right'><a href='$last'>NEXT</a></li>";
			}else{
				unset($last);
			}

			if($last || $first){
				echo <<<EOD
			<div>
				<ul class='pager'>
					$first
					$last
				</ul>	
			</div>
EOD;
			}

		}else{
			echo "<div class='content time'>No more blogs.</div>";
		}
		
		echo "</div>";
	}
