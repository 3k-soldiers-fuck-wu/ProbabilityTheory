function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

var number = 0;
var level = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
var names = new Array("Fred", "Eric", "Bob", "Leo", "Paul", "Sam", "Van", "Cary", "Ben", "Alex", "Abel", "Dats", "Gino", "Jack", "Jame", "Luke", "Ryan", "Simon", "Tony");

function sort() {
    for (var i = 0; i < 10; i++) {
        var random = randomNum(0, 9);
        var temp = level[i];
        level[i] = level[random];
        level[random] = temp;
    }
    for (var i = 0; i < names.length; i++) {
        var random = randomNum(0, names.length - 1);
        var temp = names[i];
        names[i] = names[random];
        names[random] = temp;
    }
}

function startPlay() {
    $("#rankBody").append("<tr class=\"successgreen\">\n" +
        "<th>" + names[number] + "</th>\n" +
        "<th class=\"text-center\">" + "1" + "</th>\n" +
        "<th class=\"realRank text-center\">" + level[number] + "</th>\n" +
        "</tr>");
    number++;
    $("#startPlay").hide();
    $("#playing").show("fast");
}

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
    sort();
    //随机生成名字和排名
    $("#startPlay").click(function () {
        startPlay();
        $("#findHim").removeClass("col-md-12");
        $("#findHim").addClass("col-md-8");
        $("#resultTable").show("fast");
        $("#introduction").hide("fast");
        $("#seeIntro").show("fast");
        $("#play").show("fast");
    });
    $("#seeIntro").click(function () {
        $("#introduction").toggle("fast");
    });
    $("#nextPlayer").click(function () {
        var relativeRank = 1;
        for (var i = 0; i < number; i++) {
            // console.log($("#rankBody").children());
            // console.log($("#rankBody").children().eq(i));
            if (level[i] > level[number]) {
                $("#rankBody").children().eq(i).children()[1].innerText = parseInt($("#rankBody").children().eq(i).children()[1].innerText) + 1;
            }
            else relativeRank++;
        }
        $("#rankBody").children().eq(number - 1).removeClass("successgreen");
        $("#rankBody").append("<tr class=\"rankLine successgreen\" style=\"display:none\">\n" +
            "<th>" + names[number] + "</th>\n" +
            "<th class=\"text-center\">" + relativeRank + "</th>\n" +
            "<th class=\"realRank  text-center\">" + level[number] + "</th>\n" +
            "</tr>");
        $(".rankLine").show("fast");
        number++;
        if (number == 10) {
            $("#nextPlayer").hide();
        }
    });
    $("#playAgain").click(function () {
        sort();
        number = 0;
        $("#playAgain").hide();
        $("#nextPlayer").show();
        $("#finish").show();
        // console.log($("#rankTable"));
        $("#rankBody").empty();
        startPlay();
    });
});

function confirmAgain() {
    var r = confirm("确定要选这个人吗？")
    if (r == true) {
        alert(names[number - 1] + "在10个人中是第" + level[number - 1] + "优秀的。\n点击查看详细信息");
        $(".realRank").show("fast");
        $("#nextPlayer").hide();
        $("#finish").hide();
        $("#playAgain").show();
    }
}