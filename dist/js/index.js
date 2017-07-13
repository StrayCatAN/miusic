var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songList;
var index;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playlist = root.playList;
//统一出发事件
$scope.on("play:change",function(e,index,flag) {
    var curData = songList[index];
    root.render(curData);
    // console.log(curData.duration);
    audiomanager.setAudioSource(curData.audio);
    if(audiomanager.status === "play" || flag){
        audiomanager.play();
        processor.start();
    }
    processor.render(curData.duration)
})
//上一首按钮
$scope.on("click",".prev-btn",function() {
    console.log("a");
    var index = controlmanager.prev();
    $scope.trigger("play:change",[index]);
})
//下一首按钮
$scope.on("click",".next-btn",function() {
    var index = controlmanager.next();
    $scope.trigger("play:change",[index]);
})
//播放按钮
$scope.on("click",".play-btn",function(e,index) {
    if(audiomanager.status ==="play") {
        audiomanager.pause();
        processor.stop();
    }else{
        processor.start();
        console.log("aa");
        audiomanager.play();
    }
    $scope.find(".play-btn").toggleClass("playing");
})
//菜单按钮
$scope.on("click",".list-btn",function(){
    console.log("e")
    playlist.show(controlmanager);
})
//关闭按钮
$scope.on("click",".close-btn",function(){
    playlist.close();
})
//绑定事件
function bindTouch(){

    var $slidePoint = $scope.find(".slider-point");
    var offset = $scope.find(".por-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on("touchstart", function(e){
        processor.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0){
            percentage = 0;
        }
        processor.upData(percentage);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0) {
            percentage = 0;
        }
        processor.start(percentage);
       var curDuration = songList[controlmanager.index].duration;
       var duration = curDuration + percentage;
       console.log(duration);
        audiomanager.jumptoPlay(duration);
        $scope.find(".play-btn").addClass("playing");
        console.log(x);


    })
 
}
function getData(url) {
    $.ajax({
        url:url,
        type:"GET",
        success:function(data) {
            bindTouch();
            songList = data;
            controlmanager =new root.controlManager(data.length);
            $scope.trigger("play:change",[0]);
            playlist.render(data);
        },
        error:function() {
            
            console.log("Error");
        }
    });
    // .done(function() {}).fail(function() {})
}

getData("/mock/data.json");