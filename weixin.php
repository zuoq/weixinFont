<?php


    $redicet_url = "http://weixin.anumbrella.net/WeiX/#/index";
     $code = $_GET['code'];
        if($code != null){

            $access_token_url ="https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx8d5ec6bee8722643&secret=533b6a80b7bc05a8d0a4859a079dd61d&code=".$code."&grant_type=authorization_code";

            $access_token_content = file_get_contents($access_token_url);
            $access_tokenData = (Array)json_decode($access_token_content,JSON_UNESCAPED_UNICODE);

            $userData_url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_tokenData['access_token']."&openid=".$access_tokenData['openid']."&lang=zh_CN";

            $userData_content = file_get_contents($userData_url);
            $userData = (Array)json_decode($userData_content,JSON_UNESCAPED_UNICODE);
            $redicet_url .= "?name=".$userData["nickname"]."&test=anumbrella";
            echo $userData["nickname"];

           }
            

     Header("Location:$redicet_url"); 


  
?>