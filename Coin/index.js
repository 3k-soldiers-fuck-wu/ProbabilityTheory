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
var result=0;
var count=0;
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
    $("#seeResult").click(function(){
        $("#qwerty").hide();
        $("#seeResult").hide();
        $("#result").show("slow");
    });
    $("#toPlay").click(function(){
        $("#play").show("fast");
    });
    var chart0=$("#example");
    var exChart=new Chart(chart0,{
        type: 'line',
        data:{
            labels:[0,1,2,3,4,5,6,7,8,9,10],
            datasets:[{
                data:[0,1,0,1,0,-1,0,1,0,1,2],
                fill: false,
                borderColor: '#51CACF',
                backgroundColor: 'transparent',
                pointBorderColor: '#51CACF',
                pointRadius: 2,
                pointHoverRadius: 2,
                pointBorderWidth: 4
            }]
        }
    });


    var chart1 = $("#chart1");
    var barChart = new Chart(chart1, {
        type: 'line',
        data: {
            labels: [0],
            datasets: [{
                // label:'result',
                data: [0],
                fill: false,
                borderColor: '#51CACF',
                backgroundColor: 'transparent',
                pointBorderColor: '#51CACF',
                pointRadius: 2,
                pointHoverRadius: 2,
                pointBorderWidth: 4
            }]
        }
    });
    function addData(){
        count++;
        barChart.data.labels.push(count);
        var temp=randomNum(0,1);
        if (temp==0) temp=-1;
        result=result+temp;
        barChart.data.datasets.forEach((dataset) => {
            dataset.data.push(result);
        });
        barChart.update();
    }
    function clearData(){
        for (var i=0;i<count;i++){
            barChart.data.labels.pop();
            barChart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        }
        barChart.update();
        result=0;
        count=0;
    }
    $("#addOneData").click(function(){
        addData();
    });
    $("#addTenData").click(function(){
        for (var i=0;i<10;i++){
            addData();
        }
    });
    $("#addHundredData").click(function(){
        for (var i=0;i<100;i++){
            addData();
        }
    });
    $("#clearData").click(function(){
        clearData();
    });
});