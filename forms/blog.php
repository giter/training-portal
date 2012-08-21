<form class='row-fluid' style='padding:2em 0 0 2em;' action='' method='post' >

	<fieldset class='control-group'>
		<input name='title' type='text' class='input-xxlarge' value="<?=$val['title']?>" />
	</fieldset>
	
	<fieldset  class='control-group'>
		<textarea name='content' class='input-xxlarge' rows="15"><?=$val['content']?></textarea>
	</fieldset>
	
	<fieldset  class='control-group'>
		<input type='submit' class='btn btn-primary' value='Submit' />
		&nbsp;&nbsp;
		<a href='#'>Cancel</a>
	</fieldset>
</form>
