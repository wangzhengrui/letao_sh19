




$(function(){

  //指定当前页
  var currentPage=1;
  //每页多少条数据
  var pageSize=5;

//一进入页面的时候渲染一遍
  render();
function render(){
  $.ajax({
    url:"/category/querySecondCategoryPaging",
    type:"get",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(info){
      //console.log(info);
      $(".lt_content tbody").html(template("secondTpl",info));

      //渲染分页
      $(".paginator").bootstrapPaginator({

        bootstrapMajorVersion:3,
        currentPage:info.page,//指定当前页
        totalPages:Math.ceil(info.total/info.size),//指定总页数

        onPageClicked:function(a,b,c,page){

          //page 指的是当前点击的页码，当前页
          currentPage=page;
          //渲染当前页
          render();

        }
      })
    }
  })
}
  render();

//点击添加分类，弹出模态框
$(".lt_content>button").on("click",function(){

  $("#secondModal").modal("show");





})


})