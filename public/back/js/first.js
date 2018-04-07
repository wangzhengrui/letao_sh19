


$(function(){

  var currentpage=1;
  var pageSize=5;

  render();
function render(){
  $.ajax({
    url:"/category/queryTopCategoryPaging",
    type:"GET",
    data:{
      page:currentpage,
      pageSize:pageSize
    },
    success:function(info){
      //console.log(info);
      var htmlstr=template("firstTpl",info);
      $(".lt_content tbody").html(htmlstr);

      //渲染分页
      $("#paginator").bootstrapPaginator({

        bootstrapMajorVersion:3,//指定bootstrap版本，如果是3版本，必须指定。
        currentPage:info.page,//指定当前页
        totalPages:Math.ceil(info.total/info.size),//指定总页数

        onPageClicked:function(a,b,c,page){
          //page 指的是当前点击的页码，修改了当前页
          currentpage=page;
          //重新渲染
          render();
        }








      })


    }
  })

}
  render();

//模态框点击显示
  $("#addBtn").on("click",function(){

    //显示模态框
    $("#firstModal").modal("show");

    //通过校验插件，添加校验功能
    $("form").bootstrapValidator({

      //小图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryname:{
          //校验规则
          validators:{
          //非空校验
          notEmpty:{
            //提示信息
            message:"请输入一级分类名称"
          }
        }
        }
      }

    })

  })


  //    表单校验插件, 会在表单提交时, 进行校验
  //    如果通过校验, 默认会进行提交, 需要阻止, 通过 ajax 进行提交

  // (使用form="form", 通过了校验, 也不会提交了, 可以省去 e.preventDefault() )
  $("#form").on("success.form.bv",function(e){

    e.preventDefault();

    $.ajax({
      url:"/category/addTopCategory",
      type:"post",
      data: $('#form').serialize(),
      success:function( info){
        console.log(info);
        if(info.success){

          //关闭模态框
          $("#firstModal").modal("hide");

          currentpage=1;
          render();
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }


    })







  })









})