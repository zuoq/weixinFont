

<template>
    <div id="message">
        <div class="header"></div>
        <div class="middle">
            <div class="text clearfix">
                <div class="text text1">为了更好交流请提出您宝贵的</div>
                <div class="text text2">意见</div>
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
            <button type="submit" @click="subMit">提交</button>
        </div>
        <div class="info">
            {{info}}
        </div>

    </div>
</template>

<script>
    export default {
        name: 'message',

        data () {
            return {
                message_text: '',
                nickname : 'izqcool',
                info: '',
                selected: "SCYX",
                message_text:'',
                bumen_text:'',
                options: [
                    { text: '市场营销部', value: 'SCYX' },
                    { text: '集团客户事业部', value: 'JTKF' },
                    { text: '城区业务部', value: 'CQYW' },
                    { text: '北流业务部', value: 'BLYW' },
                    { text: '博白业务部', value: 'BBYW' },
                    { text: '陆川业务部', value: 'LCYW' },
                    { text: '兴业业务部', value: 'XYYW' },
                    { text: '容县业务部', value: 'RXYW' },
                    { text: '网络建设部', value: 'WLJS' },
                    { text: '运营维护部', value: 'YYWH' },
                    { text: '网络优化中心', value: 'WLYH' },
                    { text: '人力资源部', value: 'RLZY' },
                    { text: '综合部', value: 'ZHB' },
                    { text: '纪委办公室', value: 'JWB' },
                ]

            }
        },

        beforeMount:function() {
            var _self = this;
            var res = this.$http.post('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d5ec6bee8722643&redirect_uri=http://weixin.anumbrella.net/weixin.php&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect');

            res.then(function(res){
                _self.nickname = res.nickname;
            });
        },



        methods: {
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

                var resource = _self.$resource('http://localhost:8000/save');
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
                            _self.$router.go('/');
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
        height: 5.6rem;
        margin: 0 auto;
        /*background-color: green;*/
        border-top: 2px solid #8c8870;
    }
    .text {
        /*width: 94%;*/
        margin: 0 auto;
        line-height: 60px;
        font-size: 32px;
        text-align: center;
        letter-spacing: 4px;
        color: #928f7c;
    }
    .text1 {
        padding-top: .36rem;

    }
    .text2 {
        width: 2rem;
        margin-right: 1rem;
        padding-bottom: .2rem;
        line-height: 70px;
        font-size: 50px;
        float: right;
        color: #ff2117;
    }
    .department {
        /*width: 94%;*/
        height: 2.4rem;
        margin: 0 auto;
        padding-top: .4rem;

        border-top: 2px solid #0b0000;
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
            width: 2.0rem;
            margin-top: .4rem;
            background-color: #fee3a0;
            line-height: 1rem;
            font-size: 30px;
            color: #fb5944;
            text-align: center;
            border: 2px solid #b2b290;
            border-radius: 8px;
        }
        
    }
    .info {
            width: 70%;
            line-height: 1.4rem;
            margin-top: .2rem;
           /* background-color: #000;*/
            text-align: center;
            font-size: 40px;
            color:red;
        }
</style>