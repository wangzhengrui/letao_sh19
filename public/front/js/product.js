
$(function(){
  //1.获取地址栏参数传递过来的productId
  //2.发送ajax请求，获取对应的商品数据
  //根据数据渲染页面
  var productId=getSearch("productId");

  //console.log(productId);

  $.ajax({
    url:"/product/queryProductDetail",
    type:"get",
    data:{
      id:productId
    },
    success:function(info){
      //console.log(info);
      $("#productDetail").html(template("productTpl",info));

      ///获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化input
      mui(".mui-numbox").numbox();
    }
  })

  //尺码的选择

  $("#productDetail").on("click",".product_size span",function(){
    //console.log(99);
    $(this).addClass("current").siblings().removeClass("current");
  })

  //加入购物车功能
  //  1.获取按钮注册点击事件
  //  2.获取用户选择的尺码和数量(产品id已有)
  //  3.发送ajax请求，加入购物车
  //    (1).如果没登陆，跳转到登陆页面
  //    (2).如果登陆了，加入购物车成功，弹出提示框

  $(".add_cart").on("click",function(){

    var size=$(".product_size span.current").text();

    var num=$(".mui-numbox-input").val();

    if(!size){
      mui.toast("请选择尺码");
      //没有选择尺码啥都不做
      return;
    }

    $.ajax({
      url:"/cart/addCart",
      type:"post",
      data:{
        productId:productId,
        num:num,
        size:size
      },
      success:function(info){
        //console.log(info);

        //如果成功，跳出模态框
        if(info.success){
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
              if(e.index==0){
                //跳转到购物车页面
                location.href="cart.html";

              }


          })
        }

        //说明没登陆
        if(info.error==400){
          //跳转到登陆页
          //跳转到登陆页，登陆完成还要跳回来，所以将当前页面的地址传过去
          //    1.如果是直接访问登陆页的，登陆完成，直接跳转到会员中心
          //    2.如果是其他页面(购物车)，拦截到登陆页时，需要条回来，所以要将地址传递过去
          location.href="login.html?retUrl="+location.href;




        }

      }
    })



  })






})