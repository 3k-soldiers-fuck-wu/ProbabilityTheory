var x=1;
var temp=1;
$(document).ready(function(){
    $(".play .ww").click(function(){
        if (x!=3&&x!=6){
            if (temp==1){
                $(this).children("#w"+x.toString()).hide("slow");
                x=x+1;
                if (x>7) x=2;
                $(this).children("#w"+x.toString()).show("fast");
            }
            else {
                temp=1;
            }
        }
    });
    $(".play .doors").click(function(){
        if (x==3){
            var door=$(this).context.id;
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
            var times=getTimes();
            var result=simulator(times);
            var bob=result[0];
            var alice=result[1];
            var winner="Bob";
            if(bob<alice){
                winner="Alice";
            }
            $("#result").prepend("<div class=\"alert alert-success alert-dismissable\">"+
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">"+
                    "&times;"+
                   "</button>"+
                    "<strong>"+winner+"胜！</strong>Bob胜利了"+bob+"次，Alice胜利了"+alice+"次。"+
            "</div>")
        });

    });
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
}

function getChoice(){
    var bob=document.getElementById("optBoy");
    var alice=ducument.getElementById("optGirl");
    if(bob.checked){
        return "Bob";
    }else if(alice.checked){
        return "Alice";
    }else{
        return null;
    }
}