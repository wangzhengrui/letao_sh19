
//配置禁用小圆环
NProgress.configure({ showSpinner:false});

//ajaxStart 所有的ajax开始调用

$(document).ajaxStart(function(){
  NProgress.start();
});

//ajaxStop 所有的ajax结束调用

$(document).ajaxStop(function(){
  //模拟网络延迟
  setTimeout(function(){
    NProgress.done();
  },500)

})

//在一进入页面进行登录状况获取
//如果后端响应中设置content-Type:application/json
//jqery自动识别，返回数据类型，当json字符串解析成对象
if(location.href.indexOf("login.html")===-1){

  $.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    success:function(info){
      console.log(info);
      if(info.success){
        //什么也不干
      }
      if(info.error==400){
        location.href="login.html"
      }

    }
  })


}









$(function(){
  //1.二级分类切换功能
  $('.category').click(function(){
    //alert("haha")
    $(this).next().stop().slideToggle();
  })

  //2.顶部菜单栏切换显示功能
$(".icon_menu").click(function(){
  $(".lt_aside").toggleClass("hidemenu");
  $(".lt_main").toggleClass("hidemenu");
  $(".lt_topbar").toggleClass("hidemenu");
})

  //3.点击退出图标，实现退出功能
  $(".icon_logout").click(function(){

    //alert("haha")
$("#logoutModal").modal("show");

  })

  //4.在外面注册logoutBtn 退出按钮，点击事件

$("#logoutBtn").click(function(){
  //访问退出接口，进行退出
  $.ajax({
    url:"/employee/employeeLogout",
    type:"get",
    dataType:"json",
    success:function(info){
      //console.log(info);
      if(info.success){
        location.href="login.html"
      }



    }
  })



})



})













