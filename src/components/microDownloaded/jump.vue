<template>
  <div>
    <div class="bg">
      <img src="https://static.kkstudy.cn/H5_images/jump_icon.png" class="jump_logo">
      <p class="jump_title">看看视频</p>
      <p class="jump_span">版本号 V{{version}}</p>
      <h2 class="jump_h2">千城同看看<br/>携手共未来</h2>
      <!--ios端-->
      <div class="jump_a" @click="iKanKan()">
        <p class="jump_ios" >打开APP</p>
      </div>
    </div>
    <!--    安卓端显示的在浏览器打开的指引图片-->
    <div class="back background" :style="{display:ATc}" @click="ClAnHide()">
      <div class="content div1">
        <img src="../../../static/img/Android.png"/>
      </div>
    </div>
    <!--    IOS端显示的在浏览器打开的指引图片-->
    <div class="back background" :style="{display:IosTc}" @click="ClIosHide()">
      <div class="content div1">
        <img src="../../../static/img/Safari@3x.png"/>
      </div>
    </div>
    <!-- 安卓端使用的弹窗-->
    <div id="background" class="back" :style="{display:tc}">
      <div id="div1" class="content">
        <div class="bg_tc">
          <img class="img-1" src="../../../static/img/logo-con@3x.png" height="60" width="60"/>
          <img class="img_2" @click="Ahide()" src="../../../static/img/up@3x.png" height="20" width="20"/>
          <p>千城同看看<br/>携手共未来</p>
          <a @click="Adown()">立即下载</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../axios/axios'
  export default {
    name: 'jump',
    components: {},
    data() {
      return {
        // 打开APP链接
        ikankan: '',
        // 安卓端下载的弹出啊是否显示
        tc: 'none',
        // 微剧ID
        productId: "",
        // 微剧子集ID
        setId: "",
        // 安卓的浏览器打开指引图片状态
        ATc: 'none',
        //IOS的浏览器打开指引图片状态
        IosTc: 'none',
        version:''
      }
    },
    // 进入页面开始调用 （async用于声明一个函数是异步的）
    created() {
      // 执行SessionId，把数据传到axios设置到headers
      api.setSessionId(this.UrlSessionId);
      // 获取子集ID
      this.setId = this.$route.query.setId;
      // 获取微剧ID
      this.productId = this.$route.query.productId;
      // 执行拦截器
      api.initInterceptors();
      // 函数执行 初始化存值
      this.jumpData()
    },
    beforeMount() {
      // 函数执行 请求配置参数
      this.stystemConfig()
      // 函数执行 IOS端自动跳转打开APP
      if (this.productId == '' || this.setId == '' || this.productId == undefined || this.setId == undefined) {
      } else {
        this.jumpInfo()
      }
    },
    methods: {
      // 函数定义 安卓端下载
      Adown() {
        window.location.href = "http://static.kankan.com/apk/Kankan_Xiangchao_h5.apk"
      },
      // 函数定义 安卓端关闭
      Ahide() {
        this.tc = "none"
      },
      // 函数定义 指引的弹窗关闭
      ClAnHide() {
        this.ATc = "none";
      },
      // 函数定义 函数的初始化存值
      jumpData() {
        this.productId = this.$route.params.productId
        this.setId = this.$route.params.setId
        this.ikankan = "ikankan://microVideoPage?productId=" + this.productId + "&setId=" + this.setId;
      },
      // 函数定义 IOS端自动跳转打开APP
      jumpInfo() {
        // 首先封装判断浏览器的函数对象
        var browser = {
          versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
              //移动终端浏览器版本信息
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
              iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
          }(),
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        //判断是否是移动设备打开。browser代码在下面
        if (browser.versions.mobile) {
          var ua = navigator.userAgent.toLowerCase();
          // 判断是否微信浏览器打开
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开不发生任何操作
          } else {
            // 非微信浏览器且是IOS设备
            if (browser.versions.ios) {
              // 设置时间阈值，在规定时间里面没有打开对应App的话，直接去App store进行下载。
              var loadDateTime = new Date();

              window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 2000) {
                  window.location.href = "https://plus-api.kankan.com/microVideoPage?productId=" + this.productId + "&setId=" + this.setId
                } else {
                  window.close();
                }
              }, 25);
              window.location.href = "https://itunes.apple.com/cn/app/id466321750?mt=8";
            }
          }
        }
      },
      // 函数定义 安卓端点击打开APP
      iKanKan: function () {
        let _this = this;
        // 首先封装判断浏览器的函数对象
        var browser = {
          versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
              //移动终端浏览器版本信息
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
              iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
          }(),
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        var ua = navigator.userAgent.toLowerCase();
        // 如果无微剧参数则直接打开市场或下载包
        if (_this.productId == '' || _this.setId == '' || _this.productId == undefined || _this.setId == undefined) {
          // 如果是IOS设备
          if (browser.versions.ios) {
            window.location = "https://itunes.apple.com/cn/app/id466321750?mt=8";
          }
          //如果是安卓设备
          if (browser.versions.android) {
            // 判断是否在微信浏览器中打开
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              //在微信中打开直接弹窗指引去浏览器中打开
              _this.ATc = "block"
            } else {
              // 如果不是微信浏览器直接下载安装包
              // location.href = "http://m.down.kankan.com/partner/Kankan_Xiangchao_h5.apk"
              let ikan = 'ikankan://microVideoPage'
              // 如果不是微信浏览器则执行下载流程
              location.href = ikan;
              setTimeout(function () {
                _this.tc = "block"
              }, 1000)
            }
          }
        }
        // 以下为有参数的情况
        else {
          // 如果是IOS设备
          if (browser.versions.ios) {
            // 如果是微信浏览器 则出现弹窗,IOS版本
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              _this.IosTc = "block"
            } else {
              // 如果不是微信浏览器则执行下载流程
              _this.jumpInfo()
            }
          }
          //如果是安卓浏览器
          if (browser.versions.android) {
            // 如果是微信浏览器， 则出现弹窗，安卓版本
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              _this.ATc = "block"
            } else {
              // 如果不是微信浏览器则执行下载流程
              location.href = this.ikankan;
              setTimeout(function () {
                _this.tc = "block"
              }, 1000)
            }

          }
        }
      },
      // 函数定义 请求接口更改配置文件
      stystemConfig:function () {
        let _this = this
        // GET请求
        api.httpGet({
          // 请求参数
            key: 'version',
          }, function (data) {
            // 返回的数据
            let resData = data.data
           console.log(resData)
          _this.version=resData
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microvision/getSystemConfig");
      }
    }
  }
