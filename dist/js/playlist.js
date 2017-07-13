    (function($,root) {
        var $scope = $(document.body);
        var controlmanager;
        var $playList = $('<div class = "play-list">' +
         '<div class = "line-head">播放列表</div>' + 
        '<ul class = "play-list-wrap"></ul>' +
        '<div class = "close-btn">关闭</div>' +
        '</div>');
        function render(data) {
            var html = '';
            var len = data.length;
            for(var i = 0; i<len;i++){
                html += "<li><h3>" + data[i].song + '-<span>' + data[i].singer +  "</span></h3></li>"
            }
            var a = $playList.find("ul").html(html);
            console.log(a);
            $scope.append($playList);
        }
        function show(control){
            controlmanager = control;
            var index = controlmanager.index;
            $playList.addClass("show");
            signSong(index);
            bindEvent();
        }
        function bindEvent() {
            $playList.on("click","li",function(e) {
                var index = $(this).index();//获取当前li
                signSong(index);
                $scope.trigger("play:change",[index,true]);
                $scope.find(".play-btn").addClass("palying");
                setTimeout(function() {
                    $playList.removeClass("show");
                }, 1000);
            })
        }
        function signSong(index){
            $playList.find(".playing").removeClass("playing");
            $playList.find("li").eq(index).addClass("playing");
        }
        function close(){
            $playList.removeClass("show");
        }
        root.playList = {
            render:render,
            show : show,
            close : close
        }
}(window.Zepto,window.player || (window.player = {})))