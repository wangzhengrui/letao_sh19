$(function(){

  // 基于准备好的dom，初始化echarts实例
  var echarts1 = echarts.init(document.querySelector(".echarts_1"));

  // 指定图表的配置项和数据
  var option1 = {
    //大标题
    title: {
      text: '2017年注册人数'
    },
    //提示框组件
    tooltip: {},
    //图例
    legend: {
      data:['销量']
    },
    //x轴的数据
    xAxis: {
      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    //Y轴的刻度，根据数据自动生成比较合适
    yAxis: {},
    //数据
    series: [{
      name: '销量',
      //表示柱状图
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts1.setOption(option1);



})
