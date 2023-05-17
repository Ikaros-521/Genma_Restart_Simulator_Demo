function age_create() {
    var str = "";
    for(var i = 0; i < 100; i++)
    {
        str += "\""+ i +"\":{\"event\":[";
        for(var j = 0; j < 10; j++) {
            str += "11";
            if(i < 10)
                str += "0";
            str += i.toString();
            if(j < 10)
                str += "0";
            str += j.toString();
            str += ", ";
        }
        for(var j = 0; j < 10; j++) {
            str += "12";
            if(i < 10)
                str += "0";
            str += i.toString();
            if(j < 10)
                str += "0";
            str += j.toString();
            if(j != 9) {
                str += ", ";
            }
        }
        str += "]}";
        if(i != 100) {
            str += ",\n";
        }
    }

    console.log(str);
}

function event_create() {
    var str = "";
    for(var i = 12010; i < 13000; i++)
    {
        str += "\"" + i + "\":{\"id\":" + i + ",\"event\":\"\",},\n"
    }

    console.log(str);
}