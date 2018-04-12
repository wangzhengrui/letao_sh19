

$(function(){

$.ajax({
  url:"/category/queryTopCategory",

  type:"get",
  success:function(info){
    console.log(info);

   $(".main_left ul").html(template("categoryTpl",info));

    renderById(info.rows[0].id);
  }
})
  //给左侧一级分类添加点击事件
  $(".main_left ul").on("click","a",function(){
    //console.log(99);
    //拿到一级分类id
    var id=$(this).data("id");
    //console.log(id);

    renderById(id);
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");


  });

function renderById(id){
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id:id
    },
    success:function(info){
      //console.log(info);
      $(".main_right ul").html(template("proTpl",info));


    }

  })
}

  renderById()






})