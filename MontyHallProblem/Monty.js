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
            var door=$(this).context.id;
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
        $(this).button('loading').delay(1500).queue(function(){
            $(this).button('reset');
            $(this).dequeue();
            $("#result").prepend("<div class=\"alert alert-success alert-dismissable\">"+
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">"+
                    "&times;"+
                   "</button>"+
                    "<strong>Bob胜！</strong>Bob胜利了6790次，Alice胜利了3210次。"+
            "</div>")
        });

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