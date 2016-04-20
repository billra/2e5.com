<!DOCTYPE html>
<html>
<HEAD>
<TITLE>2e5.com Git Pull</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="author" content="Bill Ola Rasmussen"> 
<meta name="keywords" content="git">
<link rel="stylesheet" type="text/css" href="/style.css">
<link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon">
<link rel="icon" href="/favicon.ico" type="image/vnd.microsoft.icon"> 
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-701785-1', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
</HEAD>
<body>

<p><?echo $_SERVER["REMOTE_ADDR"];?> asks for a pull from github:</p>

<pre>
<?php echo shell_exec("git pull 2>&1");?>
</pre>

<p>website <a href="..">git commands</a></p>

</body>
</html>
