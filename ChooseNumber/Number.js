//全局变量
var x=1;
//生成随机数
function randomNum(minNum,maxNum){
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
            break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
        default: 
            return 0; 
        break; 
    } 
} 

//用户选择交互
$(document).ready(function(){
    var $panelBody=$("#userPanel")
    var $p1=$panelBody.children("#w1");
    var $p2=$panelBody.children("#w2");
    var numTwo=randomNum(-200,200);
    var numOne=randomNum(-200,200);
    //面板中well隐藏与显示
    $panelBody.click(function(){       
        if(x===1){
            $p1.hide("slow");
            x=x+1;
            $p2.show("fast");
            $("#num1").append('<h1>第一个数字是'+numOne+'</h1>');
        }
        else if(x==3){
            x=x+1;
        }
        else if(x===4){
            $panelBody.children("#w3").hide("slow");
            $p1.show("fast")
            numOne=randomNum(-200,200);
            numTwo=randomNum(-200,200);
            x=1;
            console.log($panelBody.children("h1"));
            $("#num1").html("");
            $("#num2").html("");
        }
    })
    //生成数字和判断对错
    $("#save").click(function(){
        x=x+1;
        $("#num2").append("第二个数字是"+numTwo);
        $p2.hide("slow");
        var isBig=document.getElementById("big");
        var isSmall=document.getElementById("small");
        if(isBig.checked){
            if(numOne<numTwo){
                $panelBody.append("<p id='w3'>恭喜你，你猜对了！（单击此处重新开始）</p>");
            }else{
                $panelBody.append("<p id='w3'>很遗憾，你猜错了。（单击此处重新开始）</p>");
            }
        }else if(isSmall.checked){
            if(numOne>numTwo){
                $panelBody.append("<p id='w3'>恭喜你，你猜对了！（单击此处重新开始）</p>");
            }else{
                $panelBody.append("<p id='w3'>很遗憾，你猜错了。（单击此处重新开始）</p>");
            }
        }else{
            alert("请选择！")
        }
    });
})
//讲解的代码
//有bug
$(function(){
    $("#saveUser").click(function(){
        $("#answer").remove();
        var numOne=$("#numOne").val();
        var numTwo=$("#numTwo").val();
        $("#computer").append("<div id=\"answer\"></div>")
        if(numOne<0.5){
            $("#answer").append('<h3>基准数大于第一个数，所以电脑的答案是<h1>小</h1></h3>');
            if(numOne<numTwo){
                $("#answer").append('<h3>很显然，电脑答对了</h3>');
            }else{
                $("#answer").append('<h3>很显然，电脑答错了</h3>');
            }
        }else{
            $("#answer").append('<h3>基准数小于第一个数，所以电脑的答案是<h1>大</h1></h3>');
            if(numOne<numTwo){
                $("#answer").append('<h3>很显然，电脑答错了</h3>');
            }else{
                $("#answer").append('<h3>很显然，电脑答对了</h3>');
            }
        }
    })

})
