var firstNum;
var secondNum;
var score=0;
var round=0;
/**
 * 随机数生成器
 * @param {int} minNum 
 * @param {int} maxNum 
 */
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

//产生两个不同的数字
(()=>{
    firstNum=randomNum(-500,500);
    do{secondNum=randomNum(-500,500);}while(secondNum===firstNum)//产生不同的数字
})();

//初始化函数
//初始化两个数字，同时生成按钮与文案
function initGame(){
    if(round>=3){
        check();
    }
    firstNum=randomNum(-500,500);
    do{secondNum=randomNum(-500,500);}while(secondNum===firstNum)//产生不同的数字
    $("#userCardBody").html(`
    <h6 id="num1"></h6>
    <h6 id="num2"></h6>
    <div id="w1">
        <p>电脑将会随机生成两个整数（包含负数）,你将知道其中一个数字，请猜测另一个整数比已知数字大还是小。</p>
        <button type="button" class="btn btn-success" onclick="change()">生成数字</button>
    </div>
    `);
}
//转换文案设置
function change(){
    round++;
    $("#num1").append(`
    第一个数字是：${firstNum}
    `);
    $("#w1").html(`
    <p>已生成数字，请猜测另一个数字比它大还是小。</p>
    <button type="button" class="btn btn-success" onclick="showAws(1)">大</button>
    <button type="button" class="btn btn-success" onclick="showAws(0)">小</button>
    `)
}
//显示答案
function showAws(num){
    $("#num2").append(`
    第二个数字是${secondNum}
    `);
    var isRight=((num==1&&secondNum>firstNum) || (num==0 && secondNum<firstNum));
    var message=isRight?"恭喜你，你答对了。":"很遗憾，你猜错了。";
    message+=secondNum<firstNum?"第二个数字小于第一个数字。":"第二个数字大于第一个数字。";
    var button=(score>=3)||(round-score>=3)?`
    <button type="button" class="btn btn-success" onclick="initGame()">查看结果</button>
    `:`<button type="button" class="btn btn-success" onclick="initGame()">下一局</button>`;
    $("#w1").html(`
        <p>${message}</p>
        ${button}
    `);
    var record=isRight?"胜":"败";
    var mark=isRight?1:0;
    $("#record").append(`
        <tr>
            <th>${round}</th>
            <th>${record}</th>
            <th>${mark}</th>
        </tr>
    `);
    $("#round").html(`
        游戏次数：${round}
    `);
    score+=mark;
    $("#score").html(`
        ${score}
    `);
}
//检查结束游戏并还原比赛记录
function check(){
        if(score>=3){
            alert(`
                游戏结束。恭喜你，赢得本局游戏。
            `);
            round=0;
            score=0;
            $("#record").find("tr").remove();
            $("#round").html(`
            游戏次数：${round}
            `);
            $("#score").html(`
            ${score}
            `);
        }else if(round-score>=3){
            alert(`
                游戏结束。很遗憾，你输了。
            `);
            round=0;
            score=0;
            $("#record").find("tr").remove();
            $("#round").html(`
            游戏次数：${round}
            `);
            $("#score").html(`
            ${score}
            `);
        }
}

//人机对抗查看答案
function checkAws(numOne,numTwo){
    var base=randomNum(-500,500)+0.5
    if(numOne<base){
        $("#answer").html('<p style=\"display:inline\">电脑的答案是第一个数</p><h6 style=\"display:inline\">小于</h6><p style=\"display:inline\">第二个数</p>');
        if(numOne<numTwo){
            $("#answer").append('<h6>很显然，电脑答对了</h6>');
        }else{
            $("#answer").append('<h6>很显然，电脑答错了</h6>');
        }
    }else{
        $("#answer").html('<p style=\"display:inline\">电脑的答案是第一个数</p><h6 style\="display:inline\">大于</h6><p style=\"display:inline\">第二个数</p>');
        if(numOne<numTwo){
            $("#answer").append('<h6>很显然，电脑答错了</h6>');
        }else{
            $("#answer").append('<h6>很显然，电脑答对了</h6>');
        }
    }
}
$(document).ready(function () {
    // 这个是更好看的滚动条，但是有时候不好使不知道为什么
    var is_mobile = ((/Mobile|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false);
    if (!is_mobile) {
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
    }

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
    //电脑猜人
    $("#saveUser").click(function(){
        $("#answer").hide("slow");
        var numOne=parseInt($("#numOne").val());
        var numTwo=parseInt($("#numTwo").val());
        if(numOne!==numTwo && Number.isInteger(numOne) && Number.isInteger(numTwo)){
            checkAws(numOne,numTwo);
            $("#answer").show("fast");
            $("#seeStrategy").show("fast");
        }else{
            alert("两个数需要不同，且必须为整数。请重新输入。");
        }
    });
    $("#seeStrategy").click(function(){
        $("#computerCard").removeClass("col-md-12");
        $("#computerCard").addClass("col-md-7");
        $("#strategyCard").show("fast");
    });
})