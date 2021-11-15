// 全局变量
var auto_interval;
var age = 0;
// 初始属性加点
var init_prop1 = 0;
var init_prop2 = 0;
var init_prop3 = 0;
// 实际属性加点
var real_prop1 = 0;
var real_prop2 = 0;
var real_prop3 = 0;

// 页面加载完毕
$(document).ready(function(){
    // $("#prop_page_div").hide();
    // $("#game_page_div").hide();
    // $("#home_page_div").hide();
})

// 显示游戏说明
function show_hide_game_explain_content(type) {
    if(type == "show") $("#game_explain_content").show();
    else $("#game_explain_content").hide();
}

// 开始游戏点击触发
function start_game_click() {
    $("#home_page_div").hide();
    $("#prop_page_div").show();
    $("#game_page_div").hide();
}

// 重新开始点击触发
function restart_game_click() {
    age = 0;
    // 清空事件显示ul的所有li
    $("#event_show_ul").find("li").remove(); 

    $("#home_page_div").show();
    $("#prop_page_div").hide();
    $("#game_page_div").hide();
    $("#zhezhao_div").hide();
    $("#regame_page_div").hide();
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
        return;
    }

    // 页面显示隐藏切换
    $("#home_page_div").hide();
    $("#prop_page_div").hide();
    $("#game_page_div").show();

    // 同步属性至 游戏页实时属性和全局变量
    init_prop1 = parseInt(document.getElementsByClassName("prop_class")[0].innerText);
    init_prop2 = parseInt(document.getElementsByClassName("prop_class")[1].innerText);
    init_prop3 = parseInt(document.getElementsByClassName("prop_class")[2].innerText);
    real_prop1 = init_prop1;
    real_prop2 = init_prop2;
    real_prop3 = init_prop3;
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

// 生成 start<= x <end 的随机数
function get_random_num_by_range(start, end) { 
    return Math.floor(Math.random() * (end - start) + start);
}

// 加载一个事件
function load_one_event() {
    var li_content = "";
    li_content = '<li class="item" >第' + age + '年：';

    // console.log(get_random_num_by_range(1, ages[age].event.length));

    var event_id = ages[age].event[(get_random_num_by_range(1, ages[age].event.length) - 1)];
    li_content = li_content + events[event_id].event + '</li>';

    $('#event_show_ul').append(li_content);
    // 保持滚动条一直处于底部
    document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;
    age++;

    if(event_id == "10000" || event_id == "10001") {
        die_and_regame();
    }
}

// 死亡触发 重新开始弹窗
function die_and_regame() {
    $("#zhezhao_div").show();
    $("#regame_page_div").show();

    var summary;
    summary = "真是精彩的魔生~\n";
    summary = summary + "你一共活了" + (age - 1) + "年\n";
    summary = summary + "你的初始属性为：体质"+ init_prop1 + "，幸运"+init_prop2+"，智慧"+init_prop3+"\n";
    summary = summary + "你的最终属性为：体质"+ real_prop1 + "，幸运"+real_prop2+"，智慧"+real_prop3+"\n";
    summary = summary + "十分感谢您游玩本游戏~期待下一次相遇！";
    $("#summary").text(summary);
}