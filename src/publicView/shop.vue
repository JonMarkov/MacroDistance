<template>
	<div>
		<div class="Mysho" >
			<!--上面購物車的顯示-->
			<div class="shopCar" v-if="XianD">
				<div class="ShoTitle" style="padding: 0px 10px;">
					<span class="ShoTitleLeft">购物车</span>
					<span class="ShoTitleRight">
						<img src="../../static/img/laji.png" @click="dele()"/>
						全部清空
						<img src="../../static/img/cha.png"  @click="Xianl()"/>
						
					</span>
				</div>
				<div class=" ShoTitle MoList" v-for="item in datalist">
					<span class="  ShoTitleLeft2" v-text="item.name"></span>
					<span class="ShoTitleRight">
							<img src="../../static/img/icon减号@2x.png"  @click="figure(1,item)"/>
					<span class="numd">{{item.num}}</span>
					<img src="../../static/img/icon添加_1@2x.png" @click="figure(2,item)" />
					<!--v-if="item.num>=1"-->
					</span>
				</div>
				<div style="height: 70px;">

				</div>
			</div>
			<!--第一個購物車-->
			<div class="shopping">
				<div style="display:inline-block ;" v-if="ZonMoney<1">
					<img src="../../static/img/售票机@2x.png" class="shopImg" @click="Xianl()" />
				</div>

				<div class=" shoWhite">
					购券1张<br /> 即可成功开店
				</div>
				<div class="shopp_Right ">
					<span class="Rght">点击<img src="../../static/img/icon加号小@2x.png"  />  <br /></span> 选择要推广的视频
				</div>

			</div>
			<!--第二個購物車-->
			<div class=" shopping shoppings" v-if="ZonMoney>0">
				<div style="display:inline-block ;">
					<img src="../../static/img/售票机@2x.png" class="shopImg" @click="Xianl()" />
				</div>
				<div class="ShopMiun">
					{{ZonMoney}}
				</div>
				<div class=" shoWhite  shoWhiteDs">
					￥ {{topprice}}<br /> <span>购券即获得视频售卖权</span>
				</div>
				<div class="shopp_Rightd " id="shopp_Rightd" @click="PayShop()">
					确认
				</div>

			</div>
		</div>
		<div class="pay shopCar" v-if="PayD">
			<div class="ShoTitle">
				<div style="padding: 0px 10px;">
					<span class="ShoTitleLeft">购物车</span>
					<span class="ShoTitleRight"  @click="Pay()">
							<img src="../../static/img/cha.png" />
							
						</span>
					<div class="Videohint">
						<span class="xiaoyu"  @click="PayShop()"> < </span> <span class="VideohinPL">视频券 <label>3</label> 張,可以从以下渠道购买</span>
					</div>
				</div>
				<!--<div class="PayList">
					<span id="">
                     	<img src="../../static/img/pay/blokNice.png" class="NiceBkl"/>
                     </span>
					<span class="BopBunf">
                     	<img src="../../static/img/big_back.png" class="BTop"/>
                     	<span class="GuanF">官方</span>
					</span>
					<span class="PayNmae">
						<label>看看视频官方店</label><br />
						<label class="NmaId">ID: 3568915313</label>
					</span>
					<span class="PayMoney">
						<label class="">￥ 110.56</label><br />
						<span class="tuidj">推广中</span><span class="DeMoney">124.99</span>
					</span>
				</div>-->
				<div class="PayList">
					<span id="">
                     	<img src="../../static/img/pay/blokNice.png" class="NiceBkl"/>
                     </span>
					<span class="BopBunf">
                     	<img src="../../static/img/big_back.png" class="BTop"/>
                     	<span class="GuanF GuanFmaster">师傅</span>
					</span>
					<span class="PayNmae">
						<label>看看视频官方店</label><br />
						<label class="NmaId">ID: 3568915313</label>
					</span>
					<span class="PayMoney">
						<label class="">￥ 110.56</label><br />
						<span class="tuidj">推广中</span><span class="DeMoney">124.99</span>
					</span>
				</div>
				<div class="PayList">
					<span id="">
                     	<img src="../../static/img/pay/blokNice.png" class="NiceBkl"/>
                     </span>
					<span class="BopBunf">
                     	<img src="../../static/img/big_back.png" class="BTop"/>
                     	<span class="GuanF GuanNew">新店</span>
					</span>
					<span class="PayNmae">
						<label>看看视频官方店</label><br />
						<label class="NmaId">ID: 3568915313</label>
					</span>
					<span class="PayMoney">
						<label class="">￥ 110.56</label><br />
						<span class="tuidj">推广中</span><span class="DeMoney">124.99</span>
					</span>
				</div>
				<div class="payButtonD">
					支付
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				/*支付頁面的控制*/
				PayD:false,
				/*是否顯示*/
				XianD: false,
				/*列表*/
				datalist: [{
						name: "战狼2",
						num: 0,
						price: 10
					},
					{
						name: "战狼2",
						num: 0,
						price: 10
					},
					{
						name: "战狼2",
						num: 0,
						price: 10
					}
				]
			}
		},
		methods: {
			/*点击加减操作1 是减  2是 加*/
			figure: function(num, thi) {
				if(num == 1) {
					if(thi.num > 0) {
						thi.num = thi.num - 1;
					}
				} else if(num == 2) {
					thi.num = thi.num + 1;
				}
			},
			/*删除购物车列表*/
			dele: function() {
				this.datalist = [];
			},
			/*购物车显示的切换*/
			Xianl: function() {
				this.XianD = !this.XianD;
			},
			/*支付页面的切换*/
			Pay:function (){
				this.PayD = !this.PayD;
			},
			/*購物車和支付頁面的切換*/
			PayShop:function (){
				this.Xianl();
				this.Pay();
			}
			
		},
		mounted: function() {

		},
		computed: {
			/*总数量*/
			ZonMoney: function() {
				var num = 0;
				this.datalist.forEach(function(element, index) {
					num += element.num;

				})
				return num;
			},
			/*书的总价格*/
			topprice: function() {
				var price = 0;
				this.datalist.forEach(function(element, index) {
					price += element.price * element.num;
				})
				return price;
			}
		}
	}
