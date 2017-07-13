//封装渲染模块
(function($,root) {
    var $scope = $(document.body);
    //
    function renderInfo(data) {
        var html = "<h1 class ='song-name'>" +  data.song + "<h1>" +
        "<h2 class = 'singer-name'>" +  data.singer + "<h2>" +
        "<h3 class  'album-name'>" + data.album + "<h3>";
        $scope.find(".song-info").html(html);
    }
    //歌曲图片
    function renderImage(src) {
        var img = new Image();
        img.onload = function() {
            $scope.find(".song-img img").attr("src",src);
            root.blurImg(img,$scope)
        }
        img.src = src;
    }
    //渲染喜欢按钮
    function renderLike(isLike) {
        if(isLike) {
            $scope.find(".like-btn").addClass("like");
        }else{
            $scope.find(".like-btn").removeClass("like");
        }
    }
    root.render = function(data) {
        renderInfo(data);
        renderImage(data.image);
        renderLike(data.islike);
    }
}(window.Zepto,window.player||(window.player = {})))