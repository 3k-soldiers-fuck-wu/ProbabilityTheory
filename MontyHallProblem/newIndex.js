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
});
