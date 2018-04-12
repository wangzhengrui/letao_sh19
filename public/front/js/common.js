


//上下滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //取消滚动条
});

//配置轮播图自动轮播
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


//专门用于解析地址栏参数
function getSearch(key){
  var search=location.search;

  //解码成中文
  search=decodeURI(search);
  //去掉？号
  search=search.slice(1);
  //切割成数组

  var arr=search.split("&");

  //定义一个空对象
  var obj={};
  arr.forEach(function(e,i){
    //对数组的每一项，进行切割 name=pp
    var k= e.split("=")[0];//name
    var v= e.split("=")[1];//pp
    //obj["name"]=pp
    obj[k]=v;
  });
  return obj[ key ];

}
