<form class='row-fluid' style='padding:2em 0 0 2em;' action='' method='post' >

	<fieldset class='control-group'>
		<input name='title' type='text' class='input-xxlarge' value="<?=$val['e']['title']?>" />
	</fieldset>
	
	<fieldset  class='control-group'>
		<div class='wmd-panel'>
			<div id="wmd-button-bar"></div>
			<textarea name='content' class='input-xxlarge' rows="15"><?=$val['e']['content']?></textarea>
			<div id="wmd-preview" class="wmd-panel wmd-preview"></div>
		</div>
	</fieldset>
	
	<fieldset  class='control-group'>
		<input type='submit' class='btn btn-primary' value='Submit' />
		&nbsp;&nbsp;
		<a href='#'>Cancel</a>
	</fieldset>
</form>
