// var ShooterOne=require("./shooterInfo/shooterOne.js")
// var ShooterTwo=require("./shooterInfo/shooterTwo.js")
// var ShooterThree=require("./shooterInfo/shooterThree.js")
var isStop;
var players=["射手一","射手二","射手三"];
var rates=[50,90,100]
var isDead;
var curPlayer;
var nextPlayer;
var winner;
var liveNum=0;
//随机数生成器
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
// 初始化
function initGame(){
    $("#recordDetail").html("")
    $("#plays").remove();
    $("#interactionPage").prepend(`
    <div class="row" id="plays">
    <div class="col-md-4" id="One">
        <div class="card text-center">
            <div class="card-header ">
                <h5 class="card-title">射手一</h5>
                <p class="card-category">命中率50%</p>
            </div><!--end of card header-->
            <div class="card-body">
                <img class="img-circle" src="./img/shooter.png"/>
            </div>
        </div><!--end of card-->
    </div><!--end of col md 4-->
    
    <div class="col-md-4" id="Two">
        <div class="card text-center">
            <div class="card-header ">
                <h5 class="card-title">射手二</h5>
                <p class="card-category">命中率90%</p>
            </div><!--end of card header-->
            <div class="card-body">
                <img class="img-circle" src="./img/shooter2.png"/>
            </div>
        </div><!--end of card-->
    </div><!--end of col md 4-->
    
    
    <div class="col-md-4" id="Three">
        <div class="card text-center">
            <div class="card-header ">
                <h5 class="card-title">射手三</h5>
                <p class="card-category">命中率100%</p>
            </div><!--end of card header-->
            <div class="card-body">
                <img class="img-circle" src="./img/shooter3.png"/>
            </div><!--end of card body-->
        </div><!--end of card-->
    </div><!--end of col md 4-->
</div>
    `)
    $("#panel").attr("class","col-md-8");
    $("#record").removeAttr("style");
    $("#plot").text(`
        首先由你开枪。
        放空枪表示一定会打偏；
        认真射击表示朝目标射击，命中率为50%；
        请认真思考后再选择。
        `);
    $("#controller button").remove();
    $("#controller").append(`
    <button type="button" class="btn btn-success" onclick="miss()">放空枪</button>
    <button type="button" class="btn btn-danger" onclick="shoot(50,0,1)">认真射击${players[1]}</button>
    <button type="button" class="btn btn-default" onclick="shoot(50,0,2)">认真射击${players[2]}</button>
    `)
    isStop=false;
    isDead=[false,false,false];
    curPlayer=0;
    nextPlayer=1;
    liveNum=3;
    $("#showResult .modal-body").find("p").remove();
}
//放空枪
function miss(){
    $("#recordDetail").append(`
        <li>射手一（你）放空枪。</li>
    `);
    $("#plot").text(`
        你选择了放空枪,无人伤亡。
    `);
    $("#controller").find("button").remove();
    check();
    $("#controller").append(`
        <button type="button" class="btn btn-success" onclick="shoot(${rates[curPlayer]},${curPlayer},${nextPlayer})">下一回合</button>
    `)
}
//射击，改变生死情况
function shoot(rate,first,last){
    var current=players[first];
    var target=players[last];

    if(randomNum(1,100)<=rate){
        isDead[last]=true;
        $("#plot").text(`
            ${current}成功击杀了${target}。
        `)
        $("#recordDetail").append(`
            <li>${current}击杀了${target}。</li>
        `)
    }else{
        $("#plot").text(`
            ${current}瞄准了${target}，但是没能射中。
        `)
        $("#recordDetail").append(`
            <li>${current}没能击杀${target}。</li>
        `)
    }
    check();
    if(isStop){
        $("#plot").append(`
            游戏结束，胜者是${winner}。
        `)
        $("#controller").find("button").remove();
        $("#controller").append(`
            <button type="button" class="btn btn-success" onclick="initGame()">重新开始</button>
        `)
        $("#showResult .modal-body").append(`
            <p>游戏结束，胜利者是${winner}。</p>
        `)
        $("#showResult").modal("show");

    }else{
        $("#plot").append(`
            下一回合是${players[curPlayer]}的回合。
        `)
        $("#controller").find("button").remove();
        if(curPlayer==0){
            $("#controller").append(`
                <button type="button" class="btn btn-success" onclick="miss()">放空枪</button>
            `)
            $("#controller").append(`
                <button type="button" class="btn btn-success" onclick="shoot(${rates[0]},${curPlayer},${nextPlayer})">射击${players[nextPlayer]}</button>
            `)
        }else{
            $("#controller").append(`
                <button type="button" class="btn btn-success" onclick="shoot(${rates[curPlayer]},${curPlayer},${nextPlayer})">下一回合</button>
            `)
        }
    }
}
//局势分析
function check(){
    liveNum=0;
    for(var i=0;i<=2;i++){
        if(isDead[i]){
            liveNum++;
            switch (i){
                case 0:
                    $("#One").remove();
                    break;
                case 1:
                    $("#Two").remove();
                    break;
                case 2:
                    $("#Three").remove();
                    break;
            }
        }else{
            winner=players[i];
        }
    }
    if(liveNum>=2){
        isStop=true;
    }else{
        curPlayer=nextPlayer;
        if(isDead[curPlayer]){
            curPlayer=(curPlayer+1)%3;
        }
        nextPlayer=(curPlayer+1)%3;
        if(isDead[nextPlayer]){
            nextPlayer=(nextPlayer+1)%3;
        }
        if(curPlayer==2 && nextPlayer==0 && !isDead[1]){
            nextPlayer=1;
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
    $("#start").on("click",function(){initGame()});    
});

