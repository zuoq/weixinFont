//modal 插件
module.exports = {
    $wrapper: null,
    init: function(){
        this.$wrapper = document.createElement('div');
        this.$wrapper.id = 'loading';
        this.$wrapper.innerHTML =
            '<div class="loading-wrapper">'+
            '<div class="spinner">'+
            '<div class="bounce1"></div>'+
            '<div class="bounce2"></div>'+
            '<div class="bounce3"></div>'+
                //'<img src="/public/images/loading.gif" alt="">'+
            '</div>'+
            '<div class="success"><i class="iconfont2">&#xe677;</i><span class="info"></span></div>'+
            '<div class="error"><i class="iconfont2">&#xe66a;</i><span class="info"></span> </div>';'<div class="spinner">'+
        '</div>';
        this.hide(this.$wrapper);
        document.body.appendChild(this.$wrapper);
    },
    show: function($obj){
        $obj.style.display = 'block';
    },
    hide: function($obj){
        $obj.style.display = 'none';
    },
    isFunction: function(fn){
        return Object.prototype.toString.call(fn) == '[object Function]';
    },
    install: function(Vue, ops){
        this.init();
        var self = this;
        var $wrapper = self.$wrapper,
            $spinner = self.$wrapper.querySelector('.spinner'),
            $success = self.$wrapper.querySelector('.success'),
            $error = self.$wrapper.querySelector('.error');
        var modal = Vue.prototype.modal = {};
        modal.load = function(){
            self.hide($error);
            self.hide($success);
            self.show($spinner);
            console.log($wrapper.querySelector('.loading-wrapper'));
            //$wrapper.querySelector('.loading-wrapper').style.backgroundColor = '';
            self.show($wrapper);
        };

        modal.error = function(msg,cb){
            self.hide($success);
            self.hide($spinner);
            $error.querySelector('.info').textContent = msg;
            //$wrapper.querySelector('.loading-wrapper').style.backgroundColor = '#fff';
            self.show($error);
            self.show($wrapper);
            setTimeout(function(){
                self.hide($wrapper);

            }, 1000);
        };

        modal.success = function(msg, cb){
            self.hide($error);
            self.hide($spinner);
            $success.querySelector('.info').textContent = msg;
            self.show($success);
            //$wrapper.querySelector('.loading-wrapper').style.background = '#fff';
            self.show($wrapper);
            setTimeout(function(){
                self.hide($wrapper);
                self.isFunction(cb) && cb();
            }, 1000);
        };
        modal.close = function(){
            self.hide($wrapper);
        };
    }
};