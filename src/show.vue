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
            _self.$http.get('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/getall').then(function(res) {
                var data = res.data;
//                console.log(data);
                for(var i=0;i<data.length;i++) {
                    if(data[i].bumen=="SCYX") data[i].bumen = "市场营销部";
                    if(data[i].bumen=="JTKF") data[i].bumen = "集团客户事业部";
                    if(data[i].bumen=="DSBM") data[i].bumen = "电商部";
                    if(data[i].bumen=="JHZX") data[i].bumen = "稽核中心";
                    if(data[i].bumen=="KHFW") data[i].bumen = "客户服务区";
                    if(data[i].bumen=="CQYW") data[i].bumen = "城区业务区";
                    if(data[i].bumen=="BLYW") data[i].bumen = "北流业务区";
                    if(data[i].bumen=="BBYW") data[i].bumen = "博白业务区";
                    if(data[i].bumen=="LCYW") data[i].bumen = "陆川业务区";
                    if(data[i].bumen=="XYYW") data[i].bumen = "兴业业务区";
                    if(data[i].bumen=="RXYW") data[i].bumen = "容县业务区";
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