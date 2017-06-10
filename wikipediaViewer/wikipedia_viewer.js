/*
* @Author: Administrator
* @Date:   2017-02-21 16:52:49
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-21 20:17:27
*/

"use strict";

/*闭包闭包*/
/*
* 通过匿名函数的自调用实现页面语言的初始化
* 并利用表达式定义函数使语言状态变量成为其私有变量
*/
var language = (function(){

    /* 初始化页面语言为中文 */
    var lang = "zh";

    /*定义语言切换函数*/
    return function(l) {
        switch(l) {

        /* 如果参数为 "zh" 界面为中文*/
        case "zh":
            $("h1").html("wikipedia" + "<small>维基百科</small>");
            $("input[name='submit_btn']").attr("value","Wiki 搜索");
            $("input[name='random_btn']").attr("value","手气不错");
        break;

        /* 如果参数为 "en" 界面为英文*/
        case "en":
            $("h1").html("wikipedia");
            $("input[name='submit_btn']").attr("value","Wiki Search");
            $("input[name='random_btn']").attr("value","Feeling Lucky");
        break;

        /* 如果无参数，则执行页面语言查询功能*/
        default:
        return lang;
        }
        lang = l;

    }
})();

/* 随机打开一条词条 */
function wikiRandom() {

    /* 根据查询到的页面语言在不同语言的数据库中查找词条 */
    window.open("http://" + language() + ".wikipedia.org/wiki/Special:Random");
}

/* 展示搜索结果 */
function wikiSearch() {
    /* 获取搜索关键词 */
    var keywords = document.forms["search_box"]["keywords"].value;

    /* 判断搜索关键词是否为空 */
    // 如果不为空，则进行查找
    if (keywords != undefined && keywords != null && keywords != "") {

        /* 根据当前页面语言调用不同的 API 接口进行查询*/
        var url = "https://" + language() + ".wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
        
        addJSTag(url + keywords + "&callback=showResult");
    }

    // 如果为空，则跳转到 wiki 首页
    else {
      window.open("https://" + language() + ".wikipedia.org/","_self");
    }
}


/*利用 JSONP 解决 AJAX 不能实现跨域请求的问题*/
function addJSTag(src) {
    var script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
}
function showResult(result){
    var items = result.query;
    $(".container").animate({marginTop: 0},500,function(){
        $("a").remove();
        if (items != undefined && items != null && items.hasOwnProperty("pages")) {
            items = items.pages;
            var x;
            for(x in items) {
                // 在页面创建条目 
                $("<a></a>").attr("href","https://" + language() + ".wikipedia.org/?curid=" + items[x].pageid)
                            .html("<div><h2>" + items[x].title + "</h2><p>" + items[x].extract +"</p></div><br>")
                            .addClass("item")
                            .appendTo(".container");
            }
            $("a").attr("target","_blank");
        }
        else {
            switch(language()) {
                case "zh":
                $("<a></a>").html("<div>抱歉！什么都没找到呢。</div>")
                                .addClass("item")
                                .appendTo(".container");
                break;
                case "en":
                $("<a></a>").html("<div><p>Ohooooops!Nothing can be find.</p></div>")
                                .addClass("item")
                                .appendTo(".container");
                break;
            }
        }
    });
}

/* 监听回车事件 */
$("body").keydown(function(event){
    if (event.keyCode == 13) {
        wikiSearch();
    }
});


