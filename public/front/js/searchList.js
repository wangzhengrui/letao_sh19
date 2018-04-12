$(function() {
  //获取地址栏参数中传递过来 搜索关键字
  var key = getSearch("key");
  //将其赋值到input中
  $(".lt_search input").val(key);

  //功能1；根据key进行ajax请求，一进入就渲染数据
  render();




//点击搜索按钮，实现搜索功能
  $(".lt_search button").click(function(){
    console.log(99);
    //直接渲染
    render();

    //获取搜索关键字
    var key=$(".lt_search input").val();
    //拿到数组
    var history=localStorage.getItem("search_list") || '[]';
    var arr=JSON.parse(history);

    //不能有重复的，
    var index=arr.indexOf(key);
    if(index!==-1){
      //有重复项，需要删除
      arr.splice(index,1);

    }
    //长度大于10的，删除最后一个
    if(arr.length>=10){
      arr.pop();
    }
    //将key从前面添加到数组中
    arr.unshift(key);
    //进行数据持久化，将数据本地存储
    localStorage.setItem("search_list",JSON.stringify(arr));
  })


//点击排序按钮，进行排序
//  1.如果自己没有current类，就加上current类，删除其他current类
//  2.如果有current类，直接切换i里面的上下箭头
  $(".lt_sort a[data-type]").click(function(){

    if($(this).hasClass("current")){

      $(this).find("i").toggleClass("fa fa-angle-down").toggleClass("fa fa-angle-up");

    }else{
      //说明没有current类
      $(this).addClass("current").siblings().removeClass("current");

      //让所有元素的箭头，重置成像下
      $(".lt_sort a").find("i").removeClass("fa fa-angle-up").addClass("fa fa-angle-down");


    }
render();

  })


  function render(){
    //请求渲染时，将product结构重置成loading
    $(".lt_product").html('<div class="loading"></div>')


    var params={};
      params.proName=$(".lt_search input").val();
      params.page=1;
      params.pageSize=100;

       //排序功能分析
       // 1.如果价格高亮，需要传price 参数
       // 2.如果库存高亮，需要传num参数

        //获取到有current类的元素
      var $current=$(".lt_sort .current");
    if($current.length>0){
      //有高亮的元素，需要排序
      var sortName=$current.data("type");
      var sortValue=$current.find("i").hasClass("fa fa-angle-down")? 2:1 ;
      params[sortName]=sortValue;
    }


setTimeout(function(){
    $.ajax({
      url:"/product/queryProduct",
      type:"get",
      data:params,
      success:function(info){
        //console.log(info);
        $(".lt_product ").html(template("searchListTpl",info));
      }
    })
},500)

  }





})

