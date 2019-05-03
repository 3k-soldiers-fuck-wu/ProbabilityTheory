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

$(document).ready(function(){
    var level=new Array(1,2,3,4,5,6,7,8,9,10);
    var names=new Array("Fred","Eric","Bob","Leo","Paul","Sam","Van","Cary","Ben","Alex","Abel","Dats","Gino","Jack","Jame","Luke","Ryan","Simon","Tony");
    for (var i=0;i<10;i++){
        var random=randomNum(0,9);
        var temp=level[i];
        level[i]=level[random];
        level[random]=temp;
    }
    for (var i=0;i<names.length;i++){
        var random=randomNum(0,names.length-1);
        var temp=names[i];
        names[i]=names[random];
        names[random]=temp;
    }
    //随机生成名字和排名
    // console.log($(".ranks").children()[1]);
    var number=0;
    $("#startPlay").click(function(){
        number++;
        $(".ranks").children()[1].innerText=number;
        $(".ranks").children()[1].className="success";
        $(".players").children()[1].innerText=names[0];
        $(".players").children()[1].className="success";
        $(".realrank").children()[1].innerText=level[0];
        // console.log($(".players").children()[1]);
        $("#startPlay").hide();
        $("#playing").show("fast");

    });
    $("#nextPlayer").click(function(){
        number++;
        var relativerank=1;
        for (var i=1;i<=10;i++){
            $(".players").children()[i].className="";
            $(".ranks").children()[i].className="";
        }
        for (var i=1;i<number;i++){
            if (parseInt($(".realrank").children()[i].innerText)>level[number-1]){
                $(".ranks").children()[i].innerText=parseInt($(".ranks").children()[i].innerText)+1;
            }
            else relativerank++;
        }
        $(".players").children()[number].className="success";
        $(".players").children()[number].innerText=names[number-1];
        $(".ranks").children()[number].className="success";
        $(".ranks").children()[number].innerText=relativerank;
        $(".realrank").children()[number].innerText=level[number-1];
        if (number==10){
            $("#nextPlayer").hide();
        }
    });
    $("#confirm").click(function(){
        $("#nextPlayer").hide();
        $("#finish").hide();
        $("#playAgain").show();
        $("#boyDetail")[0].innerText=names[number-1]+"在十个人中是第"+level[number-1]+"优秀的！";
    });
    $("#exitModal").click(function(){
        $(".realrank").show();
    });
    $("#playAgain").click(function(){
        for (var i=0;i<10;i++){
            var random=randomNum(0,9);
            var temp=level[i];
            level[i]=level[random];
            level[random]=temp;
        }
        for (var i=0;i<names.length;i++){
            var random=randomNum(0,names.length-1);
            var temp=names[i];
            names[i]=names[random];
            names[random]=temp;
        }
        number=0;
        $("#playAgain").hide();
        $("#nextPlayer").show();
        $("#finish").show();
        console.log($("#rankTable"));
        $("#rankTable")[0].innerHTML="<tbody>\n" +
            "    <tr class=\"players\">\n" +
            "        <td class=\"tableHead\">人</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>\n" +
            "    </tr>\n" +
            "    <tr class=\"ranks\">\n" +
            "        <td class=\"tableHead\">当前相对排名</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>\n" +
            "    </tr>\n" +
            "    <tr class=\"realrank\" style=\"display:none\">\n" +
            "        <td class=\"tableHead\">真实排名</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>\n" +
            "    </tr>\n" +
            "</tbody>"
        number++;
        $(".ranks").children()[1].innerText=number;
        $(".ranks").children()[1].className="success";
        $(".players").children()[1].innerText=names[0];
        $(".players").children()[1].className="success";
        $(".realrank").children()[1].innerText=level[0];
    });
});