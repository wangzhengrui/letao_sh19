



$(function(){
  // 点击登录按钮, 获取输入的用户名和密码, 进行 ajax 请求登录

  $(".loginBtn").click(function(){
    //获取input框输入的用户名
    var username=$('[name=username]').val();
    //获取input框输入的密码
    var password=$('[name=password]').val();
      if(!username){

        mui.toast("请输入用户名");
        //如果没有输入用户名，将终止
        return;//同等于 return false;
      }
    if(!password){

      mui.toast("请输入密码");
      return;
    }

    //获取到用户名和密码后请求ajax请求
    $.ajax({
      url:"/user/login",
      type:"post",
      data:{
        username:username,
        password:password
      },
      success:function(info){
        //console.log(info);
        //结果失败，提示用户名或密码错误
        if(info.error){
          mui.toast("用户名或密码错误");

        }
        if(info.success){
          //说明登陆成功，需要跳转
          //1.直接访问的，跳转到会员中心
          //2.拦截过来的(如购物车，商品详情页)，跳转到上一个页面

          if ( location.search.indexOf( "retUrl") !== -1 ) {
            // 说明有 retUrl
            // 需要获取 retUrl 的值, 进行跳转
            // "?retUrl=http://localhost:3000/front/product.html?productId=1"
            location.href = location.search.replace("?retUrl=", "");
          }
          else {
            // 说明没有 retUrl
            location.href = "user.html"
          }

        }






      }


    })




  })











})
