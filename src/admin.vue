<template>
    <div class="admin">
        <h1>留言管理页 <i @click="goto"></i></h1>
        <div class="show_tab clearfix">
            <button class="is_show" v-bind:class="{active:isTabA}" @click="tab_A('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/hasshow')">已显示留言</button>
            <button class="not_show" v-bind:class="{active:isTabB}" @click="tab_B('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/notshow')">未显示留言</button>
        </div>
        <div class="show_message">
            <div v-for="(allMessages,index) in allMessage" class="message_box">
                <div class="clearfix">
                    <p class="order">{{index+1}}</p>
                    <p class="title"><span>{{allMessages.nickname}}</span> 对 <span>{{allMessages.bumen}}</span>  留言:</p>
                </div>
                <!--<i>{{index}}</i>-->
                <p class="mes_con">{{allMessages.message_text}}</p>
                <button @click="showOrNot(allMessages.id,index)" class="show_or_not">{{show_or_not}}</button>
                <button @click="sendDelete(allMessages.id,index)" class="delete">删除留言</button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'show',
        data () {
            return {
                isTabA : true,
                isTabB : false,
                showMess: true,
                show_or_not:'屏蔽该留言',
                allMessage: [
                ]

            }
        },
        beforeMount: function() {
            var _self = this;
//            if(_self.showMess) {
//                _self.show_or_not = "屏蔽该留言";
//            } else {
//                _self.show_or_not = "显示该留言";
//            }
            _self.notActive = !_self.isActive;
            _self.sendAjax('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/getall');
        },
        methods: {
            tab_A: function(link) {
                var _self = this;
                _self.isTabA = true;
                _self.isTabB = false;
                _self.show_or_not = '屏蔽该留言';
                _self.sendAjax(link)
            },
            tab_B: function(link) {
                var _self = this;
                _self.isTabA = false;
                _self.isTabB = true;
                _self.show_or_not = '显示该留言';
                _self.sendAjax(link)
            },

            set_showOrNot:function(url,id_key,delete_index) {
                var _self = this;
                var resource = _self.$resource(url);
                this.modal.load();
                resource.save({
                    id: id_key,
                }).then(function(res) {
                    var data = res.data;
                    if(data.err!=200) {
                        _self.modal.error(data.info);
                    }else{
                        _self.modal.success('设置成功！',function() {
                            _self.allMessage.splice(delete_index,1);
                        });
                    }
                });
            },

            showOrNot: function(id_key,index) {
                var _self = this;
                if(_self.isTabA == true) {
                    _self.set_showOrNot('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/setnotshow',id_key,index);
                }
                if(_self.isTabB == true) {
                    _self.set_showOrNot('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/setshow',id_key,index);
                }
            },
//            set_notshow:function(url,id_key) {
//                var _self = this;
//                var resource = _self.$resource(url);
//                this.modal.load();
//                resource.save({
//                    id: id_key,
//                }).then(function(res) {
//                    var data = res.data;
//                    if(data.err!=200) {
//                        _self.modal.error(data.info);
//                    }else{
//                        _self.modal.success('留言已显示！',function() {
//                            _self.allMessage.splice(delete_index,1);
//                        });
//                    }
//                });
//            },

            tab_show: function(link) {
                var _self = this;
                _self.isActive = !_self.isActive;
                _self.notActive = !_self.isActive;
                _self.show_or_not = !_self.show_or_not;
//                console.log(_self.show_or_not);
                if(!_self.showMess) {
                    _self.show_or_not = "屏蔽该留言";
                } else {
                    _self.show_or_not = "显示该留言";
                }


                _self.sendAjax(link);
            },
            sendAjax: function(url) {
                var _self = this;
                _self.allMessage = [];
//                console.log(_self.allMessage);
                _self.notActive = !_self.isActive;
                _self.$http.get(url).then(function(res) {
                    var data = res.data;
    //                    console.log(data);
                    for(var i=0;i<data.length;i++) {
                        if(data[i].bumen=="SCYX") data[i].bumen = "市场营销部";
                        if(data[i].bumen=="JTKF") data[i].bumen = "集团客户事业部";
                        if(data[i].bumen=="DSBM") data[i].bumen = "电商部";
                        if(data[i].bumen=="JHZX") data[i].bumen = "稽核中心";
                        if(data[i].bumen=="KHFW") data[i].bumen = "客户服务部";
                        if(data[i].bumen=="CQYW") data[i].bumen = "城区业务部";
                        if(data[i].bumen=="BLYW") data[i].bumen = "北流业务部";
                        if(data[i].bumen=="BBYW") data[i].bumen = "博白业务部";
                        if(data[i].bumen=="LCYW") data[i].bumen = "陆川业务部";
                        if(data[i].bumen=="XYYW") data[i].bumen = "兴业业务部";
                        if(data[i].bumen=="RXYW") data[i].bumen = "容县业务部";
                         _self.allMessage.push(data[i]);
                    }
                });
//                console.log(_self.allMessage);
            },

            goto:function(){
                this.$router.push('./search');
            },
            sendDelete: function(id_key,delete_index) {
                var _self = this;
                var resource = _self.$resource('http://weixin.anumbrella.net/weixBd/weixinbackend/server.php/delete');
                this.modal.load();
                resource.save({
                    id: id_key,
                }).then(function(res) {
                    var data = res.data;
                    if(data.err!=200) {
                        _self.modal.error(data.info);
                    }else{
                        _self.modal.success('删除成功',function() {
                            _self.allMessage.splice(delete_index,1);
                        });
                    }
                    // alert(_self.info);
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
    .admin {
        h1 {
            width: 100%;
            line-height: 1.6rem;
            background: #ffc710;
            font-size: 40px;
            text-align: center;
             i {
                 display: block;
                 float: right;
                 width: 1.2rem;
                 height: 1.2rem;
                 margin-top: .2rem;
                 margin-right: .4rem;
                 background: url("./assets/search.jpg");
                 background-size: cover;
             }
        }
        button {
            width: 4rem;
            margin-top: .2rem;
            line-height: 1rem;
            background: #c7c5a8;
            font-size: 34px;
            text-align: center;
            color: #fff;
            border-radius: 16px;
        }
        .active {
            background: #F2753F;
        }
        .is_show {
            float: left;
            margin-left: .5rem;
        }
        .not_show {
            float: right;
            margin-right: .5rem;
        }
        .delete,
        .show_or_not {
            width: 3rem;
            line-height: .8rem;
            font-size: 30px;
            margin-left: .8rem;
            margin-top: .2rem;
        }

    }

</style>