<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>
<style lang="scss">
	@font-face {
		font-family: 'PingFang SC';
		src: url('assets/DINAlternate-bold.ttf');
	}

	#app {
		font-family: 'PingFang SC';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	p,
	blockquote,
	dl,
	dt,
	dd,
	ul,
	ol,
	li,
	pre,
	form,
	fieldset,
	legend,
	button,
	input,
	textarea,
	th,
	td,
	section,
	p,
	span,
	font,
	div {
		margin: 0;
		padding: 0;
		font-family: "PingFang SC";
	}

	body,
	button,
	input,
	select,
	textarea {}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
	}

	address,
	cite,
	dfn,
	em,
	var {
		font-style: normal;
	}

	code,
	kbd,
	pre,
	samp {
		font-family: "Microsoft yahei";
	}

	small {
		font-size: 12px;
	}

	ul,
	ol {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: #333;
	}

	a:hover {
		text-decoration: underline;
	}

	sup {
		vertical-align: text-top;
	}

	sub {
		vertical-align: text-bottom;
	}

	legend {
		color: #000;
	}

	fieldset,
	img {
		border: 0;
	}

	button,
	input,
	select,
	textarea {
		font-size: 100%;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	.borderRadius {
		border-radius: 25px;
	}

	.none {
		display: none;
	}

	.border {
		border: 1px solid red;
	}
	/*黄色的文字*/

	.TextColor {
		color: rgba(196, 162, 96, 1);
	}

	.redColo {
		color: rgba(234, 77, 74, 1);
	}
	/*div公用的行*/

	.list_com {
		display: inline-block;
	}
	/*下面部分和什么是勋章常见问题 还有赚攻略 一模一样只是拷贝了一下*/
	/*下面部分*/

	.Butjs {
		background-color: rgb(247, 247, 247);
		float: left;
	}
	.BudhDiv{
		margin-top: 15px;
	}
	.medalDescribe {
		margin: 0px 15px;
		width: calc(100% - 30);
		background: white;
		z-index: 4;
		padding-bottom: 5px;
		border-radius: 10px;
		margin-top: -86px;
		.Medalcontent {
			padding-top: 16px;
			font-weight: 900;
			.Tithu {
				font-size: 16px;
				color: rgba(13, 13, 13, 1);
				letter-spacing: 0px;
				display: inline-block;
				margin-left: 10px;
			}
			img {
				width: 11px;
				height: 11px;
			}
			.MeDeler {
				font-size: 13px;
				color: #666666;
				line-height: 22px;
				letter-spacing: 0px;
				font-weight: 500;
				display: inline-block;
				margin: 1px 25px;
				line-height: 21px;
				margin-top: 10px;
			}
		}
	}
	/*背景圖上面部分*/

	.Beijing {
		width: 100%;
		height: 150px;
		background-image: url(/static/img/beijing.fabe8ba.png);
		padding-top: 15px;
		display: flex;
		justify-content: space-between;
		z-index: 3;
		.Leftd {
			width: 40px;
			height: 40px;
			background: #ffe296;
			border-radius: 40px;
			text-align: center;
			margin-left: 15px;
			display: inline-block;
			position: absolute;
			img {
				width: 17px;
				height: 17px;
				margin-top: 10px;
			}
		}
		.medalTitle {
			width: 82px;
			height: 30px;
			font-size: 24px;
			font-family: WenYue XinQingNianTi (Non-Commercial Use);
			color: rgba(12, 12, 12, 1);
			letter-spacing: 0px;
			margin-left: -41px;
		}
		.medalTi {
			text-align: center;
			margin-left: 50%;
			img {
				margin-top: 6px;
			}
		}
	}
	/*购劵的那个点击按钮*/

	.payJuan {
		width: 96%;
		height: 50px;
		opacity: 1;
		background: rgba(255, 226, 150, 1);
		margin: 15px 2%;
		border: none;
		border-radius: 25px;
		font-size: 20px;
		color: rgba(13, 13, 13, 1);
		font-weight: 900;
	}
	/*下面常见问题和查看赚钱攻略的文字*/

	.problem {
		opacity: 1;
		font-size: 13px;
		color: rgba(102, 102, 102, 1);
		line-height: 22px;
		letter-spacing: 0px;
		text-align: center;
	}
  body{
    background: #000000;
  }
  /*新增的活动页全局按钮样式*/
  .f-btn{
    width: 333px;
    height: 44px;
    background: url("../static/img/activity/btn_bg@2x.png") no-repeat;
    background-size: cover;
    color: #F9F8F8;
    text-align: center;
    line-height: 44px;
    margin: 0 auto;
    font-weight: bold;
    display: block;
    text-underline: none;
    border: 0;
  }
  .f-btn-d{
    background-image: url("../static/img/activity/btn_gary@2x.png");
  }
  .f-btn:active,.f-btn:hover{
    text-decoration: none;
  }
  @media (max-width: 374px) {
    .f-btn{
      width: 287px;
      height: 38px;
      line-height: 38px;
    }
  }
</style>
