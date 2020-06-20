<template>
	<!-- 商户统计 -->
	<view class="index">
		<!-- 入驻商户总数 -->
		<view class="total">
			<view class="title">入驻商户总数</view>
			<view class="bottom">
				<view class="text1">{{zong_number}}</view>
				<view class="text2">
					<text>家</text>
				</view>
			</view>
		</view>
		
		<!-- 近7天入驻商户 -->
		<view class="seven">
			<view class="title">近7天入驻商户</view>
			<view class="ss">
				<!-- @touchstart="touchPie" -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
			</view>
		</view>
		
		<!-- 当天入住商户 -->
		<view class="list">
			<view class="title">当天入住商户</view>
			<view class="list-item" v-for="item in listdata" :key="item.id">
				<view class="left">
					<image class="img" :src="$url_api+item.images"></image>
					<view class="title">
						{{item.shanghuname}}
					</view>
				</view>
				<view class="right">
					{{item.createtime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	export default {
		data() {
			return {
				page:1,
				listdata:[],
				zong_number:0,
				canvaColumn:{},
				serverData:[],
				chartsdata:{
						"categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
						"series": [{
						"name": "目标值",
						"data": [600,600,600,600,600,600,600],
						"color": "#F5F5F5",
						"textColor":"#fff"
						}, {
						"name": "完成量",
						"data": [250,  376 , 432, 345, 112, 28],
						"color": "#1890ff"
						}]
				}
			}
		},
		//上拉加载
		onReachBottom() {
				this.getReach()
		},
		onLoad() {
			this.getServerData();
			// this.touchPie()
		},
		methods: {
			//获取数据
			getServerData(){
				var that=this
				that.$api.ajax('/api/Report/shtongji',"POST", {
					page: that.page,
					count: 20,
				}, function(res) {
					that.zong_number=res.data.data.zong_number
					var listnum=res.data.data.listnum
					console.log(listnum)
					var max=[]
					for(var i=0;i<7;i++){
						max.push(listnum.max)
					}
					that.chartsdata={
						"categories": listnum.listtime.reverse(),
						"series": [{
						"name": "目标值",
						"data": max,
						"color": "#F5F5F5",
						"textColor":"#fff"
						}, {
						"name": "完成量",
						"data": listnum.listcount.reverse(),
						"color": "#1890ff"
						}]
					}
					that.showColumn("canvasColumn",that.chartsdata)
					that.listdata=res.data.data.listdata.data
				},function(res){
					
				})
			},
			//加载更多数据
			getReach(){
				var that=this
				that.page++
				that.$api.ajax('/api/Report/shtongji',"POST", {
					page: that.page,
					count: 20,
				}, function(res) {
					console.log(res.data)
					that.listdata=[...that.listdata,...res.data.data.listdata.data]
				},function(res){
					
				})
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
			touchPie (e) {  
				this.canvaColumn.showToolTip(e, {
				  textList: [{ text: '日期:'}, { text: 'OEE:' }] ,
					format: function(item, category) {
						console.log(item)
						console.log(category)
					  this.textList = [{ text: ' 数值: ' + item.data }, { text: '日期 : ' + category}];
					}
				}) 
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
	.title{
		color: #141414;
		font-size: 42rpx;
		font-weight: bold;
		padding: 45rpx 0;
	}
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
	
	
	.charts{width: 700upx; height:660upx;background-color: #FFFFFF;}
	
	.list-item{
		padding: 20rpx 16rpx;
		border-radius:10rpx;
		background-color: #fff;
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			justify-content: space-between;
			.img{
				width: 68rpx;
				height: 68rpx;
			}
			.title{
				padding: 0;
				margin-left: 15rpx;
				font-size: 28rpx;
				color: #343434;
				line-height:68rpx;
			}
		}
		.right{
			color: #9A9A9A;
			font-size: 28rpx;
			line-height:68rpx;
			margin-right: 15rpx;
		}
	}
	
}
</style>
