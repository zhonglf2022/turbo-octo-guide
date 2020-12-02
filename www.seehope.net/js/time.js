    function setTime(json){
        var y = json.y;
        var m = json.m - 1;
        if(m == -1) m = 0;
        var d = json.d;
        var sClassDay = json.day || ".day";
        var sClassHours = json.hours || ".hour";
        var sClassMous = json.mous || ".mous";
        var sClassMues = json.mues || ".mues";
        var sClassHaomiao = json.haomiao || ".haomiao";

        var startTimeh = new Date();
        startTimeh.setFullYear(y,m,d);
        startTimeh.setHours(23);
        startTimeh.setMinutes(59);
        startTimeh.setSeconds(59);
        startTimeh.setMilliseconds(999);
        var EndTimeh=startTimeh.getTime();
        function GetRTimeh(){
            var NowTimeh = new Date();
            var dur = (EndTimeh - NowTimeh.getTime()) / 1000;
            var nMS = EndTimeh - NowTimeh.getTime();
            var nD = Math.floor(dur/(86400))>0?zeroh(Math.floor((dur / 86400)) % 4320) : "00";
            var nH =  Math.floor((dur / 3600)) > 0?zeroh(Math.floor((dur / 3600)) % 24) : "00";
            var nM = Math.floor((dur / 60)) > 0? zeroh(Math.floor((dur / 60)) % 60) : "00";
            var nS = zeroh(dur % 60);
            var hm=haomiao(nMS % 1000);
            if (nMS < 0){

            }else{
                $(sClassDay).text(nD);
                $(sClassHours).text(nH);
                $(sClassMous).text(nM);
                $(sClassMues).text(nS);
                $(sClassHaomiao).text(hm);
            }
        }

            var timer_rt = setInterval(GetRTimeh, 1);

        function zeroh(n){
            var _n = parseInt(n, 10);//解析字符串,返回整数
            if(_n > 0){
                if(_n <= 9){
                    _n = "0" + _n
                }
                return String(_n);
            }else{
                return "00";
            }
        }

        function haomiao(n){
            if(n < 10)return "00" + n.toString();
            if(n < 100)return "0" + n.toString();
            return n.toString();
        }
    }    
