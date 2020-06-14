<template>
	<view class="satisfaction">
		<!-- 近7天入驻商户 -->
		<view class="seven">
			<view class="title">客户订单统计</view>
			<view class="ss">
				<!-- @touchstart="touchPie" -->
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>
			
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing=null;
   
	export default {
		data() {
			return {
				serverData:'',
				"chartData": {
				  "series": [{
					"name": "一班",
					"data": 50
				  }, {
					"name": "二班",
					"data": 30
				  }, {
					"name": "三班",
					"data": 20
				  }, {
					"name": "四班",
					"data": 18
				  }, {
					"name": "五班",
					"data": 8
				  }]
				}
			}
		},
		onLoad() {
			_self = this;
			
			// this.getServerData();
			_self.showRing("canvasRing",this.chartData);
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
					legend:true,
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25,
						offsetY:-20,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15,
						offsetY:30,
					},
					extra: {
						pie: {
						  offsetAngle: -45,
						  ringWidth: 40,
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
	
	.charts{width: 700upx; height:660upx;background-color: #FFFFFF;}
	
}
</style>