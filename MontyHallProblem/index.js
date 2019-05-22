//随机函数生成器
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
function simulator(times){
    let BobGetCar = 0;
    let AliceGetCar=0;
    for(let i=0;i<times;++i){
        let select=Math.floor(Math.random()*3+1);
        let answer=Math.floor(Math.random()*3+1);
        if(select===answer){
            AliceGetCar+=1;
        }else{
            BobGetCar+=1;
        }
    }
    return [BobGetCar,AliceGetCar];
}

function getTimes(){
    times1s=document.getElementById("opt10");
    times1b=document.getElementById("opt100");
    times1k=document.getElementById("opt1k");
    if(times1s.checked){
        return 10;
    }else if(times1b.checked){
        return 100;
    }else if(times1k.checked){
        return 1000;
    }
    else{
        return false;
    }
}

function getChoice(){
    var bob=document.getElementById("optBoy");
    var alice=document.getElementById("optGirl");
    if(bob.checked){
        return "Bob";
    }else if(alice.checked){
        return "Alice";
    }else{
        return false;
    }
}
var bonusDoor;
var clickDoor;
var hostOpenedDoor;
//互动和详解的互换
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
    $("#startPlay").click(function(){
        $("#startPlay").hide();
        $("#p1").hide("fast");
        $("#p2").show("fast");
        $("#Door1Btn").show();
        $("#Door2Btn").show();
        $("#Door3Btn").show();
		bonusDoor=randomNum(1,3);
    });
    function next(){
        $("#p2").hide();
        $("#p3").show();
        $("#next").show();
        $("#Door1Btn").hide();
        $("#Door2Btn").hide();
        $("#Door3Btn").hide();
		var dtext;
		if (clickDoor==1) dtext="第一扇门";
		if (clickDoor==2) dtext="第二扇门";
		if (clickDoor==3) dtext="第三扇门";
		$("#p3").html("你选择的是"+dtext+"，但是我先不告诉你这扇门后面是什么。");
		do{
            hostOpenedDoor=randomNum(1,3);
        }while((hostOpenedDoor==bonusDoor)||(hostOpenedDoor==clickDoor));
    }
    $("#Door1Btn").click(function(){
		clickDoor=1;
        next();
    });
    $("#Door2Btn").click(function(){
		clickDoor=2;
        next();
    });
    $("#Door3Btn").click(function(){
		clickDoor=3;
        next();
    });
    $("#next").click(function(){
		var ctext;
        if (hostOpenedDoor==1) ctext="第一扇门";
        if (hostOpenedDoor==2) ctext="第二扇门";
        if (hostOpenedDoor==3) ctext="第三扇门";
		$("#"+ctext).attr("src","img/empty.png");
		$("#p4").html("我却要告诉你，"+ctext+"后面是空的！<br>我现在给你一次改变选择的机会，请问你是坚持之前的选择，还是考虑换一扇门呢？");
        $("#next").hide();
        $("#p3").hide();
        $("#p4").show();
        $("#change").show();
        $("#notChange").show();
    });
    function seeResult(){
		var ctext;
        if (clickDoor==1) ctext="第一扇门";
        if (clickDoor==2) ctext="第二扇门";
        if (clickDoor==3) ctext="第三扇门";
		if(clickDoor==bonusDoor){
			$("#"+ctext).attr("src","img/bonus.png");
			$("#p5").html("你选的门后面有宝石！恭喜！");
		}
		else{
			$("#"+ctext).attr("src","img/empty.png");
			$("#p5").html("你选的门后面没有宝石！很遗憾！");
		}
        $("#change").hide();
        $("#notChange").hide();
        $("#playAgain").show();
        $("#p4").hide();
        $("#p5").show();
    }
	function change(){
		for (var i=1;i<=3;i++){
			if ((i!=clickDoor)&&(i!=hostOpenedDoor)){
				clickDoor=i;
				break;
			}
		}
	}
    $("#change").click(function(){
		change();
        seeResult();
    });
    $("#notChange").click(function(){
        seeResult();
    });
	$("#playAgain").click(function(){
		$("#第一扇门").attr("src","img/door.png");
		$("#第二扇门").attr("src","img/door.png");
		$("#第三扇门").attr("src","img/door.png");
		$("#p5").hide();
		$("#p1").show();
		$("#playAgain").hide();
		$("#startPlay").show();
    });
    $("#submit").click(function(){
        var times=getTimes();
        var choice=getChoice();
        if (times==false||choice==false) alert("fuck you");
        else{
            $("#sis").removeClass("col-md-12");
            $("#sis").addClass("col-md-7");
            var result=simulator(times);
            var bob=result[0];
            var alice=result[1];
            var winner="Bob";
            var message="猜对，"
            if(bob<alice){
                winner="Alice";
            }
            if(winner!==choice){
                message="猜错，";
            }
            if(bob==alice){
                message="两人平局"
            }
            else{
                message=message+winner+"胜";
            }
            $("#tBody").append("<tr><th>"+message+"</th>"+
            "<th>"+bob+"</th><th>"+alice+"</th></tr>");
            $("#res").show("fast");
        }
    });
});
