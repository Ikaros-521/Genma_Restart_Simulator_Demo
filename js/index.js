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
// 元素
var main_element = "";
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
    var bIsMQQ =  sUserAgent.match(/mqqbrowser/i) == "mqqbrowser";
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
    // 解除屏蔽
    $('#event_show_div').css("pointer-events","auto");
    $('#auto_btn_div').css("pointer-events","auto");
    $("#home_page_div").hide();
    $("#prop_page_div").show();
    $("#game_page_div").hide();
}

// 事件回顾
function event_review() {
    // 将div内的所有标签的点击事件，input输入框的输入获焦等给屏蔽
    $('#event_show_div').css("pointer-events","none");
    $('#auto_btn_div').css("pointer-events","none");
    $("#zhezhao_div").hide();
    $("#regame_page_div").hide();
}

// 重新开始点击触发
function restart_game_click() {
    // 解除屏蔽
    $('#event_show_div').css("pointer-events","auto");
    $('#auto_btn_div').css("pointer-events","auto");
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

    // 事件集合清空
    event_id_set.clear();

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

// 显示隐藏tip_div 提示框 str为显示的字符串,time为显示时长
function show_hide_tip(str, time) {
    $("#tip_div").show(1000);
    $("#tip_span").text(str);
    setTimeout(function(){$("#tip_div").hide(1000);}, time);
}

// 加载一个事件
function load_one_event() {
    var li_content = "";
    li_content = '<li class="item" >第' + age + '月：';

    // console.log(get_random_num_by_range(1, ages[age].event.length));

    var event_id, the_unit;
    // 摇取event_id
    while(1) {
        // 根据ages里不同月龄的event组内摇取event_id
        event_id = ages[age].event[(get_random_num_by_range(1, ages[age].event.length) - 1)];
        // console.log("event_id:" + event_id);
        if(age < 1 || age > 99) break;

        // 区分种族
        the_race = parseInt(parseInt(event_id) / 10000);
        // 区分事件线
        the_unit = parseInt(event_id) % 10;

        // console.log("the_race:" + the_race + ", the_unit:" + the_unit);
        
        // 判断生成的种族线是否匹配
        if(race == "yuansu" && the_race == 11) {
            // 5月后元素线主线固定
            if(age > 5) {
                // 8默认为随机线，9为死亡线
                if(main_element == the_unit || the_unit == 8 || the_unit == 9)
                    break;
            } else {
                break;
            }
        } else if(race == "qiuqiu" && the_race == 12) {
            // 20月后元素线主线固定，40月特殊风属性觉醒
            if(age > 20) {
                // 9为死亡线
                if(main_element == the_unit || the_unit == 8 || the_unit == 9)
                    break;
            } else {
                break;
            }
        }
    }
    
    // li内容拼接
    li_content = li_content + events[event_id].event + '</li>';
    // 插入事件到集合内
    event_id_set.add(event_id);

    // 如果存在 props属性 变更
    if(events[event_id].props) {
        real_prop1 += events[event_id].props[0];
        real_prop2 += events[event_id].props[1];
        real_prop3 += events[event_id].props[2];
        document.getElementsByClassName("real_prop_class")[0].innerText = real_prop1;
        document.getElementsByClassName("real_prop_class")[1].innerText = real_prop2;
        document.getElementsByClassName("real_prop_class")[2].innerText = real_prop3;
    }

    // 种族、出生地、元素绑定。预览图展示
    if(age == 0) {
        console.log("age:0, event_id:" + event_id);
        if(["110000", "110001", "110002", "110003", "110004", "110005", "110006"].indexOf(event_id.toString()) > -1) {
            race = "yuansu";
            $("#header_img").attr("src", "./img/史莱姆凝液.png");
        } else if(["120000", "120001", "120002", "120003", "120004", "120005", "120006"].indexOf(event_id.toString()) > -1) {
            race = "qiuqiu";
            $("#header_img").attr("src", "./img/丘丘人.png");
        } else race = "none";
    } else if(age == 1) {
        if(["110100", "110103", "110106", "120100", "120103", "120106"].indexOf(event_id) > -1) birth_country = "mengde";
        else if(["110101", "110104", "110107", "120101", "120104", "120107"].indexOf(event_id) > -1) birth_country = "liyue";
        else if(["110102", "110105", "110108", "120102", "120105", "120108"].indexOf(event_id) > -1) birth_country = "daoqi";
        else birth_country = "none";
    } else if(age == 5) {
        if(race == "yuansu") {
            // 5岁 元素线的元素喜爱事件
            if(event_id == "110500") main_element = 0;
            else if(event_id == "110501") main_element = 1;
            else if(event_id == "110502") main_element = 2;
            else if(event_id == "110503") main_element = 3;
            else if(event_id == "110504") main_element = 4;
            else if(event_id == "110505") main_element = 5;
            else if(event_id == "110506") main_element = 6;
            else if(event_id == "110507") main_element = 7;
            else main_element = 0;
        }
    } else if(age == 10) {
        console.log("race:" + race + ", main_element:" + main_element);
        if(race == "yuansu") {
            var img_path = ["./img/火史莱姆.png", "./img/水史莱姆.png", "./img/风史莱姆.png", "./img/雷史莱姆.png", 
                "./img/草史莱姆.png", "./img/冰史莱姆.png", "./img/岩史莱姆.png", "./img/无属性史莱姆.png"];
            $("#header_img").attr("src", img_path[main_element]);
        } else if(race == "qiuqiu") {
            var img_path = ["./img/打手丘丘人.png", "./img/木盾丘丘人.png", "./img/射手丘丘人.png", "./img/爆弹丘丘人.png", 
                "./img/打手丘丘人.png", "./img/木盾丘丘人.png", "./img/射手丘丘人.png", "./img/爆弹丘丘人.png",
                "./img/丘丘人.png", "./img/丘丘人.png"];
            var index = ["121000", "121001", "121002", "121003", "121004", "121005", "121006", "121007", "121008", "121009"].indexOf(event_id.toString());
            $("#header_img").attr("src", img_path[index]);
        } else {}
    } else if(age == 20) {
        if(race == "yuansu") {
            var img_path = ["./img/大型火史莱姆.png", "./img/大型水史莱姆.png", "./img/大型风史莱姆.png", "./img/大型雷史莱姆.png", 
                "./img/大型草史莱姆.png", "./img/大型冰史莱姆.png", "./img/大型岩史莱姆.png", "./img/大型无属性史莱姆.png"];
            $("#header_img").attr("src", img_path[main_element]);
        }  else if(race == "qiuqiu") {
            // 20岁 丘丘线的元素喜爱事件
            var img_path = ["./img/冲锋丘丘人.png", "./img/冰盾丘丘人.png", "./img/火箭丘丘人.png", "./img/雷弹丘丘人.png", 
                "./img/奇怪的丘丘人.png", "./img/岩盾丘丘人.png", "./img/雷箭丘丘人.png", "./img/冰弹丘丘人.png"];
            if(event_id == "122000") main_element = 0;
            else if(event_id == "122001") main_element = 1;
            else if(event_id == "122002") main_element = 2;
            else if(event_id == "122003") main_element = 3;
            else if(event_id == "122004") main_element = 4;
            else if(event_id == "122005") main_element = 5;
            else if(event_id == "122006") main_element = 6;
            else if(event_id == "122007") main_element = 7;
            else main_element = 0;
            $("#header_img").attr("src", img_path[main_element]);
        } else {}
    } else if(age == 40) {
        if(race == "yuansu") {
            var img_path = ["./img/火飘浮灵.png", "./img/水飘浮灵.png", "./img/风飘浮灵.png", "./img/雷飘浮灵.png", 
                "./img/草飘浮灵.png", "./img/冰飘浮灵.png", "./img/岩飘浮灵.png", "./img/无属性飘浮灵.png"];
            $("#header_img").attr("src", img_path[main_element]);
        }  else if(race == "qiuqiu") {
            var img_path = ["./img/火丘丘萨满.png", "./img/水丘丘萨满.png", "./img/火丘丘萨满.png", "./img/雷丘丘萨满.png", 
                "./img/草丘丘萨满.png", "./img/岩丘丘萨满.png", "./img/雷丘丘萨满.png", "./img/冰丘丘萨满.png", "./img/风丘丘萨满.png"];
            if(event_id == "124008") {
                $("#header_img").attr("src", img_path[8]);
                // 新生元素
                main_element = 8;
            } else $("#header_img").attr("src", img_path[main_element]);
        } else {}
    } else if(age == 50) {
        if(race == "yuansu") {
            var img_path = ["./img/狂火之核.png", "./img/狂水之核.png", "./img/狂风之核.png", "./img/狂雷之核.png", 
                "./img/狂草之核.png", "./img/狂冰之核.png", "./img/狂岩之核.png", "./img/狂无之核.png"];
            $("#header_img").attr("src", img_path[main_element]);
        }  else if(race == "qiuqiu") {
            var img_path = ["./img/火斧丘丘暴徒.png", "./img/冰盾丘丘暴徒.png", "./img/火斧丘丘暴徒.png", "./img/雷盾丘丘暴徒.png", 
                "./img/木盾丘丘暴徒.png", "./img/岩盾丘丘暴徒.png", "./img/雷斧丘丘暴徒.png", "./img/冰斧丘丘暴徒.png", "./img/风斧丘丘暴徒.png"];
            if(event_id == "125008") $("#header_img").attr("src", img_path[8]);
            else $("#header_img").attr("src", img_path[main_element]);
        } else {}
    } else if(age == 60) {
        if(race == "yuansu") {
            var img_path = ["./img/无相之火.png", "./img/无相之水.png", "./img/无相之风.png", "./img/无相之雷.png", 
                "./img/无相之草.png", "./img/无相之冰.png", "./img/无相之岩.png", "./img/无相之无色.png"];
            $("#header_img").attr("src", img_path[main_element]);
        }  else if(race == "qiuqiu") {
        } else {}
    } else if(age == 70) {
        if(race == "yuansu") {
            var img_path = ["./img/纯火精灵.png", "./img/纯水精灵.png", "./img/纯风精灵.png", "./img/雷音权现.png", 
                "./img/纯草精灵.png", "./img/纯冰精灵.png", "./img/磐岩精灵.png", "./img/虚无精灵.png"];
            $("#header_img").attr("src", img_path[main_element]);
        }  else if(race == "qiuqiu") {
            var img_path = ["./img/丘丘烈火王.png", "./img/丘丘霜铠王.png", "./img/丘丘烈火王.png", "./img/丘丘雷兜王.png", 
                "./img/丘丘百木王.png", "./img/丘丘岩盔王.png", "./img/丘丘雷兜王.png", "./img/丘丘霜铠王.png", "./img/丘丘狂风王.png"];
            if(event_id == "127008") $("#header_img").attr("src", img_path[8]);
            else $("#header_img").attr("src", img_path[main_element]);
        } else {}
    } else if(age == 100) {
        // 进入最终事件999999
        if(event_id == "999999") {
            $('#event_show_ul').append(li_content);
            // 保持滚动条一直处于底部
            document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;
            $("#header_img").attr("src", "./img/魔神.png");

            age++;
            over_and_regame(event_id);
            return;
        }
    }

    $('#event_show_ul').append(li_content);
    // 保持滚动条一直处于底部
    document.getElementById('event_show_ul').scrollTop = document.getElementById('event_show_ul').scrollHeight;
    age++;

    // 特殊时间跳跃事件
    switch(event_id) {
        case 114918:
            // 生成 start<= x <end 的随机数
            var num = get_random_num_by_range(-49, 10);
            console.log("event=114918,num=" + num);
            age += num;
            break;
        case 117418:
            age = 1;
            break;
        case 120718:
            age++;
            break;
        case 124918:
            var num = get_random_num_by_range(-49, 10);
            console.log("event=124918,num=" + num);
            age += num;
            break;
        default:
            // console.log(event_id);
    }

    // 死亡事件处理
    for(var i = 0; i < die_event.length; i++)
    {
        if(event_id == die_event[i]) {
            // 浮动死亡全属性扣点值
            var num = 1;
            if(10 >= age && age > 0) num = 3;
            else if(20 >= age && age > 10) num = 9;
            else if(40 >= age && age > 20) num = 15;
            else if(50 >= age && age > 40) num = 20;
            else if(70 >= age && age > 50) num = 60;
            else if(99 >= age && age > 70) num = 200;
            else num = 400;
            // 所有属性点减1
            real_prop1 -= num;
            real_prop2 -= num;
            real_prop3 -= num;
            show_hide_tip("触发死亡事件！全属性减" + num, 4000);
            // 判断事件扣除后的属性点是否大于0，如果全属性都大于0，则可继续存活。
            if(real_prop1 > 0 && real_prop2 > 0 && real_prop3 > 0) {
                console.log("属性点抵消死亡事件。全属性-" + num);
                age--;
            } else {
                // 死亡结算
                over_and_regame(event_id);
            }

            // 现属性显示
            document.getElementsByClassName("real_prop_class")[0].innerText = real_prop1;
            document.getElementsByClassName("real_prop_class")[1].innerText = real_prop2;
            document.getElementsByClassName("real_prop_class")[2].innerText = real_prop3;

            return;
        }
    }
}

// 结束触发 重新开始弹窗
function over_and_regame(event_id) {
    // 关闭定时器
    clearInterval(auto_interval);
    $('#auto_btn').html("自动播放");
    $('#auto_btn2').html("播放   2x");

    $("#zhezhao_div").show();
    setTimeout(function() {$("#regame_page_div").show()}, 1500);

    console.log("event_id:" + event_id);

    var summary;
    if(event_id == "999999")
        summary = "恭迎魔神降临~（此处掌声）\n";
    else
        summary = "死因：" + events[event_id].event + "\n";
    summary = summary + "真是精彩的魔生~\n";
    summary = summary + "你一共活了" + (age - 1) + "月\n";
    summary = summary + "你的初始属性为：体质"+ init_prop1 + "，幸运"+init_prop2+"，智慧"+init_prop3+"\n";
    summary = summary + "你的最终属性为：体质"+ real_prop1 + "，幸运"+real_prop2+"，智慧"+real_prop3+"\n";
    summary = summary + "十分感谢您游玩本游戏~期待下一次相遇！";
    $("#summary").text(summary);
}

// 回退1月
function back_one() {
    age--;
}

// 任意年龄跳转
function jump_to_wantonly_age(wantonly_age) {
    age = wantonly_age;
}

