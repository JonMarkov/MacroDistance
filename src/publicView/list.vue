<template>
	<div class="">
		<!--列表的第一个-->
		<div class="iteml ">
			<div style="display: flex;">
				<div class="portraitPhoto  list_com">
					<img  v-bind:src="dataList.screensHotUrl "  />
				</div>
				<div class="list_com listRight ">
					<p class="pad7">{{dataList.movieName}}<!---{{dataList.title}}--></p>
					<p class="pad8">{{dataList.salesCount }} ⼈正在推⼴赚钱</p>
					<p class="pad9">直推返奖 <label class="TextColor">￥{{dataList.salePrice  }}</label> 下级返奖 <label class="TextColor">￥ {{dataList.childSalePrice  }}</label> </p> 
					<div class="discounts">
						<div class="discountsLfte"><label class="redColo">￥ <span style="font-size: 24px;"> {{dataList.agencyPrice  }}</span></label> <label class="deleR">￥ {{dataList.price   }}</label></div>
						<div class="discountsRight">
							<span class="poiun"> <img src="../../static/img/icon减号@2x.png"/></span>
							<span class="numZk">
										 	1
										</span>
							<span class="poiun"> <img src="../../static/img/icon加号小@2x.png"/></span>
						</div>
					</div>
				</div>
			</div>
			<div class="tuiguang" v-if="none">
				<div class="LoadinButoin">推广中</div>
				<div class="tgWhite">
					<span>直推<span class="NuTui">3</span>勋章<span class="NuTui">1</span></span> <span class="Im_span"><img src="../../static/img/wenhao.png" /></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	/*	dataList是数据
		none  是控制是否可以有推广中的DIV*/
		props: ['dataList','none'],
		data() {
			return {
				
			}
		},
		methods: {
		},
		mounted: function() {
            
		}
	}
</script>

<style lang="scss">
	.iteml {
		margin: 12px 0px;
		height: 145px;
		.tuiguang {
			margin: 6px 0px;
			height: 28px;
			opacity: 1;
			background: #f7f7f7;
			padding-top: 4px;
			display: flex;
			.tgWhite {
				float: left;
				height: 16px;
				opacity: 1;
				font-size: 11px;
				font-family: PingFang SC;
				color: rgba(102, 102, 102, 1);
				letter-spacing: 0px;
				line-height: 26px;
				margin-left: 10px;
				.NuTui {
					width: 7px;
					height: 16px;
					opacity: 1;
					font-size: 11px;
					font-family: PingFang SC;
					color: rgba(13, 13, 13, 1);
					letter-spacing: 0px;
					font-weight: 900 !important;
					margin: 0px 10px;
				}
				.Im_span {}
				img {
					width: 10px;
					height: 10px;
					opacity: 1;
					vertical-align: middle;
				}
			}
			.LoadinButoin {
				width: 36px;
				height: 15px;
				opacity: 1;
				border-radius: 2px 2px 2px 2px;
				border: 1px solid #0080ff;
				color: #0080ff;
				font-size: 10px;
				line-height: 16px;
				text-align: center;
				margin-left: 5px;
				margin-top: 3px;
				margin-left: 14px;
				padding: 1px 3px;
			}
		}
		.portraitPhoto {
			width: 76px;
			height: 104px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.listRight {
			height: 104px;
			vertical-align: bottom;
			width: auto;
			margin-left: 10px;
			/* margin-right: 10px; */
			width: calc(100% - 86px);
			.discounts {
				display: flex;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;
				bottom: 0px;
				position: relative;
				bottom: 0px;
				margin-top: 10px;
				.discountsLfte {
					.deleR {
						text-decoration: line-through;
						opacity: 1;
						font-size: 11px;
						font-family: PingFang SC;
						color: rgba(102, 102, 102, 1);
						letter-spacing: 0px;
						margin-left: 10px;
					}
				}
				.discountsRight {
					vertical-align: super;
					img {
						width: 20px;
						height: 20px;
					}
					.numZk {
						vertical-align: inherit;
						display: inline-block;
						width: 20px;
						height: 22px;
						text-align: center;
						/* line-height: 27px; */
						margin-top: 4px;
					}
					.poiun {
						display: inline-block;
						width: 20px;
						height: 20px;
					}
				}
			}
			.pad7 {
				opacity: 1;
				font-size: 16px;
				font-family: PingFang SC;
				color: #0d0d0d;
				letter-spacing: 0px;
				font-weight: 900;
				line-height: 20px;
				overflow: hidden;
				/*自动隐藏文字*/
				text-overflow: ellipsis;
				/*文字隐藏后添加省略号*/
				white-space: nowrap;
				/*强制不换行*/
			}
			.pad8 {
				opacity: 1;
				font-size: 11px;
				font-family: PingFang SC;
				color: rgba(102, 102, 102, 1);
				letter-spacing: 0px;
				line-height: 30px;
			}
			.pad9 {
				opacity: 1;
				font-size: 11px;
				font-family: PingFang SC;
				color: rgba(102, 102, 102, 1);
				letter-spacing: 0px;
				line-height: 17px;
			}
		}
	}
</style>