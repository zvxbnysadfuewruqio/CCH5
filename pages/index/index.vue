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

			</view>
		</view>
	</view>
</template>

<script>

	export default {

		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			
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
	
}
</style>