</script>
<style>
  .background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 10000;
  }

  .div1 {
    background: #eeeeee;
    width: 70%;
    z-index: 1;
    margin: 12% auto;
    overflow: auto;
  }

  .div1 img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
  }
  a:link {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .bg_tc {
    position: fixed;
    background: #ffffff;
    width: 50%;
    border-right: 10px;
    margin-top: 50px;
    text-align: center;
    padding: 30px;
    border-radius: 10px;
  }

  .img-1 {
    margin-top: -50px;
  }

  .img_2 {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .bg_tc a {
    padding: 10px 25%;
    background: -webkit-gradient(linear, left top, left bottom, from(#FFF0D2), to(#FFD37A));
    background: linear-gradient(#FFF0D2, #FFD37A);
    border-radius: 10px;
    font-size: 14px;
  }

  .bg_tc p {
    font-size: 14px;
    font-weight: bold;
    margin: 20px;
  }

  #background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #div1 {
    /* background: #eeeeee; */
    width: 70%;
    /* z-index: 0000; */
    margin: 50% auto;
    overflow: auto;
    z-index: 10000;
    /* text-align: center; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body {
    background: #0d0d0d;
    width: 98%;
    height: 100%;
  }

  .bg {
    background: url("../../../static/img/bg_jump.png");
    background-size: 100% 100%;
    width: 100%;
    text-align: center;
    padding: 1rem 0rem;
  }

  .jump_logo {
    margin-top: 3rem;
    width: 30%;
    border-radius: 30px;
  }

  .jump_title {
    margin-top: 2rem;
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: bold;
    line-height: 0px;
  }

  .jump_span {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: #ffffff;
    opacity: 0.8;
  }

  .jump_h2 {
    margin-top: 3rem;
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 2rem;
  }

  .jump_a {

    width: 50%;
    margin: auto;
    background: #ffffff;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .jump_a img {
    width: 30px;
    margin-right: 20px;
  }

</style>
