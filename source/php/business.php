<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2016/9/14
 * Time: 13:24
 */
if(isset($_REQUEST['check'])) {
    $name = $_REQUEST['name'];
    $sid = $_REQUEST['sid'];
    @$sex = $_REQUEST['sex'];
    $major = $_REQUEST['major'];
    $phone = $_REQUEST['phone'];
    $reason = $_REQUEST['reason'];
    function validateName($name)
    {
        return preg_match("/^[\x{4e00}-\x{9fa5}]+$/u", $name);
    }

    function validatePhone($phone)
    {
        return preg_match("/^1[3|4|5|7|8]\d{9}$/", $phone);
    }

    function validateSid($sid){
        return preg_match("/^\d{11}$/", $sid);
    }

    if (validateName($name) && validatePhone($phone) && validateSid($sid) && !empty($phone) && !empty($reason)) {
        $filename = "$sid."."txt";
        $filepath = "../txt/".$filename;
        if(file_exists($filepath)){
            echo '<script language="JavaScript">document.getElementById("info").innerHTML="该学生已经提交，请勿重复提交"</script>';
        }
        else {
            $name1 = "姓名：".$name."\n";
            $sid1 = "学号：".$sid."\n";
            $sex1 = "性别：".$sex."\n";
            $major1 = "专业：".$major."\n";
            $phone1 = "电话：".$major."\n";
            $reason1 = "理由：".$reason."\n";
            $file = fopen("$filepath", "w");
            fwrite($file,$name1);
            fwrite($file,$sid1);
            fwrite($file,$sex1);
            fwrite($file,$major1);
            fwrite($file,$phone1);
            fwrite($file,$reason1);
            fclose($file);
        }
    }
    else {
        echo '<script language="JavaScript">document.getElementById("info").innerHTML="请核对信息后提交！"</script>';
    }
}
