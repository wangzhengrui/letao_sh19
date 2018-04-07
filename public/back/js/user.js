


$(function(){



  var currentpage=1;
  var pageSize=5;


  render();
  function render(){
    $.ajax({
      url:"/user/queryUser",
      type:"get",
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        var htmlStr=template("userTpl",info);

        $(".table tbody").html(htmlStr);

       //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
          currentpage:info.page,//指定当前页
          totalPages:Math.ceil(info.total/info.size),

          onPageClicked:function(a,b,c, page){

            //page指的是点击的当前页码，修改了当前页
            currentpage=page;

            //重新渲染
            render();

          }
        })

        //用户禁用启用功能
          $(".lt_content tbody").on("click",".btn",function(){
              //弹出模态框
            $("#userModal").modal("show");

            //获取用户id
            var id=$(this).parent().data("id");
            //console.log(id);
            //获取用户将当前设置成什么状态
            var isDelete=$(this).hasClass("btn-success")? 1:0;
            console.log(isDelete);

            $("#userBtn").off().on("click",function(){
              $.ajax({
                url:"/user/updateUser",
                type:"post",
                data:{
                  id:id,
                  isDelete:isDelete
                },
                success:function(info){
                  console.log(info);
                  //如果成功，关闭模态框
                  if(info.success){
                    $("#userModal").modal("hide");

                    //重新渲染页面
                    render();

                  }

                }

              })

            })




          })




      }
    })
  }
 render();









})
