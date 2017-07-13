(function($,root) {
    function controlManager() {
        this.index = 0;
        this.length = length;
        this.__proto__ =controlManager.prototype;
    }
    controlManager.prototype = {
        next:function() {
            return getIndex(1);
        },//下一首歌曲
        prev:function() {
            return getIndex(-1);
        },//上一首歌曲
        getIndex:function(val) {
            var index =this.index;
            var len = this.length;
            var cueIndex = (index + val + len)%len;
            this.index = curIndex;
            return curIndex;
        }

    }
        var c = new controlManager();
        console.log(c.__proto__);
        root.controlManager = controlManager;
}(window.Zepto,window.player||(window.player = {}))) 