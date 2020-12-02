var loadMore = {
    loadover:false,
    page:1,
    container:'',
    fun:function(){},
    init:function(obj){
        this.loadover = obj.loadover;
        this.page = obj.page;
        this.container = obj.container;
        this.fun = obj.fun;
        this.load();
    },
    load:function(){
        var that = this;
        if(!that.loadover){
            //加载
            $.ajax({
                type:'POST',
                data:{page:this.page},
                url:'/index/news/get-news-info-by-page',
                success:function(res){
                    var data = JSON.parse(res).backData;

                    if(!data.length){
                        that.loadover = true;
                        that.fun();
                    }else{
                        if(data.length < 20){
                            //没有更多了
                            that.loadover = true;
                            that.fun();
                        }
                        var html = '';
                        for(var idx in data){
                            html += '<li class="news-li">'
                                + '<a href="'+document.location.origin+ '/news/'+data[idx]['dir']+'/'+data[idx]['code']+'.html'+'.htm"/*tpa=http://www.seehope.net/js/'+document.location.origin+ '/news/'+data[idx]['dir']+'/'+data[idx]['code']+'.html'+'*/><span>· '+data[idx]['title']+'</span><i>'+data[idx]['createtime']+'</i></a>'
                                + '</li>';
                        }

                        $('#'+that.container).append(html);
                    }
                },
                error:function(ret){
                    console.log(ret);
                }
            });
        }
    },
    loadStatus:function(){
        return this.loadover;
    }
}

var loadAside = {
    load:function(){
        //加载
        var html = '';
        $.ajax({
            type:'POST',
            data:{},
            url:'/index/news/get-news-aside',
            success:function(res){
                var asideData = JSON.parse(res).backData;
                if(asideData){
                    for(var idx in asideData){
                        html += '<div class="news-col">';
                        html += '<h3><i class="fa fa-bookmark" aria-hidden="true"></i>';
                        html += asideData[idx]['title'];
                        html += '</h3>';
                        html += '<ul>';
                        var colData = asideData[idx]['data'];
                       if(colData){
                            for(var i in colData){
                                html += '<li>';
                                html += '<a href="../news/'+colData[i]['dir']+'/'+colData[i]['code']+'.html"/*tpa=http://www.seehope.net/news/'+colData[i]['dir']+'/'+colData[i]['code']+'.html*/>'+colData[i]['title']+'</a>';
                                html += '</li>';
                            }
                       }
                        html += '</ul></div>';
                    }
                }

                $("#js-right-aside").html(html);
            },
            error:function(ret){
                console.log(ret);
            }
        });
    }
}
