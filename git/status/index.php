<!DOCTYPE html>
<html>
<body>

<p><?echo $_SERVER["REMOTE_ADDR"];?> asks for local git status:</p>

<pre>
<?php echo shell_exec("git status 2>&1");?>
</pre>

<p>website <a href="..">git commands</a></p>



</body>
</html>
