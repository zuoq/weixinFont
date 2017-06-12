<template>
    <div>
        <div class="show_header"></div>
        <div class="show_message">
            <div v-for="(allMessages,index) in allMessage" class="message_box">
                <div class="clearfix">
                    <p class="order">{{index+1}}</p>
                    <p class="title"><span>匿名用户</span> 对 <span>{{allMessages.bumen}}</span>  留言:</p>
                </div>
                <p class="mes_con">{{allMessages.message_text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'show',
        data () {
            return {
                allMessage: [
                ]

            }
        },
        beforeMount: function() {
            var _self = this;
            _self.$http.get('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/getall2').then(function(res) {
                var data = res.data;
//                console.log(data);
                for(var i=0;i<data.length;i++) {
                    if(data[i].bumen=="WLJS") data[i].bumen = "网络建设部";
                    if(data[i].bumen=="YXWH") data[i].bumen = "运行维护部";
                    if(data[i].bumen=="WLYH") data[i].bumen = "网络优化中心";
                    _self.allMessage.push(data[i]);

                }
            });
//            console.log(_self.allMessage);
        }





    }
</script>
<style lang="scss">
    .show_header {
        width: 100%;
        height: 5.0rem;
        background: url("./assets/header.png") 0 0 no-repeat;
        background-size: contain;
    }

    .message_box {
        width: 86%;
        padding-bottom: .2rem;
        /*height: 2rem;*/
        margin: .4rem auto;
        background-color: #fee3a0;
        border: 2px solid #cbbe8f;
        border-radius: 8px;

    .title,
    .order{
        float: left;
        padding-top: .1rem;
        line-height: .6rem;
        font-size: 32px;
    span {
        color: #e64e27;
    }
    }
    .title {
        margin-left: 1em;
    }
    .mes_con {
        line-height: .5rem;
        font-size: 28px;
        text-indent: 2em;
    }
    }
</style>