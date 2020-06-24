<template>
	<view class="satisfaction">
		<view class="dizhi">
			<picker class="picker"  @change="bindPickerChange1" :value="index1" :range="array1">
				<view class="p-item">{{array1[index1]}}</view>
			</picker>
			<view class="san"></view>
		</view>
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
		
		<!-- 月度数据统计 -->
		<view class="seven">
			<view class="yuedu">
				<view class="title">月度数据统计</view>
				<view class="yuefen">
					<picker class="picker"  @change="bindPickerChange" :value="index" :range="array">
						<view class="p-item">{{array[index]}}</view>
					</picker>
					<view class="san"></view>
				</view>
				
			</view>
			<view class="ss">
				<canvas canvas-id="canvasColumnH" id="canvasColumnH" class="charts2"></canvas>
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
				year:2020,
				yue:1,
				array: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				index: 0,
				ddData:0,
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
				},
				chartsdataH:{
						"categories": ["收运量", "发电量", "提油量"],
						"series": [{
						"name": "服务总单量",
						"data": [600,600,600],
						"color": "#F5F5F5",
						"textColor":"#fff"
						}, {
						"name": "服务总单量",
						"data": [250,  376 , 432],
						"color": "#1C78F1"
						}],
				},
				array1: ["全国"],
				index1: 0,
				citys:[]
			}
		},
		onLoad() {
			var that=this
			var date = new Date();
			that.year=date.getFullYear();
			that.yue=date .getMonth();
			that.index=date .getMonth();
			_self = this;
			this.getCitys()
			// this.getServerData();
			// _self.showRing("canvasRing",this.chartData);
			// this.showColumn("canvasColumn",this.chartsdata)
			// this.showColumnH("canvasColumnH",this.chartsdataH)
		},
		methods: {
			//选择省份
			bindPickerChange1: function(e) {
					console.log('picker发送选择改变，携带值为', e.target.value)
					this.index1 = e.target.value
					this.getServerData()
			},
			getCitys(){
				var that=this
				that.$api.ajax('/api/Sijifank/city_contract',"POST", {
				}, function(res) {
					console.log(res.data.data)
					var citys=[]
					var data=res.data.data
					data.forEach(item=>{
						citys.push(item.name)
					})
					that.array1=citys
					that.citys=data
					that.getServerData()
				},function(res){
					
				})
			},
			//选择月份
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.target.value)
					this.index = e.target.value
					this.yue=e.target.value
					this.getServerData()
			},
			getServerData(){
				var that=this
				that.$api.ajax('/api/Report/fanktongji',"POST", {
					chengshi:that.array1[that.index1],
					yue: that.yue+1+"",
					year: that.year+'',
				}, function(res) {
					var data=res.data.data
					//客户订单统计
					that.chartData= {
						"series": [{
						"name": "服务总单量:"+data.khdingdannum.zongliang+"单",
						"data": data.khdingdannum.zongliang,
						"color":"#1C78F1"
						}, {
						"name": "投诉量:"+data.khdingdannum.toushuliang+"单",
						"data": data.khdingdannum.toushuliang,
						color:"#E84846"
						}]
					}
					that.ddData=data.khdingdannum.manyidu
					that.showRing("canvasRing",that.chartData);
					
					var max=[]
					for(var i=0;i<7;i++){
						max.push(data.jinqitmydlist.number)
					}
					
					//近七天满意度统计
					that.chartsdata={
							"categories": data.jinqitmydlist.listtime.reverse(),
							"series": [{
							"name": "服务总单量",
							"data": max,
							"color": "#F5F5F5",
							"textColor":"#fff"
							}, {
							"name": "服务总单量",
							"data": data.jinqitmydlist.qizong_count.reverse(),
							"color": "#1C78F1"
							},{
							"name": "投诉量",
							"data": data.jinqitmydlist.qitousu_count.reverse(),
							"color": "#E84846",
							// "textColor":"#000"
							}],
					}
					that.showColumn("canvasColumn",that.chartsdata)
					
					
					var zongedu=[]
					var cats=[]
					var wanchengedu=[]
					data.yuelltj.forEach(item=>{
						if(item.type==1){
							cats.push("收运量")
							zongedu.push(item.zongedu)
							wanchengedu.push(item.wanchengedu)
						}else if(item.type==2){
							cats.push("发电量")
							zongedu.push(item.zongedu)
							wanchengedu.push(item.wanchengedu)
						}else if(item.type==3){
							cats.push("提油量")
							zongedu.push(item.zongedu)
							wanchengedu.push(item.wanchengedu)
						}
					})
					console.log(zongedu)
					console.log(cats)
					console.log(wanchengedu)
					that.chartsdataH={
							"categories":cats,
							"series": [{
								"name": "服务总单量",
								"data":zongedu,
								"color": "#F5F5F5"
								}, {
								"name": "服务总单量",
								"data": wanchengedu,
								"color":"#1C78F1"
								}],
						}
					that.showColumnH("canvasColumnH",that.chartsdataH)
					console.log(data)
				},function(res){
					
				})
			},
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
						name: _self.ddData+'%',
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
					dataLabel: false,
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
		
		showColumnH(canvasId,chartData){
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
					disabled:true,
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
	
	.yuedu{
		display: flex;
		justify-content: space-between;
		padding: 45rpx 0;
		.title{
			padding: 0;
		}
		.yuefen{
			background-color: #fff;
			height: 50rpx;
			width: 160rpx;
			color: #131313;
			font-size: 30rpx;
			border-radius: 25rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.san{
				margin-left: 10rpx;
				width: 0;
				height: 0;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-top: 8rpx solid #000;
			}
		}
	}
	.dizhi{
		background-color: #fff;
		height: 80rpx;
		width: 200rpx;
		color: #131313;
		font-size: 30rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
		.san{
			margin-left: 10rpx;
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 8rpx solid #000;
		}
	}
}
</style>