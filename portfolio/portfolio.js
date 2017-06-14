/*
* @Author: Administrator
* @Date:   2017-03-20 14:49:53
* @Last Modified by:   Thea Ao
* @Last Modified time: 2017-06-14 19:43:37
*/

function initPage(){

    /*页面初始化*/
    var index = 0;
    var canScroll = true;
    resize();
    $(window).scrollTop(0);

    var position = [];
    for(var i = 0; i < 4; i++){
        position.push($('section').eq(i).offset());
    }
    console.log(position);
    scrollPage();

    /*事件处理函数*/
    // 导航栏点击事件
    var navClick = function(){
        index = $(this).index();
        scrollPage();
    };
    // 鼠标滚轮事件
    // firefox 为DOMMouseScroll,滚动值储存在event.detail中，滚动方向正值为下负值为上
    // 其他浏览器为 mousewheel, 滚动值储存在event.wheelDelta中，滚动方向正值为上负值为下
    var mouseWheel = function(event){
        event.preventDefault();
        // 判断滚动方向, 统一为正值上负值下
        var scrollDir = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        if(canScroll){
            if(scrollDir > 0) {
                if (index > 0) {
                    prevPage();
                }                
            }else{
                if (index < $('section').length - 1) {
                    nextPage();
                }
            }
        }
    };
    // 键盘事件
    var keyUp = function(event){
        if (event.keyCode == 37 || event.keyCode == 38) {
            prevPage();
        }else if(event.keyCode == 39 || 40){
            nextPage();
        }
    };
    // transitionend 事件
    var end = function(){
        canScroll = true;
    }


    /*事件绑定*/
    $('nav').on('click','li', navClick);
    $(document).on('mousewheel DOMMouseScroll',mouseWheel);
    $(document).on('keyup',keyUp);
    $('main').on('transitionend',end);
    $('.nextpage').on('click',nextPage);

    function prevPage() {
        if (index > 0) {
            index--;
        }
        scrollPage();
    }
    function nextPage() {
        if (index < $('nav li').length - 1) {
            index++;
        }
        scrollPage();
    }
    function scrollPage(){
        var pos = position[index];
        canScroll = false;
        $('main').add('footer').css('transition','transform 500ms');
        $('main').add('footer').css('transform','translateY(-' + pos.top + 'px)');
        $('nav li').eq(index).addClass('checked').siblings().removeClass('checked');  
    }
}

/*调整section页面高度*/
function resize(){
    var viewportHeight = $(window).height();
    $('section').each(function(){
        var me = $(this);
        if (me.innerHeight() < viewportHeight) {
            me.innerHeight(viewportHeight);
        }
    });
}