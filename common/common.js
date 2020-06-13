const common = {
	toDirect:(url)=>{
		uni.redirectTo({
			url:url
		})
	},
	toNav:(url)=>{
		uni.navigateTo({
			url:url
		})
	},
	toBack:()=>{
		uni.navigateBack({
			delta:1
		})
	},
	toSwitch:(url)=>{
		uni.switchTab({
			url:url
		})
	}
}

module.exports = common;