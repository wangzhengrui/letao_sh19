$(function(){


  //一进入页面，应该请求当前用户信息，进行页面渲染
  //    1.登陆了，获取用户信息渲染
  //    2.没登陆跳转到login.html页面登陆


  $.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    success:function(info){

      //说明没登陆
      if(info.error==400){
        //跳转到登陆页面
        location.href="login.html";
        return;
      }
      //console.log(info);
      $(".user_info").html(template("userTpl",info));

    }
  })

  //给退出按钮添加点击事件,并进行ajax请求
  $(".btn_logout").click(function(){
    $.ajax({
      url:"/user/logout",
      type:"get",
      success:function(info){
        //console.log(info);
        if(info.success){
          //跳转到登陆页
          location.href="login.html";
        }


      }
    })

  })








})
