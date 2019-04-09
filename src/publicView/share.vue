<template>
	<div class="shareDiv" @click="dso()" >
		<div>
			<img src="../../static/img/medal/shareImg.png" />
		</div>
	</div>
</template>

<script>
	export default {
		props: ["shares"],
		data() {
			return {
				dis: true
			}
		},
		methods: {
			dso: function() {
				/*console.log(this.dis);*/
				/*this.shares = !this.shares;*/
			}
		},
		mounted: function() {
             /*console.log(this.shares);*/
            
		},
		computed: {

		}
	}
</script>
<style lang="scss">
	.shareDiv {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 999;
		opacity: 0.8;
		background: rgba(0, 0, 0, 1);
		img {
			width: 142px;
			height: 128px;
			float: right;
			opacity: 1;
		}
	}
</style>