<template>
	<!-- 商户统计 -->
	<view class="index">
		<!-- 入驻商户总数 -->
		<view class="total">
			<view class="title">入驻商户总数</view>
			<view class="bottom">
				<view class="text1">9745</view>
				<view class="text2">
					<text>家</text>
				</view>
			</view>
		</view>
		
		<!-- 近7天入驻商户 -->
		<view class="seven">
			<view class="title">近7天入驻商户</view>
			<view class="ss">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	export default {
		data() {
			return {
				canvaColumn:{},
				serverData:[],
				chartsdata:{
						"categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
						"series": [{
						"name": "目标值",
						"data": [600,600,600,600,600,600,600],
						"color": "#F5F5F5"
						}, {
						"name": "完成量",
						"data": [18,  27 , 21, 24, 6, 28],
						"color": "#1890ff"
						}]
				},
				data:{
					"categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
					"series": [{
					"name": "类别一",
					"data": [35, 36, 31, 33, 13, 34]
					}, {
					"name": "类别二",
					"data": [18, 27, 21, 24, 6, 28]
					}, {
					"name": "类别三",
					"data": [18, 27, 21, 24, 6, 28]
					}]
				}
			}
		},
		onLoad() {
			// this.getServerData();
			this.showColumn("canvasColumn",this.data)
		},
		methods: {
			//获取数据
			// getServerData(){
			// 	var _self=this
			// 	uni.request({
			// 		url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
			// 		data:{
			// 		},
			// 		success: function(res) {
			// 			console.log(res.data.data)
						
			// 			_self.showColumn("canvasColumn",Column);
			// 		},
			// 		fail: () => {
			// 			console.log("网络错误，小程序端请检查合法域名");
			// 		},
			// 	});
			// },
			showColumn(canvasId,chartData){
				var _self=this
				var cWidth=uni.upx2px(700)
				var cHeight=uni.upx2px(500)
			// 	this.canvaColumn=new uCharts({
			// 	$this: _self,
			// 	canvasId: canvasId,
			// 	type: 'column',
			// 	legend: {show:true},
			// 	fontSize: 11,
			// 	background: '#FFFFFF',
			// 	pixelRatio: 1,
			// 	animation: true,
			// 	categories: chartData.categories,
			// 	series: chartData.series,
			// 	xAxis: {
			// 		disableGrid: true,
			// 	},
			// 	yAxis: {
			// 		// disabled:true
			// 		disableGrid: true,
			// 	},
			// 	dataLabel: true,
			// 	width: uni.upx2px(700),
			// 	height:uni.upx2px(500),
			// 	extra: {
			// 		column: {
			// 			//meter参数为“温度计式图表”
			// 			type: 'meter',
			// 			//width为每个柱子的宽度
			// 			width: 20,
			// 			meter: {
			// 				//这个是外层边框（即目标值）的宽度
			// 				border: 2,
			// 				//这个是内部填充颜色
			// 				fillColor: '#F5F5F5'
			// 			}
			// 		}
			// 	}
			// });
			
				this.canvaColumn=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:1,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width:cWidth,
					height:cHeight,
					extra: {
						column: {
							type:'stack',
							width: 20
						}
						}
				});
			},
			changeData(){
				this.canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f5f5f5;
}
.index{
	padding: 20rpx 25rpx;
	.total{
		width: 700rpx;
		height: 200rpx;
		color: #fff;
		padding-left: 40rpx;
		background-image: url(../../static/img/totalbg.png);
		background-size: 100%;
		.title{
			padding-top: 20rpx;
			padding-bottom: 10rpx;
			font-size: 26rpx;
			line-height:70rpx;
		}
		.bottom{
			display: flex;
		}
		.text1{
			font-size: 68rpx;
			line-height:70rpx;
		}
		.text2{
			margin-left: 10rpx;
			position: relative;
			font-size: 26rpx;
			text{
				position: absolute;
				left: 0;
				bottom: 5rpx;
			}
		}
	}
	
	
	.charts{width: 700upx; height:500upx;background-color: #FFFFFF;}
	
}
</style>