</script>

<style lang="scss">
	/*最后支付按钮*/
	.payButtonD {
		bottom: 0px;
		position: fixed;
		left: 0px;
		bottom: 12px;
		margin: 0px 3%;
		width: 94%;
		height: 50px;
		z-index: 10;
		background: #18b34c;
		border-radius: 25px;
		text-align: center;
		line-height: 50px;
		color: white;
		font-size: 20px;
	}
	/*支付頁面*/
	
	.PayList {
		height: 49px;
		margin-top: 1px;
		background: rgba(255, 255, 255, 1);
		padding: 0px 10px;
		line-height: 10px;
		.tuidj {
			width: 30px;
			height: 7px;
			border-radius: 2px 2px 2px 2px;
			border: 1px solid #0080ff;
			font-size: 10px;
			color: #0080ff;
			padding: 4px 2px;
			display: inline-block;
			margin-top: 9px;
			text-align: center;
		}
		.DeMoney {
			font-size: 10px;
			font-family: DIN Alternate;
			color: #666666;
			text-decoration: line-through;
			width: 38px;
			display: inline-block;
			text-align: right;
		}
		.PayMoney {
			width: 85px;
			height: 25px;
			font-size: 18px;
			font-family: DIN Alternate;
			color: #0d0d0d;
			display: inline-block;
			float: right;
			padding-top: 10px;
		}
		.PayNmae {
			display: inline-block;
			font-size: 15px;
			color: #0d0d0d;
			line-height: 19px;
			/* padding-top: 0px; */
			margin-left: 7px;
			font-weight: 900;
			.NmaId {
				font-size: 11px;
				color: rgba(102, 102, 102, 1);
				display: inline-block;
			}
		}
		.NiceBkl {
			width: 20px;
			/* height: 20px; */
			margin: 0px 10px 0px 0px;
			vertical-align: super;
		}
		.BTop {
			height: 24px;
			width: 24px;
			border-radius: 15px;
		}
		.BopBunf {
			display: inline-block;
			width: 25px;
			height: auto;
			margin-top: 6px;
		}
		.GuanF {
			width: 20px;
			height: 10px;
			color: white;
			background: #0080ff;
			margin-top: 10px;
			padding: 2px;
			font-size: 9px;
			margin-top: 2px;
			display: inline-block;
			text-align: center;
		}
		.GuanFmaster {
			background: rgba(234, 77, 75, 1);
		}
		.GuanNew {
			background: rgba(197, 162, 97, 1);
		}
	}
	
	.pay {
		.Videohint {
			font-size: 13px;
			color: rgba(102, 102, 102, 1);
			line-height: 20px;
			padding-bottom: 14px;
			.xiaoyu {
				margin-top: -4px;
				display: inline-block;
				vertical-align: middle;
			}
			.VideohinPL {
				margin: 0px 10px;
				vertical-align: middle;
				display: inline-block;
			}
		}
	}
	/* 设置滚动条的样式 */
	
	 ::-webkit-scrollbar {
		width: 3px;
	}
	/*滚动槽*/
	
	 ::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	/* 滚动条滑块 */
	
	 ::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
	}
	
	 ::-webkit-scrollbar-thumb:window-inactive {
		background: rgba(255, 0, 0, 0.4);
	}
	/*购物车*/
	
	.shopCar {
		overflow-y: auto;
		.numd {
			width: 13px;
			display: inline-block;
			text-align: center;
		}
		.ShoTitle {
			line-height: 40px;
			font-size: 15px;
			height: 40px;
			.ShoTitleLeft {
				font-size: 15px;
				color: #0d0d0d;
				font-weight: 900;
			}
			.ShoTitleRight {
				float: right;
				display: inline-block;
				img {
					width: 16px;
					height: 16px;
					vertical-align: middle;
					margin: 0px 6px;
				}
			}
		}
		.ShoTitleLeft2 {
			font-weight: 500;
		}
		.MoList {
			height: 50px;
			background: rgba(255, 255, 255, 1);
			font-size: 13px;
			color: rgba(13, 13, 13, 1);
			font-weight: 500;
			line-height: 50px;
			padding: 0px 10px;
			margin-top: 1px;
		}
		bottom: 0px;
		position: fixed;
		left: 0px;
		width: 100%;
		height: 296px;
		background: rgba(247, 247, 247, 1);
		z-index: 9;
		border-radius:10px 10px 0px 0px;
	}
	/*最底部的购物车*/
	/*购物车无点击过程*/
	
	.shopping {
		bottom: 0px;
		position: fixed;
		left: 0px;
		bottom: 12px;
		margin: 0px 3%;
		width: 94%;
		height: 50px;
		background: #666666;
		-webkit-box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.3);
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.3);
		border-radius: 25px;
		z-index: 9;
		.shopImg {
			width: 60px;
			height: 60px;
			margin-top: -10px;
			margin-left: 3px;
		}
		.shopp_Right {
			float: right;
			font-size: 13px;
			color: rgba(255, 255, 255, 1);
			padding-right: 16px;
			padding-top: 6px;
			img {
				width: 12px;
				height: 12px;
				vertical-align: middle;
				margin-left: 5px;
			}
			.Rght {
				text-align: right;
				display: block;
				margin-right: -4px;
				line-height: 20px;
			}
		}
		.shoWhite {
			display: inline-block;
			vertical-align: top;
			width: 78px;
			height: 36px;
			font-size: 13px;
			color: white;
			line-height: 20px;
			padding-top: 6px;
			margin-left: 3px;
		}
	}
	/*购物车点击过程*/
	
	.shoppings {
		height: 50px;
		background: rgba(0, 0, 0, 1) !important;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.3);
		.ShopMiun {
			width: 24px;
			height: 24px;
			line-height: 24px;
			background: rgba(234, 77, 74, 1);
			border-radius: 25px;
			text-align: center;
			position: absolute;
			margin-left: 41px;
			margin-top: -73px;
			color: white;
			/* padding: 3px; */
		}
		.shoWhiteDs {
			font-size: 20px;
			font-family: DIN Alternate;
			color: rgba(255, 255, 255, 1);
			span {
				font-size: 13px;
				color: rgba(255, 255, 255, 1);
			}
		}
		.shopp_Rightd {
			float: right;
			width: 120px;
			height: 50px;
			background: #ffe296;
			border-radius: 0px 24px 24px 0px;
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			color: rgba(13, 13, 13, 1);
		}
	}
</style>