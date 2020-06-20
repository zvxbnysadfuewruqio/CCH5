<template>
	<!-- 注册 -->
	<view class="login">
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!-- 欢迎登录丛丛生态圈！ -->
			<view class="title">欢迎登录丛丛生态圈!</view>
			<!-- 登录框 -->
			<view class="input-content">
				<view class="input-item">
					<view class="input-name">
						<image src="../../static/img/username.png"></image>
					</view>
					<input
						type="text" 
						:value="username" 
						placeholder="请输入帐号"
						placeholder-class="input-class"
						maxlength="11"
						data-key="username"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<view class="input-name">
						<image src="../../static/img/possword.png"></image>
					</view>
					<input
						type="password" 
						:value="password" 
						placeholder="请输入密码"
						maxlength="20"
						placeholder-class="input-class"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="set-code">
					<view class="input-item">
						<view class="input-name">
							<image src="../../static/img/code.png"></image>
						</view>
						<input
							type="text" 
							:value="code" 
							placeholder="请输入验证码"
							placeholder-class="input-class"
							maxlength="4"
							data-key="code"
							class="code"
							@input="inputChange"
						/>
					</view>
					<view class="get-code" @tap="refreshCode">
						<s-identify :identifyCode="identifyCode"></s-identify>
					</view>
				</view>
			</view>
			<!-- 登录按钮 -->
			<view class="regist" @tap="toLogin">确认登录</view>

		</view>
		<!-- 协议 -->
		<view class="quicklogin-agreement">
			<view class="agreement">
				丛丛生态有限公司版权所有
			</view>
		</view>
	</view>
</template>

<script>
	import SIdentify from '../../components/sidentify'
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				username: '',
				password: '',
				code:'',
				identifyCodes: "1234567890qwertyuiopasdfghjklzxcvbnm",
				identifyCode: "",
			}
		},
		onLoad(){
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			toLogin(){
				var that=this
				console.log(that.code,that.identifyCode)
				if(that.username == ''){
				   	that.$api.msg('请输入账号！');
					return;
				}
				if(that.password == ''){
				   	that.$api.msg('请输入登录密码！');
					return;
				}
				if(that.code == "") {
					that.$api.msg('验证码错误');
					that.code = ''
					// that.refreshCode()
					return
				}
				//登录
				that.$api.ajax('/api/Report/login',"GET", {
					username: that.username,
					password: that.password,
				}, function(res) {
					console.log(res.data)

					uni.switchTab({
						url:'/pages/index/index'
					})
				},function(res){
					
				})
				// uni.switchTab({
				// 	url:'/pages/index/index'
				// })
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			makeCode(o, l) {
				for(let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}

			}
		},
		components: {
			SIdentify
		}

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
	}
	.login{
		position:relative;
		width: 100vw;
		/* height: calc(100vh - 44px); */
		height:100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		/* padding-bottom: 40upx; */
		padding: 0 84rpx;
		.title{
			color:#131313;
			font-size: 46rpx;
			font-weight:bold;
			padding: 230rpx 0 52rpx 0;
		}
		.input-content{
			.input-item{
				margin-bottom: 40rpx;
				background-color: #F5F5F5;
				border-radius: 40rpx;
				position: relative;
				input{
					height: 82rpx;
					margin-left: 80rpx;
				}
				.input-name{
					position: absolute;
					top:18rpx;
					left:31rpx;
					/* bottom: 21rpx; */
					width: 40rpx;
					height: 40rpx;
					color: #ccc;
					font-size: 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.input-mima{
					position: absolute;
					top:21rpx;
					left:34rpx;
					/* bottom: 21rpx; */
					width: 32rpx;
					height: 39rpx;
					color: #ccc;
					font-size: 40rpx;
				}
			}
			.set-code{
				display: flex;
				justify-content: space-between;
				.input-item{
					width: 320rpx;
				}
				.get-code{
					width: 240rpx;
					text-align: center;
					height: 82rpx;
					/* border-radius: 40rpx; */
					/* border: 1px solid #E1E1E1; */
					line-height: 82rpx;

				}
			}
		}
		.regist{
			/* width: 580rpx; */
			height: 88rpx;
			background-color: #31C45C;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			color: #fff;
			margin-top: 63rpx;
			margin-bottom: 40rpx;
		}
	}
	.quicklogin-agreement{
		position: absolute;
		left:85rpx;
		bottom: 42rpx;
		width: 580rpx;
		text-align: center;
		.agreement{
			color: #999999;
			font-size: 24rpx;
			text{
				color: #31C45C;
			}
		}
	}
	.input-class{
		color: #CCCCCC;
		font-size: 30rpx;
	}
</style>
