<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: 'ground',
    components: {},
    data() {
      return {}
    },
    // 进入页面开始调用 （async用于声明一个函数是异步的）
    created() {
      var _this = this
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
      //判断是否是移动设备打开
      if (browser.versions.mobile) {
        //获取判断用的对象
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //在微信中打开
          // 把获取到的code值写入本地缓存函数执行
          this.UrlCode()
          // 跳转授权函数执行
          this.goToJump()
        } else {
          if(this.$route.query.activity){
            window.location.href=this.getDomain() + "/activity";
            return false
          }else{
            // 获取到微剧ID
            let productId = this.$route.query.productId;
            // 获取到微剧子集ID
            let setId = this.$route.query.setId;
            // 获取到微剧名称
            let productName = this.$route.query.productName;
            _this.$router.push({
              name: 'getuserinfoqq',
              params: {productId: productId, setId: setId, productName: productName}
            })
          }
        }
      } else {
        //否则就是PC浏览器打开
      }
    },
    methods: {
      // 获取url的Code值，并写入缓存定义
      UrlCode() {
        // 获取到微剧ID
        this.productId = this.$route.query.productId;
        // 获取到微剧子集ID
        this.setId = this.$route.query.setId;
        // 获取到微剧名称
        this.productName = this.$route.query.productName;
        // 把微剧名字存入本地缓存
        localStorage.productName = this.$route.query.productName;
        //活动字段
        this.activity = this.$route.query.activity;
      },
      // 跳转授权函数定义
      goToJump() {
        var currentDomain = this.getDomain();
        // APPId
        var appid = process.env.WECHAT_APPID;
        var wechatUrl = process.env.WECHAT_AUTH; /*process.env.WECHAT_AUTH;*/
        var redirectUri = encodeURI(process.env.REDIRECT_URI);
        var end = "#wechat_redirect";
        var state = ''
        if(this.activity){
          state = currentDomain + "/activity";

        }else{
          state = currentDomain + "/index?productId=" + this.productId + "&setId=" + this.setId;
        }
        state = encodeURI(state);
        // 重定向跳转的参数
        const params = {
          "appid": appid,
          "redirect_uri": redirectUri,
          "response_type": "code",
          "scope": "snsapi_userinfo",
          "state": state,
        }
        console.log(params);

        var query = this.encodeSearchParams(params);

        var url = wechatUrl.concat("?", query, end);
        window.location.href = url;
      },
      /*获取本地IP和host*/
      getDomain() {
        var protocal = document.location.protocol;
        var host = document.location.host;
        return protocal + "//" + host
      },
      /*进行编码*/
      encodeSearchParams(obj) {
        const params = []
        Object.keys(obj).forEach((key) => {
          let value = obj[key]
          // 如果值为undefined我们将其置空
          if (typeof value === 'undefined') {
            value = ''
          }
          // 对于需要编码的文本（比如说中文）我们要进行编码
          params.push([key, encodeURIComponent(value)].join('='))
        })
        return params.join('&')
      }
    }
  }
</script>

<style scoped>

</style>
