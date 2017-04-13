<template>
    <div>
        <div class="show_header"></div>
        <div class="show_message">
            <div v-for="allMessages in allMessage" class="message_box">
                <p class="title"><span>{{allMessages.nickname}}</span> 对 <span>{{allMessages.bumen}}</span>  留言:</p>
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
                    // { nickname: '市场营销部', dpm: 'SCYX', text: "dhashdoisdka ahsddohias烦哦啊你撒sdaasdasd刚好 iu 啊大师哈色的就拉屎的的那是" },
                    // { nickname: '市场营销部', dpm: 'SCYX', text: "dhashdoisdka ahsddoh看到破碎恐怕是的可撒大卡ias烦哦啊你撒的那是" },
                    // { nickname: '市场营销部', dpm: 'SCYX', text: "dhashdoisdka ahsddohias烦哦啊你撒的那是快看看撒点咖色" },
                    // { nickname: '市场营销部', dpm: 'SCYX', text: "dhashdoisdka ahsddohias烦哦啊你撒的那是降低哦千万记得我去的就哦抛弃我的就哦抛弃我的将俏皮味道就抛弃我的" },
                    // { nickname: '市场营销部', dpm: 'SCYX', text: "dhashdoisdka ahsddohias烦哦啊你撒的那是" }
                ]

            }
        },
        beforeMount: function() {
            var _self = this;
            _self.$http.get('http://localhost:8000/getall').then(function(res) {
                var data = res.data;
//                console.log(data);
                for(var i=0;i<data.length;i++) {
                    if(data[i].bumen=="SCYX") data[i].bumen = "市场营销部";
                    if(data[i].bumen=="JTKF") data[i].bumen = "集团客户事业部";
                    if(data[i].bumen=="CQYW") data[i].bumen = "城区业务部";
                    if(data[i].bumen=="BLYW") data[i].bumen = "北流业务部";
                    if(data[i].bumen=="BBYW") data[i].bumen = "博白业务部";
                    if(data[i].bumen=="LCYW") data[i].bumen = "陆川业务部";
                    if(data[i].bumen=="XYYW") data[i].bumen = "兴业业务部";
                    if(data[i].bumen=="RXYW") data[i].bumen = "容县业务部";
                    if(data[i].bumen=="WLJS") data[i].bumen = "网络建设部";
                    if(data[i].bumen=="YYWH") data[i].bumen = "运营维护部";
                    if(data[i].bumen=="WLYH") data[i].bumen = "网络优化中心";
                    if(data[i].bumen=="RLZY") data[i].bumen = "人力资源部";
                    if(data[i].bumen=="ZHB") data[i].bumen = "综合部";
                    if(data[i].bumen=="JWB") data[i].bumen = "纪委办公室";
                
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
        .title {
            padding-top: .1rem;
            line-height: .6rem;
            font-size: 32px;
            span {
                color: #e64e27;
            }
        }
        .mes_con {
            line-height: .5rem;
            font-size: 28px;
         text-indent: 2em;
        }
    }
</style>