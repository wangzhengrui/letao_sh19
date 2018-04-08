




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

  $.ajax({
    url:"/category/queryTopCategoryPaging",
    type:"get",
    data:{
      page:1,
      pageSize:50
    },
    success:function(info){
      $(".dropdown-menu").html(template("dropTpl",info));

      //给渲染出的下拉列表点击事件
      $(".dropdown-menu").on("click","a",function(){
          //获取选中的文本
        var txt=$(this).text();
        //获取自定义id

        var id=$(this).data("id");
          //修改文本内容
        $('.dropdownText').text(txt);

        //将获取到的id赋值给input元素中
        $('[name="categoryId"]').val(id);
        //需要将校验状态设置成VALID
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")

      });

      //上传图片
        //初始化文件上传
        $("#fileupload").fileupload({

          dataType:"json",
          //文件上传完成时，会执行回调函数，通过这个函数就能得到图片的地址
          //第二个参数就有上传的结果
          done:function(e,data){
            //console.log();
            var picAddr=data.result.picAddr;
            $(".imgBox img").attr("src",picAddr)
            //把图片中地址存在隐藏域
            $('[name="brandLogo"]').val(picAddr)
            //重置校验状态
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
          }

        });

        //表单验证
        $("#form").bootstrapValidator({
          // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
          excluded:[],

          // 配置图标
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

          fields:{
            //一级分类的id
            categoryId:{
              //校验规则
              validators:{
                //非零校验
                notEmpty:{
                  message:"请选择一级分类"
                }
              }
            },
            //品牌名称
            brandName:{
              //校验规则
              validators:{
                //非零校验
                notEmpty:{
                  message:"请输入二级分类名称"
                }
              }
            },
            //图片地址
            brandLogo:{
              //校验规则
              validators:{
                //非零校验
                notEmpty:{
                  message:"请上传图片"
                }
              }
            }
          }
        })


    }
  })
})
  //注册校验成功事件，进行ajax请求
  $("#form").on("success.form.bv",function(){


    $.ajax({
      url:"/category/addSecondCategory",
      type:"post",
      data:$("#form").serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          currentPage=1;
          render();
          $("#secondModal").modal("hide");

          $("#form").data("bootstrapValidator").resetForm(true);
          //找到下拉菜单文本重置
          $(".dropdownText").text("请选择一级分类");

          //找到图片，将图片重置
          $(".imgBox img").attr("src","images/none.png");

        }
      }



    })
  })


})