


$(function(){

  var currentpage=1;
  var pageSize=3;


  render();

  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $(".lt_content tbody").html(template("proTpl",info));

        //渲染分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
          currentpage:info.page,//指定当前页
          totalPages:Math.ceil(info.total/info.size),

          onPageClicked:function(a,b,c,page){
            //page指的是点击的当前页码，修改了当前页
            currentpage=page;
            //重新渲染
            render();

          },
          itemTexts:function(type, page, current){
            switch(type){
              case "first":
                return"首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page
            }
          }
        })

      }
    })
  }
render();


    //点击添加管理弹出模态框
  $(".lt_content>button").on("click",function(){

    alert("haha")



  })






})
