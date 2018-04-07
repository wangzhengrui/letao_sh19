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
      data:['人数']
    },
    //x轴的数据
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    //Y轴的刻度，根据数据自动生成比较合适
    yAxis: {},
    //数据
    series: [{
      name: '人数',
      //表示柱状图
      type: 'bar',
      data: [1500, 2000, 360, 1000, 500, 1200]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts1.setOption(option1);

  // 基于准备好的dom，初始化echarts实例
  var echarts2 = echarts.init(document.querySelector(".echarts_2"));
  option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','李宁','安踏','特步']
    },
    series : [
      {
        name: '数据来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'李宁'},
          {value:135, name:'安踏'},
          {value:1548, name:'特步'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts2.setOption(option2);







})
