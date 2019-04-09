<template>
	<div class="">
		<!--列表的第一个-->
		<div class="iteml ">
			<div style="display: flex;">
				<div class="portraitPhoto  list_com">
					<img v-bind:src="dataList.screensHotUrl " />
				</div>
				<div class="list_com listRight ">
					<p class="pad7">{{dataList.movieName}}-{{dataList.title}}</p>
					<p class="pad8">{{dataList.salesCount }}w ⼈正在推⼴赚钱</p>
					<p class="pad9">直推返奖 <label class="TextColor">￥{{dataList.salePrice  }}</label> 下级返奖 <label class="TextColor">￥ {{dataList.childSalePrice  }}</label> </p>
					<div class="discounts">
						<div class="discountsLfte"><label class="redColo">￥ <span style="font-size: 24px;"> {{dataList.agencyPrice  }}</span></label> <label class="deleR">￥ {{dataList.price   }}</label></div>
						<div class="discountsRight">
							<span>购买</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		/*props: ['dataList'],*/
		data() {
			return {
				dataList: {

					agencyPrice: 3.99,
					childSalePrice: 0.2,
					ctime: "2019-01-30 22:12:38",
					movieDescription: "<p>2031年，人类试图阻止全球变暖的实验失败，极寒造成地球上绝大部分生命死亡。在冰河灾难中幸存下来的所有人登上了一辆如同诺亚方舟的列车，列车依靠永动机绕着地球不停行驶。在这列车厢有着等级之分的列车上，饱受饥饿之苦、生活在恶劣环境的末节车厢的人们在...↵↵ < br > < /p>",
					movieId: 1,
					movieName: "雪国列车",
					myTotleMoney: 0,
					price: 5,
					productId: 1,
					recommendPic: "https://static.kkstudy.cn/movie/1548857550755.jpg",
					salePrice: 1.3,
					salesCount: 93,
					screensHotUrl: "https://static.kkstudy.cn/movie/1548857545983.jpg",
					title: "2031年，人类试图阻止全球变暖的实验失败，极寒造成地球上绝大部分生命死亡。",
					type: 1,
					wantBuyAmount: null
				}
				/*dataList:{recommendPic:"../../static/img/售票机@2x.png"}*/
			}
		},
		methods: {

			/**/
		},
		mounted: function() {
			/*console.log(shen);*/
		}
	}
</script>

<style lang="scss">
	.iteml {
		margin: 15px 0px;
		height: 105px;
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
						color: rgba(216, 216, 216, 1);
						margin-left: 10px;
					}
				}
				.discountsRight {
					color: #000000;
					width: 32px;
					height: 15px;
					opacity: 1;
					background: rgba(255, 226, 150, 1);
					text-align: center;
					border-radius: 15px;
					font-size: 11px;
					font-family: PingFang SC;
					color: rgba(24, 24, 24, 1);
					padding: 3px;
					margin-top: 4px;
				}
			}
			.pad7 {
				opacity: 1;
				font-size: 16px;
				font-family: PingFang SC;
				color: #fff;
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
				color: rgba(216, 216, 216, 1);
				line-height: 30px;
			}
			.pad9 {
				opacity: 1;
				font-size: 11px;
				font-family: PingFang SC;
				color: rgba(216, 216, 216, 1);
				line-height: 17px;
			}
		}
	}
</style>