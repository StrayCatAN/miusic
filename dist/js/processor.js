//进度条
(function($,root) {
    //转换时间
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameId;
    var lastPercentage = 0;
    function formaTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if(minute < 10) {
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    //渲染总时间
    function render(duration) {
        // lastPercentage = 0;
        curDuration = duration;
        upData(0);
        var allTime = formaTime(duration);
        console.log(allTime);
        $scope.find(".all-time").text(allTime);
    }
    
    function setProcessor(percentage) {
        var percent = (percentage - 1) * 100 + "%";
        $scope.find(".por-top").css({transform:"traslateX("+percent+")"})
    }
    function upData(percentage) {
        var curTime = formaTime(percentage*curDuration);
        // console.log(curTime);
        $scope.find(".cur-time").text(curTime);
        setProcessor(percentage);
    }
    // //渲染当前时间和进度条
    function start(percent) {
        if(percent ===undefined ) {
            lastPercentage = lastPercentage;
        }else{
            lastPercentage = percent;
        }
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percentage =lastPercentage + (curTime - startTime) / (curDuration * 1000);
            if(percentage < 1) {
                upData(percentage);
                frameId = requestAnimationFrame(frame)
            }else{
               cancelAnimationFrame(frameId); 
            }
        }
        frame();
    }
    // //停止时间
    function stop() {
        var curTime = new Date().getTime();
         lastPercentage = lastPercentage + (curTime - startTime) / (curDuration*1000);
        cancelAnimationFrame(frameId);
    }
    root.processor = {
        render: render,
        start: start,
        stop: stop,
        upData : upData
    }
}(window.Zepto,window.player||(window.player = {})))