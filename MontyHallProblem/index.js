
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
});
var x=1;
var temp=1;
var bonusDoor;
var clickDoor;
var hostOpenedDoor
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
function change(){
    for (var i=1;i<=3;i++){
        if ((i!=clickDoor)&&(i!=hostOpenedDoor)){
            clickDoor=i;
            break;
        }
    }
}


$(document).ready(function(){
    $(".play .ww").click(function(){
        if (x!=3&&x!=6){
            if (temp==1){
                $(this).children("#w"+x.toString()).hide("slow");
                x=x+1;
                if (x>7){
                    x=2;
                    document.getElementById("第一扇门").src="img/door.png";
                    document.getElementById("第二扇门").src="img/door.png";
                    document.getElementById("第三扇门").src="img/door.png";
                } 
                $(this).children("#w"+x.toString()).show("fast");
            }
            else {
                temp=1;
            }
        }
        if (x==5){
            do{
                hostOpenedDoor=randomNum(1,3);
            }while((hostOpenedDoor==bonusDoor)||(hostOpenedDoor==clickDoor));
            var ctext;
            if (hostOpenedDoor==1) ctext="第一扇门";
            if (hostOpenedDoor==2) ctext="第二扇门";
            if (hostOpenedDoor==3) ctext="第三扇门";
            document.getElementById("w5").innerText="我却要告诉你，"+ctext+"后面是空的！（单击继续）";
            var el=document.getElementById(ctext);
            // console.log(el);
            el.src="img/empty.png";
        }
        if (x==7){
            var ctext;
            if (clickDoor==1) ctext="第一扇门";
            if (clickDoor==2) ctext="第二扇门";
            if (clickDoor==3) ctext="第三扇门";
            if(clickDoor==bonusDoor){
                document.getElementById(ctext).src="img/bonus.png";
                document.getElementById("w7").innerText="你选的门后面有宝石！恭喜！（单击再来一次）";
            }
            else{
                document.getElementById(ctext).src="img/empty.png";
                document.getElementById("w7").innerText="你选的门后面没有宝石！很遗憾！（单击再来一次）";
            }
        }
    });

    $(".play .doors").click(function(){
        if (x==3){
            bonusDoor=randomNum(1,3);
            // console.log(bonusDoor);
            var door=$(this).attr("id");
            if (door=="第一扇门") clickDoor=1;
            if (door=="第二扇门") clickDoor=2;
            if (door=="第三扇门") clickDoor=3;
            // console.log("**"+doorID);

            // console.log(door);
            document.getElementById("w4").innerText="你选择的是"+door+"，但是我先不告诉你这扇门后面是什么。（单击继续）";
            $(".play .ww").children("#w"+x.toString()).hide("slow");
            x=x+1;
            $(".play .ww").children("#w"+x.toString()).show("fast");
        }
    });
    $(".wwbtn").click(function(){
        $(this).parent("#w6").hide("slow");
        x=x+1;
        $(".play .ww").children("#w"+x.toString()).show("fast");
        temp=0;
    })
});
$(function(){
    $(".startSimulate .btn").click(function(){
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
            var message="恭喜你，你猜对了！"
            if(bob<alice){
                winner="Alice";
            }
            if(winner!==choice){
                message="很遗憾，你猜错了。";
            }
            $("#result").prepend("<div class=\"alert alert-success\">"+
                "<button type=\"button\" class=\"close\" aria-hidden=\"true\">"+
                    "<i class=\"nc-icon nc-simple-remove\"></i>"+
                   "</button>"+
                    "<strong>"+message+winner+"胜！</strong>Bob胜利了"+bob+"次，Alice胜利了"+alice+"次。"+
            "</div>")
            // $(this).button('loading').delay(1500).queue(function(){
            //     $(this).button('reset');
            //     $(this).dequeue();
            // });
            $("#res").show("fast");

        }

    });
    $(".nc-simple-remove").click(function(){
        console.log($(this).parents(".alert"));
        $(this).parents(".alert").remove();
    });
    // $("#chooseYes").click(function(){
    //     for (var i=1;i<3;i++){
    //         if ((i!=clickDoor)&&(i!=hostOpenedDoor)){
    //             clickDoor=i;
    //             break;
    //         }
    //     }
    // })
});

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
    times1b=document.getElementById("opt100");
    times1k=document.getElementById("opt1k");
    times1w=document.getElementById("opt1w");
    if(times1b.checked){
        return 100;
    }else if(times1k.checked){
        return 1000;
    }else if(times1w.checked){
        return 10000;
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
