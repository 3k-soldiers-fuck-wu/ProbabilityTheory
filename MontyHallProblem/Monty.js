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
            $("#result").prepend("<div class=\"alert alert-success alert-dismissable\">"+
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">"+
                    "&times;"+
                   "</button>"+
                    "<strong>Bob胜！</strong>Bob胜利了6790次，Alice胜利了3210次。"+
            "</div>")
        });

    });
});