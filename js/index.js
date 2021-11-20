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
// 事件记录集合
var event_id_set = new Set();
// 种族绑定
var race = "";
// 出生的国家
var birth_country = "";

// 页面加载完毕
$(document).ready(function(){
    // $("#prop_page_div").hide();
    // $("#game_page_div").hide();
    // $("#home_page_div").hide();
    // 调用判断当前访问页面是手机端还是移动端
    browserRedirect();
})

// 浏览器css检测匹配
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsMQQ =  sUserAgent.match(/MQQbrowser/i) == "MQQbrowser";
    var bIsWeChat =  sUserAgent.match(/MicroMessenger/i)=="micromessenger";

	if (!(bIsMQQ || bIsWeChat || bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
		//电脑端
		//加载css
		var linkNode = document.createElement("link");
		linkNode.setAttribute("rel","stylesheet");
		linkNode.setAttribute("type","text/css");
		linkNode.setAttribute("href","css/index.css");
		document.head.appendChild(linkNode);
		//加载js
		//var scriptNode = document.createElement("script");
		//scriptNode.setAttribute("type", "text/javascript");
		//scriptNode.setAttribute("src", "../../js/index.min.js");
		//document.head.appendChild(scriptNode);
	} else {
		//手机端
		//加载css
		var oMeta = document.createElement('meta');
		oMeta.name = 'viewport';
		oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
		document.getElementsByTagName('head')[0].appendChild(oMeta);
		var linkNode = document.createElement("link");
		linkNode.setAttribute("rel","stylesheet");
		linkNode.setAttribute("type","text/css");
        linkNode.setAttribute("href","css/index_phone.css");
		//linkNode.setAttribute("href","css/index_phone.css");
		document.head.appendChild(linkNode);
	}
}

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

// 随机加点
function random_set_prop_click() {
    var num1 = get_random_num_by_range(0, 11);
    document.getElementsByClassName("prop_class")[0].innerText = num1;
    var num2 = get_random_num_by_range(0, (11 - num1));
    document.getElementsByClassName("prop_class")[1].innerText = num2;
    document.getElementsByClassName("prop_class")[2].innerText = 10 - num2 - num1;
    total_prop = 0;
    $("#total_prop").text("0");
}

// 设置属性
function set_prop(type, prop) {
    var prop1 = document.getElementsByClassName("prop_class")[0].innerText;
    var prop2 = document.getElementsByClassName("prop_class")[1].innerText;
    var prop3 = document.getElementsByClassName("prop_class")[2].innerText;
    var total_prop = parseInt($("#total_prop").text());

    if(type == '-') {
        if(prop == '体质') {
            if(parseInt(prop1) > 0) {
                total_prop = (total_prop + 1) > 10 ? 10 : (total_prop + 1);
            }
            document.getElementsByClassName("prop_class")[0].innerText = (parseInt(prop1) - 1) >= 0 ? (parseInt(prop1) - 1) : 0;  
        } else if(prop == '幸运') {
            if(parseInt(prop2) > 0) {
                total_prop = (total_prop + 1) > 10 ? 10 : (total_prop + 1);
            }
            document.getElementsByClassName("prop_class")[1].innerText = (parseInt(prop2) - 1) >= 0 ? (parseInt(prop2) - 1) : 0;
        } else if(prop == '智慧') {
            if(parseInt(prop3) > 0) {
                total_prop = (total_prop + 1) > 10 ? 10 : (total_prop + 1);
            }
            document.getElementsByClassName("prop_class")[2].innerText = (parseInt(prop3) - 1) >= 0 ? (parseInt(prop3) - 1) : 0;
        } else {
            alert("???");
        }
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
            $('#auto_btn2').html("播放   2x");

            clearInterval(auto_interval);
            auto_interval = window.setInterval(load_one_event, 1000);
        } else {
            $('#auto_btn').html("自动播放");

            clearInterval(auto_interval);
        }
    } else {
        if(btn_type2 == "播放   2x") {
            $('#auto_btn').html("自动播放");
            $('#auto_btn2').html("停止播放");

            clearInterval(auto_interval);
            auto_interval = window.setInterval(load_one_event, 500);
        } else {
            $('#auto_btn2').html("播放   2x");

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
    // console.log("event_id:" + event_id);
    li_content = li_content + events[event_id].event + '</li>';

    // 插入事件到集合内
    event_id_set.add(event_id);

    // 出生地绑定
    if(age == 0) {
        if(event_id == "11000") race = "yuansu";
        else if(event_id == "12000") race = "qiuqiu";
        else race = "none";
    } else if(age == 1) {
        if(event_id == "11010" || event_id == "11013" || event_id == "11016") birth_country = "mengde";
        else if(event_id == "11011" || event_id == "11014" || event_id == "11017") birth_country = "liyue";
        else if(event_id == "11012" || event_id == "11015" || event_id == "11018") birth_country = "daoqi";
        else birth_country = "none";
    } else if(age == 100) {
        if(event_id == "99999") {
            $('#event_show_ul').append(li_content);
            // 保持滚动条一直处于底部
            document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;

            over_and_regame();
            return;
        }
    }

    $('#event_show_ul').append(li_content);
    // 保持滚动条一直处于底部
    document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;
    age++;  

    // 死亡事件处理
    for(var i = 0; i < die_event.length; i++)
    {
        if(event_id == die_event[i]) {
            over_and_regame();
            return;
        }
    }
}

// 结束触发 重新开始弹窗
function over_and_regame() {
    // 关闭定时器
    clearInterval(auto_interval);
    $('#auto_btn').html("自动播放");
    $('#auto_btn2').html("播放   2x");

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