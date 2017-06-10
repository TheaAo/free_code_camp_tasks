/*
* @Author: Administrator
* @Date:   2017-04-09 10:22:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-12 19:17:11
*/

'use strict';
$(document).ready(function(){
    var result = '';
    var cal = 0;

    function calc(str){
        // 将数组和运算符拆分开来
        var num = str.split(/[%\+\-\*\/]/);
        num = num.map(function(item){
            return Number(item);
        });
        var flag = str.split('').filter(function(item){
            return item.search(/[%\+\-\*\/]/) != -1;
        });
        flag = flag.join('');

        // 检查运算符中有没有二级运算符，有要优先计算
        var re = /[%\*\/]/;
        while(flag.search(re) != -1){
            var index = flag.search(re);
            var operator = flag.match(re);

            switch(operator[0]){
                case '*':
                    num[index] *= num[index+1];
                break;
                case '/':
                    num[index] /= num[index+1];
                break;                    
                case '%':
                    num[index] %= num[index+1];
                break;                    
            }

            num.splice(index+1,1);
            flag = flag.replace(operator[0],'');
        }

        // 然后从左往右进行一级运算
        for(var i = 0; i < flag.length; i++){
            if(flag[i] == '+'){
                num[i+1] += num[i];
            }
            else {
                num[i+1] = num[i] - num[i+1];
            }
        }

        return num.pop();
    }

    $('button').on('click',function(){
        var $this = $(this);
        switch($this.attr('id')){
            case 'clear':
                result = '';
                $('.screen').html(0);
            break;
            case 'delete':
                result = result.slice(0,-1);
                
                if(result == ''){
                    $('.screen').html(0);
                }
                else {
                    $('.screen').html(result);
                }
            break;
            case 'equal':
                //result = calc(result);
                result = eval(result);
                result = result.toString();
                $('.screen').html(result);
                cal = 1;
            break;
            default:
                if($this.hasClass('number')){
                    if(cal == 1){
                        result = '';
                    }
                }
                cal = 0;
                result += $this.html();
                $('.screen').html(result);
        }
    });
});