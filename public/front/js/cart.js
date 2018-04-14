




$(function(){
render();
function render(){
  setTimeout(function(){
    $.ajax({
      url:"/cart/queryCart",
      type:"get",
      success:function(info){
        console.log(info);
        //callback(info);
        $("#cart_product").html(template("cartTpl",{data:info}));
        //手动结束下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
      }
    })
  },500)

}
  //配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback :function(){
          render();
        }
      }
    }
  });

  //给删除按钮添加点击事件
  $("#cart_product").on("click",".btn_delete",function(){
    var id=$(this).data("id");
    console.log(id);
    //弹出模态框
    mui.confirm("你是否要删除这个商品","温馨提示",["否","是"],function(e){

      //如果选择下标为1的，请求ajax删除数据
      if(e.index==1){

        $.ajax({
          url:"/cart/deleteCart",
          type:"get",
          data:{
            id:[id]
          },
          success:function(info){

            if(info.success){
              //重新调用一次下拉刷新
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }


        })

      }



    })

  })

  //给编辑按钮添加点击事件
  $("#cart_product").on("click",".btn_edit",function(){



    var htmlStr=template("editTpl",{});
    console.log(htmlStr);

    htmlStr=htmlStr.replace(/\n/g,"");


    mui.confirm(htmlStr,"温馨提示",["确认","取消"],function(){
    //$.ajax({
    //  url:"/cart/updateCart",
    //  type:"post",
    //  data:{
    //    id:id,
    //    num:num,
    //    size:size
    //  },
    //  success:function(info){
    //
    //    console.log(info);
    //  }
    //
    //})

  })

    //初始化数字框
    mui(".mui-numbox").numbox();

  })


})
