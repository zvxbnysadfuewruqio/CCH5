<template>
	<view class="satisfaction">
		<!-- 近7天入驻商户 -->
		<view class="seven">
			<view class="title">客户订单统计</view>
			<view class="ss">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>
		
		<!-- 近7天满意度统计 -->
		<view class="seven">
			<view class="title">近7天满意度统计</view>
			<view class="ss">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts2"></canvas>
			</view>
		</view>
			
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing=null;
	var canva2g=null;
   
	export default {
		data() {
			return {
				serverData:'',
				"chartData": {
				  "series": [{
					"name": "服务总单量:50单",
					"data": 50,
					"color":"#1C78F1"
				  }, {
					"name": "投诉量:30单",
					"data": 30,
					color:"#E84846"
				  }]
				},
				chartsdata:{
						"categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
						"series": [{
						"name": "服务总单量",
						"data": [600,600,600,600,600,600,600],
						"color": "#F5F5F5",
						"textColor":"#fff"
						}, {
						"name": "服务总单量",
						"data": [250,  376 , 432, 345, 112, 28],
						"color": "#1C78F1"
						},{
						"name": "投诉量",
						"data": [30,  50 , 13, 250, 43, 10],
						"color": "#E84846",
						// "textColor":"#000"
						}],
				}
			}
		},
		onLoad() {
			_self = this;
			
			// this.getServerData();
			_self.showRing("canvasRing",this.chartData);
			this.showColumn("canvasColumn",this.chartsdata)
		},
		methods: {
			// getServerData(){
			// 	uni.request({
			// 		url: 'https://www.ucharts.cn/data.json',
			// 		data:{
			// 		},
			// 		success: function(res) {
			// 			console.log(res.data.data)
			// 			let Ring={series:[]};
			// 			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// 			Ring.series=res.data.data.Ring.series;
			// 			_self.showRing("canvasRing",Ring);
			// 		},
			// 		fail: () => {
			// 			_self.tips="网络错误，小程序端请检查合法域名";
			// 		},
			// 	});
			// },
			showRing(canvasId,chartData){
				var cWidth=uni.upx2px(700);
				var cHeight=uni.upx2px(480);
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:{
						position:"bottom",
						fontSize:uni.upx2px(26),
						fontColor:"#9A9A9A",
					},
					title: {
						name: '92%',
						color: '#141414',
						fontSize: uni.upx2px(72),
						// offsetY:-20,
					},
					subtitle: {
						name: '满意率',
						color: '#9A9A9A',
						fontSize:  uni.upx2px(26),
						// offsetY:30,
					},
					extra: {
						pie: {
						  offsetAngle: -45,
						  ringWidth: uni.upx2px(26),
							activeRadius:uni.upx2px(10),
						  labelWidth:15
						}
					},
					background:'#FFFFFF',
					pixelRatio:1,
					series: chartData.series,
					animation: true,
					width: cWidth,
					height:cHeight,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			
			showColumn(canvasId,chartData){
				var _self=this
				var cWidth=uni.upx2px(700)
				var cHeight=uni.upx2px(660)
				this.canvaColumn=new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: {show:false},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: 1,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					// disabled:true
					axisLine:false
				},
				yAxis: {
					// disabled:true
					disableGrid: true,
					// axisLine:false
					data:[{
						axisLine:false
					}]
				},
				dataLabel: true,
				width: cWidth,
				height:cHeight,
				padding:[uni.upx2px(80),uni.upx2px(30),uni.upx2px(30),uni.upx2px(30)],
				extra: {
					tooltip:{
							// showBox:true,//是否显示半透明黑色的提示区域
							bgColor:'#000000',//主体背景颜色
							bgOpacity:0.7,//背景颜色透明度
							gridType:'dash',//辅助线类型（虚线）
							dashLength:5,//虚线单段长度
							gridColor:'#1890ff',//辅助线颜色
							fontColor:'#FFFFFF',//主体文字颜色
							horizentalLine:true,//是否显示横向辅助线
							xAxisLabel:true,//是否显示X轴辅助标签
							yAxisLabel:true,//是否显示Y轴辅助标签
							labelBgColor:'#DFE8FF',//标签背景颜色
							labelBgOpacity:0.95,//背景颜色透明度
							labelFontColor:'#666666'//标签文字颜色
						},
					column: {
						//meter参数为“温度计式图表”
						type: 'meter',
						//width为每个柱子的宽度
						width: 20,
						meter: {
							//这个是外层边框（即目标值）的宽度
							border: 0,
							//这个是内部填充颜色
							fillColor: '#F5F5F5'
						}
					}
				}
			});
		},
			
			
			touchRing(e){
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style lang="scss">
// page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
page{
	background-color: #f5f5f5;
}
.satisfaction{
	padding: 20rpx 25rpx;
	.title{
		color: #141414;
		font-size: 42rpx;
		font-weight: bold;
		padding: 45rpx 0;
	}
	
	.charts{width: 700upx; height:480upx;background-color: #FFFFFF;}
	
	.charts2{width: 700upx; height:660upx;background-color: #FFFFFF;}
	
}
</style>