// 全局变量
var auto_interval;
var age = 0;
var real_prop1 = 0;
var real_prop2 = 0;
var real_prop3 = 0;

// 页面加载完毕
$(document).ready(function(){
    // $("#prop_page_div").hide();
    // $("#game_page_div").hide();
    $("#home_page_div").hide();
})

// 开始游戏点击触发
function start_game_click() {
    $("#home_page_div").hide();
    $("#prop_page_div").show();
    $("#game_page_div").hide();
}

// 重新开始点击触发
function restart_game_click() {
    $("#home_page_div").show();
    $("#prop_page_div").hide();
    $("#game_page_div").hide();
}

// 设置属性
function set_prop(type, prop) {
    var prop1 = document.getElementsByClassName("prop_class")[0].innerText;
    var prop2 = document.getElementsByClassName("prop_class")[1].innerText;
    var prop3 = document.getElementsByClassName("prop_class")[2].innerText;
    var total_prop = parseInt($("#total_prop").text());

    if(type == '-') {
        if(prop == '体质') {
            document.getElementsByClassName("prop_class")[0].innerText = (parseInt(prop1) - 1) >= 0 ? (parseInt(prop1) - 1) : 0;  
        } else if(prop == '幸运') {
            document.getElementsByClassName("prop_class")[1].innerText = (parseInt(prop2) - 1) >= 0 ? (parseInt(prop2) - 1) : 0;
        } else if(prop == '智慧') {
            document.getElementsByClassName("prop_class")[2].innerText = (parseInt(prop3) - 1) >= 0 ? (parseInt(prop3) - 1) : 0;
        } else {
            alert("???");
        }
        total_prop = (total_prop + 1) > 10 ? 10 : (total_prop + 1);
    } else if(type == '+') {
        if(total_prop <= 0) return;

        if(prop == '体质') {
            document.getElementsByClassName("prop_class")[0].innerText = (parseInt(prop1) + 1) >= 0 ? (parseInt(prop1) + 1) : 0;  
        } else if(prop == '幸运') {
            document.getElementsByClassName("prop_class")[1].innerText = (parseInt(prop2) + 1) >= 0 ? (parseInt(prop2) + 1) : 0;  
        } else if(prop == '智慧') {
            document.getElementsByClassName("prop_class")[2].innerText = (parseInt(prop3) + 1) >= 0 ? (parseInt(prop3) + 1) : 0;  
        } else {
            alert("???");
        }

        total_prop--;
    } else {

    }

    $("#total_prop").text(total_prop);
}

// 开始新的人生 点击触发
function start_new_life_click() {
    // 判断加点是否完成
    if(parseInt($("#total_prop").text()) != 0) {
        alert("请完成所有的属性加点哦~");
    }

    // 页面显示隐藏切换
    $("#home_page_div").hide();
    $("#prop_page_div").hide();
    $("#game_page_div").show();

    // 同步属性至 游戏页实时属性和全局变量
    real_prop1 = parseInt(document.getElementsByClassName("prop_class")[0].innerText);
    real_prop2 = parseInt(document.getElementsByClassName("prop_class")[1].innerText);
    real_prop3 = parseInt(document.getElementsByClassName("prop_class")[2].innerText);
    document.getElementsByClassName("real_prop_class")[0].innerText = real_prop1;
    document.getElementsByClassName("real_prop_class")[1].innerText = real_prop2;
    document.getElementsByClassName("real_prop_class")[2].innerText = real_prop3;
}

// 自动播放按钮 点击触发
function auto_play(type) {
    var btn_type = $('#auto_btn').html();
    var btn_type2 = $('#auto_btn2').html();

    if(type == "1") {
        // console.log(btn_type);
        if(btn_type == "自动播放") {
            $('#auto_btn').html("停止播放");
            $('#auto_btn2').html("播放2x");

            clearInterval(auto_interval);
            auto_interval = window.setInterval(load_one_event, 1000);
        } else {
            $('#auto_btn').html("自动播放");

            clearInterval(auto_interval);
        }
    } else {
        if(btn_type2 == "播放2x") {
            $('#auto_btn').html("自动播放");
            $('#auto_btn2').html("停止播放");

            clearInterval(auto_interval);
            auto_interval = window.setInterval(load_one_event, 500);
        } else {
            $('#auto_btn2').html("播放2x");

            clearInterval(auto_interval);
        }
    }
    
}

// 加载一个事件
function load_one_event() {
    var li_content = "";
    var random_num = Math.random() >= 0.5 ? 1 : 0;
    li_content = '<li class="item" >第' + age + '年：';

    if(age == 0) {
        if(random_num == 0) {
            li_content = li_content + data["10001"].event;
        } else {
            li_content = li_content + data["10002"].event;
        }
    }
    li_content = li_content + '</li>';

    $('#event_show_ul').append(li_content);
    // 保持滚动条一直处于底部
    document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;
    age++;
}