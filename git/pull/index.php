<!DOCTYPE html>
<html>
<body>

<p><?echo $_SERVER["REMOTE_ADDR"];?> asks for a pull from github:</p>

<pre>
<?php echo shell_exec("git pull 2>&1");?>
</pre>

<p>website <a href="..">git commands</a></p>

<script src="http://www.google-analytics.com/urchin.js" type="text/javascript">
</script>
<script type="text/javascript">
_uacct = "UA-701785-1";
urchinTracker();
</script>

</body>
</html>
