



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
        }
      }
    }

  }




})










})