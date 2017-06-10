/*
* @Author: Aoxy
* @Date:   2017-02-13 12:27:31
* @Last Modified by:   Thea Ao
* @Last Modified time: 2017-06-10 12:36:30
*/
"use strict";

$(document).ready(function(){
    // 颜色库
    var colors = ["#99CCCC","#FF9999","#996699","#CCCC99","#CC9999","#CCCCFF","#CCCCCC","#FF9966","#666666","#99CC66","#99CC99","#CCCC00","#990033","#FFCC99","#FFCC33","#663300","#CC9900","#336699","#339999","#990066","#999999","#993399","#FF6666","#0066CC","#336666","#009966","#99CC99","#99CC99","#660066","#FF9900"];
    var library;

    // 事件绑定
    $('.fa-weibo').on('click',function(){
        var content = $('.content').text();
        shareTo('weibo',content);
    });
    $('.fa-facebook').on('click',function(){
        var content = $('.content').text();
        shareTo('facebook',content);
    });
    $('.fa-twitter').on('click',function(){
        var content = $('.content').text();
        shareTo('twitter',content);
    });
    $('#change').on('click',function(){
        randomQuote();
    });

    // 获取诗词库并初始化页面内容
    $.getJSON('library.json',function(data){
        library = data;
        randomQuote();
    });

    // 随机函数：实现诗词和界面色彩的随机呈现 
    function randomQuote() {

        var poetryIndex = Math.floor(Math.random() * library.length);
        var colorIndex = Math.floor(Math.random() * colors.length);  
        
        $('.content p').html(library[poetryIndex].poetry).css('color',colors[colorIndex]);
        $('.content cite').html(library[poetryIndex].name).css('color',colors[colorIndex]);
        $('body, .panel *').css('background-color',colors[colorIndex]);
        $('.fa-bookmark').css('color',colors[colorIndex]);
    }

    // 社交网络分享函数
    function shareTo(socialnet,content){
        switch(socialnet) {
            case "weibo":
            window.open("http://service.weibo.com/share/share.php?title=" + content);
            break;
            case "facebook":
            window.open("https://www.facebook.com/sharer.php?title=" + content);
            break;
            case "twitter":
            window.open("https://twitter.com/intent/tweet?text=" + content);
            break;
        }
    }
});
