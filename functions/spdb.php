<?php
	
	function write($dir,$o){
		$i = 1;
		$fid = NULL;

		while(true){

			if($fid){
				fclose($fid);
			}

			$file = "$dir/$i.dat";
			$fid = fopen($file,"a");
			$dat = base64_encode(serialize($o));

			if(flock($fid,LOCK_EX)){
				$pos = ftell($fid);
				$len = strlen($dat);
				fwrite($fid,$dat);
				flock($fid,LOCK_UN);
				fclose($fid);
				return "$i,$pos,$len";
			}

			$i++;
		}
	}

	function read($dir,$fs){
		if(sscanf($fs,"%d,%d,%d",$i,$pos,$len) == 3){
			$file = "$dir/$i.dat";
			$fid = fopen($file,"r");
			fseek($fid,$pos);
			$dat = unserialize(base64_decode(fread($fid,$len)));
			fclose($fid);
			return $dat;
		}else{
			die("ERROR filename format $fs");
		}
	}
