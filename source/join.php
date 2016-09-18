<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>join</title>
</head>
<body>
    <form action="?check" method="post">
        姓名：<input type="text" name="name" id="name"><br>
        学号：<input type="text" name="sid" id="sid"><br>
        性别：<input type="radio" name="sex" value="male">男<input type="radio" name="sex" value="female">女<br>
        系别：<input type="text" name="major" id="major"><br>
        手机：<input type="tel" name="phone" id="phone"><br>
        申请理由：<textarea row="20" cols="50" name="reason" placeholder="请在此处填写申请理由"></textarea><br>
        <input type="submit" value="提交">
    </form>
    <div id="info"></div>
</body>
</html>
<?php
require("php/business.php");
?>
