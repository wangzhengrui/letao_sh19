



//防止全局变量污染，等待dom渲染完在执行

$(function(){





//1.进行表单验证
//校验要求:1.用户名不能为空
        //2.密码不能为空，且必须6-12位
  $("#form").bootstrapValidator({

    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  //对字段进行校验
  fields:{
    username:{
      //检验的规则
      validators:{
        //非空校验
        notEmpty:{
          //为空时显示的提示信息
          message:"用户名不能为空"
        },
        stringLength:{
          min:2,
          max:6,
          message:"用户名必须2-6个字符"
        },
        callback:{
          message:"用户名错误"
        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        //长度校验
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须是6-12位"
        },
        //专门用于配置回调函数提示信息的规则
        callback:{
          message:"密码错误"
        }
      }
    }

  }

})

//进行登录请求
//通过ajax进行登录请求

  //表单校验插件有一个特点，在表单提交的时候进行校验
  //如果校验成功，继续提交
  //如果校验失败，阻止默认的提交

  $("#form").on("success.form.bv",function(e){
    //阻止默认的表单请求
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        //console.log(info);

        if(info.success){
          //alert("登录成功")
          location.href="index.html"

        }
        if(info.error==1000){
          //alert("用户名不存在")
          //$("#form").data("bootstrapValidator").updata
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
        if(info.error==1001){
          //alert("密码错误")
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }



      }

    })





  })

  //重置功能实现
$("#reset_btn").click(function(){
  //alert("haha")
  $("#form").data("bootstrapValidator").resetForm(true);

})








})