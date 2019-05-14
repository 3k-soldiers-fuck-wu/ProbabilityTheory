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

$(document).ready(function () {
    // 这个是更好看的滚动条，但是有时候不好使不知道为什么
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

    // 以下是上方切换互动页和讲解页的标签功能
    $("#interactionTab").click(function () {
        $("#navTabs").find("li").removeClass("active");
        $("#navTabs").find("span").remove();
        $("#interactionTab").addClass("active");
        $("#interactionTab").find("a").append("<span class=\"sr-only\">(current)</span>")
        $("#explanationPage").hide("fast");
        $("#interactionPage").show("slow");
    });
    $("#explanationTab").click(function () {
        $("#navTabs").find("li").removeClass("active");
        $("#navTabs").find("span").remove();
        $("#explanationTab").addClass("active");
        $("#explanationTab").find("a").append("<span class=\"sr-only\">(current)</span>")
        $("#interactionPage").hide("fast");
        $("#explanationPage").show("slow");
    });
    // function clickTab(e){
    //     $("#navTabs").children("li").className="nav-item";
    //     $("#navTabs").find("span").remove();
    //     e.className="nav-item active";
    //     e.find("a").append("<span class=\"sr-only\">(current)</span>")
    // }
    // var $panelBody=$("#userPanel")
    // var $p1=$panelBody.children("#w1");
    // var $p2=$panelBody.children("#w2");
    var numTwo=randomNum(-200,200);
    var numOne=randomNum(-200,200);
    //面板中well隐藏与显示
    $("#userCardBody").click(function(){       
        if(x===1){
            $("#w1").hide("slow");
            x=x+1;
            $("#w2").show("fast");
            $("#num1").append('<h5>第一个数字是'+numOne+'</h5>');
        }
        else if(x==3){
            x=x+1;
        }
        else if(x===4){
            $("#userCardBody").children("#w3").hide("slow");
            $("#w1").show("fast")
            numOne=randomNum(-200,200);
            numTwo=randomNum(-200,200);
            x=1;
            $("#num1").children("h5").remove();
            $("#num2").children("h5").remove();
        }
    });
    var choice;
    $("#big").click(function(){
        choice=1;
    });
    $("#small").click(function(){
        choice=2;
    });
    $(".submitChoice").click(function(){
        x=x+1;
        $("#num2").append("<h5>第二个数字是"+numTwo+"</h5>");
        $("#w2").hide("slow");
        if(choice==1){
            if(numOne<numTwo){
                $("#userCardBody").append("<p id='w3'>恭喜你，你猜对了！（单击此处重新开始）</p>");
            }else{
                $("#userCardBody").append("<p id='w3'>很遗憾，你猜错了。（单击此处重新开始）</p>");
            }
        }
        else if(choice==2){
            if(numOne>numTwo){
                $("#userCardBody").append("<p id='w3'>恭喜你，你猜对了！（单击此处重新开始）</p>");
            }else{
                $("#userCardBody").append("<p id='w3'>很遗憾，你猜错了。（单击此处重新开始）</p>");
            }
        }
    });
    $("#saveUser").click(function(){
        $("#answer").remove();
        var numOne=parseInt($("#numOne").val());
        var numTwo=parseInt($("#numTwo").val());
        $("#computer").append("<div id=\"answer\"></div>")
        if(numOne<0.5){
            $("#answer").append('<h5 style=\"display:inline\">基准数大于第一个数，所以电脑的答案是第一个数</h5><h3 style=\"display:inline\">小于</h3><h5 style=\"display:inline\">第二个数</h5>');
            if(numOne<numTwo){
                $("#answer").append('<h5>很显然，电脑答对了</h5>');
            }else{
                $("#answer").append('<h5>很显然，电脑答错了</h5>');
            }
        }else{
            $("#answer").append('<h5 style=\"display:inline\">基准数小于第一个数，所以电脑的答案是第一个数</h5><h3 style\="display:inline\">大于</h3><h5 style=\"display:inline\">第二个数</h5>');
            if(numOne<numTwo){
                $("#answer").append('<h5>很显然，电脑答错了</h5>');
            }else{
                $("#answer").append('<h5>很显然，电脑答对了</h5>');
            }
        }
        $("#seeStrategy").show("fast");
    });
    $("#seeStrategy").click(function(){
        $("#computerCard").removeClass("col-md-12");
        $("#computerCard").addClass("col-md-7");
        $("#strategyCard").show("fast");
    });
});