
<template>
    <div id="message">
        <div class="header"></div>
        <div class="middle">
            <div class="text clearfix">
                <p class="text1">行为准则大讨论第二阶段活动之意见征集</p>
                <p>请大家本着客观、公正的原则对市场和客服序列的工作提出宝贵的建议和意见，我们会如实反映给相应部门，相应部门也会对大家提出的意见给予回复，有则改之，无则加勉。同时，我们会组织全员参评，评出20条最有建设性的建议，每条给予200元的奖励。</p>
            </div>
            <div class="department">
                <div class="dmfl clearfix">
                    <p>针对部门业务区：</p>
                    <select v-model="selected">
                        <option v-for="option in options" v-bind:value="option.value">
                            {{option.text}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="message_text">
            <textarea v-model="message_text" placeholder="请输入您的意见"></textarea>
            <button type="submit" @click="goMes" class="seeAll">查看所有留言</button>
            <button type="submit" @click="subMit">提交</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'message',

        data () {
            return {
                message_text: '',
                nickname : '',
                info: '',
                selected: "SCYX",
                message_text:'',
                bumen_text:'',
                options: [
                    { text: '市场营销部', value: 'SCYX' },
                    { text: '集团客户事业部', value: 'JTKF' },
                    { text: '电商部', value: 'DSBM' },
                    { text: '稽核中心', value: 'JHZX' },
                    { text: '客户服务部', value: 'KHFW' },
                    { text: '城区业务区', value: 'CQYW' },
                    { text: '北流业务区', value: 'BLYW' },
                    { text: '博白业务区', value: 'BBYW' },
                    { text: '陆川业务区', value: 'LCYW' },
                    { text: '兴业业务区', value: 'XYYW' },
                    { text: '容县业务区', value: 'RXYW' },
                ]

            }
        },

        beforeMount:function() {
//            console.log(111);
//            alert(111);
            var _self = this;
            var res = this.$http.get('http://weixin.anumbrella.net/weixin.php');

//            }
            res.then(function(data){

                var get_name = _self.getUrl('name');
//                alert('right');
//                alert(data);

                _self.nickname = get_name;
            });
        },



        methods: {
            goMes:function(){
                this.$router.push('./show');
            },

            getUrl: function GetQueryString(name)
                {
                    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if(r!=null)return  decodeURI(r[2]); return null;
                },
            subMit: function() {
                var _self = this;
//                console.log(_self.message_text);
//                console.log(_self.nickname);
//                console.log(_self.selected);
//                _self.$http.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d5ec6bee8722643&redirect_uri=http://weixin.anumbrella.net/weixin.php&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect')
//                    .then(function(res){
//                        _self.nickname = res.nickname;
//                    });


//                _self.nickname = 'zdadad';

                var resource = _self.$resource('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/save2');
                this.modal.load();
                resource.save({
                    selected: _self.selected,
                    message_text: _self.message_text,
                    nickname: _self.nickname
                }).then(function(res) {
                    var data = res.data;
                    _self.info = data.info;
                    _self.message_text = "";
                    if(data.err != 200) {
                        _self.modal.error(data.info);
                    }else {
                        _self.modal.success('留言成功！！',function() {
                            _self.$router.push('./show');
                        })
                    }
                    // if(data.err == 200) {
                    //     _self.info = data.info;
                    //     alert(_self.info);
                    // }
                });
            }
        }
    }
</script>

<style lang="scss">
    #app {
        height: 100%;
    }
    #message {
        width: 100%;
        height: 100%;
        /*background-color: red;*/
        background-color: #fffcd6;
    }
    #message .header {
        width: 100%;
        height: 450px;
        background: url("./assets/002.jpg") 0 0 no-repeat;
        background-size: cover;
    }
    .middle {
        width: 86%;
        /*height: 5.8rem;*/
        margin: 0 auto;
        padding-top: .2rem;
        padding-bottom: .4rem;
        /*background-color: green;*/
        border-top: 2px solid #252112;
    }
    .text {
        /*width: 94%;*/
        margin: 0 auto;
        line-height: 36px;
        font-size: 22px;
        letter-spacing: 2px;
        text-align: justify;
        color: #898869;
        padding-bottom: .2rem;
    }
    .text1 {
        /*width: 80%;*/
        text-align: center;
        text-align: center;
        line-height: 48px;
        font-size: 26px;
        color: #ff2117;
    }
    /*.text2 {*/
        /*width: 100%;*/
        /*padding-bottom: .2rem;*/
        /*text-align: right;*/
        /*line-height: 80px;*/
        /*font-size: 40px;*/
        /*float: right;*/
        /*color: #ff2117;*/
    /*}*/
    .department {
        /*width: 94%;*/
        height: 2.4rem;
        margin: 0 auto;
        padding-top: .4rem;

        border-top: 2px solid #252112;
        .dmfl  {
            height: 2.4rem;
            background-color: #fee3a0;
            border: 2px solid #cbbe8f;
            border-radius: 8px;
        }
        p {
            line-height: .8rem;
            padding-top: .3rem;
            text-indent: .4rem;
            font-size: 32px;
            color: #e64e27;
        }
    }
    .department select {
        float: right;
        width: 4rem;
        height: 1rem;
        margin-right: 1rem;
        font-size: 26px;
        background-color: #fcebbd;
        color: #c7583a;
    }
    .message_text  {
        width: 86%;
        /*padding-top: .4rem;*/
        margin: 0 auto;
        textarea {
            width: 100%;
            display: block;
            height: 2.8rem;
            margin: 0 auto;
            padding: .2rem 0;
            line-height: 50px;
            font-size: 32px;
            background-color: #fffde4;
            border: 2px solid #b2b290;
            border-radius: 8px;
            text-indent: .4rem;
        }
        button {
            float: right;
            width: 2.4rem;
            margin-top: .4rem;
            background-color: #fee3a0;
            line-height: 1rem;
            font-size: 30px;
            color: #fb5944;
            text-align: center;
            border: 2px solid #b2b290;
            border-radius: 8px;
        }

        .seeAll {
            float: left;
            width: 3.4rem;
        }
        
    }
    @media all and(max-width: 350px){
        .message_text {
            width: 86%;
            margin: 0 auto;
            margin-top: 1.4rem;
        }
    }
</style>