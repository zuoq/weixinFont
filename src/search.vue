<template>
    <div class="search">
        <h1>搜索页</h1>
        <div class="search1">
            按昵称：<input type="search" v-model="search_nickname" placeholder="请输入昵称">
            <i @click="byName"></i>
        </div>
        <div class="search2">
            按部门：<select v-model="selected">
                <option v-for="option in options" v-bind:value="option.value">
                    {{option.text}}
                </option>
                </select>
            <i @click="byBuMen"></i>
        </div>
        <!--<div class="show_tab clearfix">-->
            <!--<button class="is_show" v-bind:class="{active:isTabA}" @click="tab_A('http://localhost:8000/hasshow')">已显示留言</button>-->
            <!--<button class="not_show" v-bind:class="{active:isTabB}" @click="tab_B('http://localhost:8000/notshow')">未显示留言</button>-->
        <!--</div>-->
        <div class="show_message">
            <div v-for="(allMessages,index) in allMessage" class="message_box">
                <p class="title"><span>{{allMessages.nickname}}</span> 对 <span>{{allMessages.bumen}}</span>  留言:</p>
                <!--<i>{{index}}</i>-->
                <p class="mes_con">{{allMessages.message_text}}</p>
                <button @click="set_NotShow(allMessages.id,index)" class="show_or_not">{{show_or_not}}</button>
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
//                isTabA : true,
//                isTabB : false,
                search_nickname:'',
                selected:'',
                showMess: true,
                show_or_not:'屏蔽该留言',
                allMessage: [
                ],
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
        beforeMount: function() {
            var _self = this;
//            if(_self.showMess) {
//                _self.show_or_not = "屏蔽该留言";
//            } else {
//                _self.show_or_not = "显示该留言";
//            }
//            _self.notActive = !_self.isActive;
            _self.sendAjax('http://localhost:8000/hasshow');
//            console.log(_self.search_nickname);
        },
        methods: {
//            tab_A: function(link) {
//                var _self = this;
//                _self.isTabA = true;
//                _self.isTabB = false;
//                _self.show_or_not = '屏蔽该留言';
//                _self.sendAjax(link)
//            },
//            tab_B: function(link) {
//                var _self = this;
//                _self.isTabA = false;
//                _self.isTabB = true;
//                _self.show_or_not = '显示该留言';
//                _self.sendAjax(link)
//            },

            set_NotShow:function(id_key,delete_index) {
                var _self = this;
                var resource = _self.$resource('http://localhost:8000/setnotshow');
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
            byName:function(name) {
                var _self = this;
                var resource = _self.$resource('http://localhost:8000/byname');
                this.modal.load();
                resource.save({
                    nickname: _self.search_nickname,
                }).then(function(res) {
                    var data = res.data;
//                    console.log(data);
                    if(data.err != 200) {
                        _self.modal.error(data.info);
                    }else{
                        _self.modal.success('查找成功！',function() {
//                            console.log(data.response);
                            _self.allMessage = [];
                            var resdata = data.response;
                            for(var i=0;i<resdata.length;i++) {
                                if(resdata[i].bumen=="SCYX") resdata[i].bumen = "市场营销部";
                                if(resdata[i].bumen=="JTKF") resdata[i].bumen = "集团客户事业部";
                                if(resdata[i].bumen=="CQYW") resdata[i].bumen = "城区业务部";
                                if(resdata[i].bumen=="BLYW") resdata[i].bumen = "北流业务部";
                                if(resdata[i].bumen=="BBYW") resdata[i].bumen = "博白业务部";
                                if(resdata[i].bumen=="LCYW") resdata[i].bumen = "陆川业务部";
                                if(resdata[i].bumen=="XYYW") resdata[i].bumen = "兴业业务部";
                                if(resdata[i].bumen=="RXYW") resdata[i].bumen = "容县业务部";
                                if(resdata[i].bumen=="WLJS") resdata[i].bumen = "网络建设部";
                                if(resdata[i].bumen=="YYWH") resdata[i].bumen = "运营维护部";
                                if(resdata[i].bumen=="WLYH") resdata[i].bumen = "网络优化中心";
                                if(resdata[i].bumen=="RLZY") resdata[i].bumen = "人力资源部";
                                if(resdata[i].bumen=="ZHB") resdata[i].bumen = "综合部";
                                if(resdata[i].bumen=="JWB") resdata[i].bumen = "纪委办公室";
                                _self.allMessage.push(resdata[i]);
                            }
                        })
                    }
                });
            },

            byBuMen:function() {
                var _self = this;
//                console.log(_self.selected);
                var resource = _self.$resource('http://localhost:8000/bybm');
                this.modal.load();
                resource.save({
                    select: _self.selected,
                }).then(function(res) {
                    var data = res.data;
//                    console.log(data);
                    if(data.err != 200) {
                        _self.modal.error(data.info);
                    }else{
                        _self.modal.success('查找成功！',function() {
//                            console.log(data.response);
                            _self.allMessage = [];
                            var resdata = data.response;
                            for(var i=0;i<resdata.length;i++) {
                                if(resdata[i].bumen=="SCYX") resdata[i].bumen = "市场营销部";
                                if(resdata[i].bumen=="JTKF") resdata[i].bumen = "集团客户事业部";
                                if(resdata[i].bumen=="CQYW") resdata[i].bumen = "城区业务部";
                                if(resdata[i].bumen=="BLYW") resdata[i].bumen = "北流业务部";
                                if(resdata[i].bumen=="BBYW") resdata[i].bumen = "博白业务部";
                                if(resdata[i].bumen=="LCYW") resdata[i].bumen = "陆川业务部";
                                if(resdata[i].bumen=="XYYW") resdata[i].bumen = "兴业业务部";
                                if(resdata[i].bumen=="RXYW") resdata[i].bumen = "容县业务部";
                                if(resdata[i].bumen=="WLJS") resdata[i].bumen = "网络建设部";
                                if(resdata[i].bumen=="YYWH") resdata[i].bumen = "运营维护部";
                                if(resdata[i].bumen=="WLYH") resdata[i].bumen = "网络优化中心";
                                if(resdata[i].bumen=="RLZY") resdata[i].bumen = "人力资源部";
                                if(resdata[i].bumen=="ZHB") resdata[i].bumen = "综合部";
                                if(resdata[i].bumen=="JWB") resdata[i].bumen = "纪委办公室";
                                _self.allMessage.push(resdata[i]);
                            }
                        })
                    }
                });
            },

//            showOrNot: function(id_key,index) {
//                var _self = this;
//                if(_self.isTabA == true) {
//                    _self.set_showOrNot('http://localhost:8000/setnotshow',id_key,index);
//                }
//                if(_self.isTabB == true) {
//                    _self.set_showOrNot('http://localhost:8000/setshow',id_key,index);
//                }
//            },
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

//            tab_show: function(link) {
//                var _self = this;
//                _self.isActive = !_self.isActive;
//                _self.notActive = !_self.isActive;
//                _self.show_or_not = !_self.show_or_not;
//                console.log(_self.show_or_not);
//                if(!_self.showMess) {
//                    _self.show_or_not = "屏蔽该留言";
//                } else {
//                    _self.show_or_not = "显示该留言";
//                }
//
//
//
//                _self.sendAjax(link);
//            },
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
//                console.log(_self.allMessage);
            },
            sendDelete: function(id_key,delete_index) {
                var _self = this;
                var resource = _self.$resource('http://localhost:8000/delete');
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
    .search {
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

    .search1,
    .search2 {

        width: 100%;
        height: .8rem;
        text-indent: 2em;
        font-size: 20px;
        margin-top: .2rem;
        /*background: red;*/


        input,
        select{
            font-size: 30px;
            width: 70%;
            /*margin-left: %;*/
            line-height: .8rem;
            text-indent: 2em;
            background-color: #FEE3A0;
            border-radius: 14px;
            outline: none;
        }
        i {
            float: right;
            width: .8rem;
            height: .8rem;
            margin-right: .2rem;
            background: url("./assets/search.jpg") 0 0 no-repeat;
            background-size: cover;
        }
        select {
            display: inline-block;
            height: .8rem;
            font-size: 26px;
        }
    }

</style>