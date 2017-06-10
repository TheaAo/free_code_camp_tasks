/*
* @Author: Administrator
* @Date:   2017-04-12 15:27:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-18 23:11:13
*/

'use strict';

$(document).ready(function(){
    var isPause = true;
    var isBreakTiming = false;
    var period = 1;
    var timing;
    var minutes;
    var seconds;
    var intervalId;
    var obj = {};
    // 点击按钮设置时间
    $('button').on('click',function(event){
        event.preventDefault();
        var $this = $(this);
        period = $this.siblings('span').text();
        if (isPause) {
            if ($this.hasClass('plus')) {
                period++;
            }
            else {
                if (period > 1) {
                    period--;
                }
                
            }
            $this.siblings('span').text(period);

            if($this.parent().is('#session')){
                $('.timer').find('span').text(period);
            }
        }
    });
    // 倒计时操作
    $('.timer').on('click',function(){
        // 如果点击时计时器处于暂停状态，则计时
        if (isPause) {         
            intervalId = setInterval(function(){
                // 判断是否当前时段结束
                if (timing === 0) {
                    // 如果结束时段是休息时段，开始下一个工作时段的计时
                    if (isBreakTiming) {
                        period = $('#session').find('span').text();
                        $('.animation').css({
                            height: 0,
                            backgroundColor: '#84E800'});
                    }
                    // 如果结束时段是工作时段，开始休息时段的计时
                    else {
                        period = $('#break').find('span').text();
                        $('.animation').css({
                            height: 0,
                            backgroundColor: '#FF6E6E'});
                    }
                    isBreakTiming = !isBreakTiming;
                    $('.timer').find('span').text(period);
                }
                // 记录当前计时剩余时间
                timing = $('.timer').find('span').text();
                // 转换成秒
                if(timing.search(':') != -1){
                    timing = timing.split(':');
                    timing = Number(timing[0]) * 60 + Number(timing[1]);
                }
                else{
                    timing *= 60;
                }
                // 计时
                timing--;
                // 转换格式以供显示
                minutes = Math.floor(timing / 60);
                seconds = timing % 60;
                if(seconds < 10){
                    seconds = '0' + seconds;
                } 
                obj.height = (period * 60 - timing) / (period * 60) * 300 + 'px';
                $('.animation').animate(obj,'slow');
                $('.timer').find('span').text(minutes + ':' + seconds);
            },1000);
        }
        // 如果点击时处于计时状态，则暂停
        else{            
            clearInterval(intervalId);
        }
        // 切换状态
        isPause = !isPause;        
    });
});