<template>
    <div class="s-canvas">
       <canvas class="canvas" canvas-id="myCanvas" @click="onCanvas"></canvas>
    </div>
</template>
<script>
export default {
    name: 'SIdentify',
    props: {
        identifyCode: {
            type: String,
            default: '1234'
        }
    },
    methods: {
        draw(show_num) {
        		const ctx = uni.createCanvasContext('myCanvas');
        		ctx.setFillStyle('#fefefe')
        		ctx.fillRect(0,0,110,40)
        		for (var i = 0; i < 8; i++) {
        			var x = Math.floor(Math.random() * 110);
        			var y = Math.floor(Math.random() * 40);
        			var x1 = Math.floor(Math.random() * 110);
        			var y1 = Math.floor(Math.random() * 40);
        			ctx.beginPath();
        			ctx.setStrokeStyle(this.randomColor());
        			ctx.setLineWidth(1);
        			ctx.moveTo(x1, y1);
        			ctx.lineTo(x, y);
        			ctx.stroke();
        		}
        		ctx.setFontSize(24);
        		var arr = show_num.split('');
        		var tx = 0;
        		arr.forEach((e, i) => {
        		tx += 20;
        		var ty = Math.floor((Math.random()*4) + 24);
        		ctx.setFillStyle(this.randomColor());
        		if (e) {
        			ctx.fillText(e, tx, ty - 0.5);
        			ctx.fillText(e, tx - 0.5, ty);
        		}
        		ctx.fillText(e, tx, ty);
        		if (e) {
        			ctx.fillText(e, tx, ty + 0.5);
        			ctx.fillText(e, tx + 0.5, ty);
        		}
        		ctx.rotate((0.4-Math.random()) * 0.15);
        		});
        		ctx.draw();
        	},
        	//得到随机的颜色值
        	randomColor() {
        		var r = Math.floor(Math.random() * 256);
        		var g = Math.floor(Math.random() * 256);
        		var b = Math.floor(Math.random() * 256);	
        		return 'rgb(' + r + ',' + g + ',' + b + ')';
        	},
        
        	onCanvas() {
        		var show_num = this.identifyCode;
        		this.draw(show_num);
        	},
    },
    mounted() {
			var show_num = this.identifyCode;
			this.draw(show_num);
    }
}
</script>
<style lang="scss" scoped>
.canvas {
	width: 240rpx;
	height: 82rpx;
	border: 1px solid #e5e5e5;
}
</style>