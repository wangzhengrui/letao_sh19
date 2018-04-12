



$(function(){

  //进行本地存储操作
//约定search_list 为键名

  //功能1：渲染历史记录里的搜索记录
  //  1.读取历史记录里面的数组
  //  2.结合模板引擎渲染


    //一进入页面就渲染
render()
  //专门用于读取本地存储中的历史记录数组
  function getHistory(){
    //保证将来处理的一定是个数组

    var history=localStorage.getItem("search_list") || '[]';
   //通过JSON.parse转换成数组
    var arr=JSON.parse(history);
    //console.log(arr);
      return arr;


  }

    //专门用于读取数据，进行页面渲染
    function render(){
       var arr=getHistory();
        //由于template第二个必须是对象，所以给arr包装一下
        //根据本地存储中的数组，进行页面渲染
        $(".history").html(template("searchTpl",{arr:arr}));

    }

    //2.删除功能，删除本地历史记录数组里的某一项
    //    1.给所有的删除按钮添加点击事件。
    //    2.获取索引
    //    3.读取本地存储中的数组，删除对应索引的那项
    //    4.同步到本地存储中
    //    5.页面重新渲染


    $(".history").on("click",".btn_delete",function(){
      var that=this
      mui.confirm("你是否要清空所有的历史记录","温馨提示",["取消","确认"],function(e){

        if(e.index==1){
          var index=$(that).data("index");
          console.log(index);
          //获取数组
          var arr=getHistory();
          //console.log(arr);
          //删除数组中对应的哪一项
          arr.splice(index,1);
          //同步到本地存储中
          localStorage.setItem("search_list",JSON.stringify(arr));
          //重新渲染
          render();
        }


      })



    });

    //3.清空功能
        //1.给清空按钮注册点击事件
        //2.清空本地存储中的search_list
        //3.重新渲染
    $(".history").on("click",".del_empty",function(){
        //参数1：内容
        //参数2：标题
        //参数3：数组按钮
        //参数4：点击按钮后的回diao

        //点击清空按钮跳出模态框
        //console.log(99);
        mui.confirm("你是否要清空所有的历史记录","温馨提示",["取消","确认"],function(e){
            if(e.index==1){
                //清空数组
                localStorage.removeItem("search_list");
                //重新渲染
                render();

            }


        })



    })
  //console.log(99);
  //4.添加功能
    //    1.点击搜索功能，获取输入框的值
    //    2.获取数组
    //    3.将输入框的值，添加到数组的最前面
    //    4.持久化到本地存储中，修改search_list
    //    5.重新渲染页面

  $(".lt_search button").on("click",function(){
    //获取搜索框里的值
    var key=$(".lt_search input").val().trim();
    //console.log(key);
    if(key===""){
      //添加提示框
      mui.toast("请输入搜索关键字");

      return;
    }

    //获取数组
    var arr=getHistory();



    //
    //需求：1.不能重复
    //      2.数组长度不能超过10条

       //不等于-1，说明在数组中可以找到key，说明重复了，需要删除
    if(arr.indexOf(key)!==-1){
      //获取索引
      var index=arr.indexOf(key);
      //删除
      arr.splice(index,1);

    }
    //数组长度超过10条,删除数组最后一条
    if(arr.length>=10){
      arr.pop();
    }


    //将输入框的值添加到数组的最前面
    arr.unshift(key);
    //持久化本地存储中，修改search_list
    localStorage.setItem("search_list",JSON.stringify(arr));
    //重新渲染
    render();
    //清空input框
    $(".lt_search input").val('');

    //跳转到搜索列表页，将搜索关键字传递到searchList.html
    location.href="searchList.html?key="+key;





  })




})
