/*
* @Author: Thea Ao
* @Date:   2017-06-11 03:29:41
* @Last Modified by:   Thea Ao
* @Last Modified time: 2017-06-11 16:22:52
*/

'use strict';
$(document).ready(function(){
    // 绑定事件
    $('#clear').on('click',function(){
        $('#wall').html('');
    });
    $('#shoot').on('click',shoot);
    $(document).on('keyup',function(event){
        if (event.keyCode == 13) {
            shoot();
        }
    });
    function shoot(){
        var input = $('input').val();
        if (input != '') {
            show(input);
        }
        
    }
    // 弹幕展示函数
    function show(input){
        var colors = ["#99CCCC","#FF9999","#996699","#CCCC99","#CC9999","#CCCCFF","#CCCCCC","#FF9966","#666666","#99CC66","#99CC99","#CCCC00","#990033","#FFCC99","#FFCC33","#663300","#CC9900","#336699","#339999","#990066","#999999","#993399","#FF6666","#0066CC","#336666","#009966","#99CC99","#99CC99","#660066","#FF9900"];
        // 准备弹幕
        var color = colors[Math.floor(Math.random() * colors.length)];
        var css = {};
        css.position = 'absolute';
        css.right = '5px';
        css.top = Math.random() * $('#wall').height();
        css.color = color;
        // 显示弹幕
        var danmu = $('<span></span>').html(input).css(css).appendTo($('#wall'));
        // 弹幕滑行
        danmu.animate({'left': 0},5000,function(){
            danmu.css({'display': 'none'});
        });
    }
});