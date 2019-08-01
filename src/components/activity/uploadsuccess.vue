<template>
  <div class="success-box">
    <img class="img-1" src="../../../static/img/activity/activity_img_4@2x.png">
    <div class="img-3">
      <img src="../../../static/img/activity/download@2x.png">
      <a class="f-btn" :href="link+'/jump'">下载APP</a>
    </div>
    <img class="img-2" src="../../../static/img/activity/title_3@2x.png">
    <div class="code">
      <img src="../../../static/img/activity/kkcode.png">
    </div>
  </div>
</template>
<script>
  import api from '../../axios/axios';
  // 封装的微信分享函数
  import wx from 'weixin-js-sdk'
  export default {
    name: 'uploadsuccess',
    components: {},
    data() {
      return {
        link:location.origin
      }
    },
    methods:{
      share() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // 重定向this值
        let _this = this;
        // 传参集合
        let param = {};
        // 请求接口的后缀
        let url = '';
        if (isAndroid) {
          // 安卓端
          var purl_1 = window.location.href
        }
        if (isiOS) {
          // ios端
          var purl_1 = window.initUrl
        }
        let purl = encodeURIComponent(window.location.href);
        param["url"] = purl;
        console.log(param)
        api.httpGet(param, function (data) {
          // 为点击域减去添加的class
          _this.wxInit(data);
        }, process.env.PLUS_API + "/user/login/shareAuthorize");
      },
      // 函数定义 二次微信分享使用方法
      wxInit(sd) {
        let _this = this
        let links = location.origin + "/activity" //分享出去的链接
        let title = "手机拍绵竹";  //分享的标题
        let desc = "你来选个地方吧，告诉导演，这里适合拍什么？"; //分享的详情介绍
        // let imgUrl = 'https://gitee.com/no_enterprise_avatar.png';
        let imgUrl = location.origin +"/static/img/activity/shareActivity.jpg";
        wx.config({
          debug: false,
          appId: process.env.WECHAT_APPID,
          timestamp: sd.data.timestamp,
          nonceStr: sd.data.nonceStr,
          signature: sd.data.signature,
          jsApiList: [
            'checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
          ]
        });
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {

            }
          });

          //微信分享菜单测试
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {

            }
          });
          wx.updateTimelineShareData({
            title: title, // 分享标题
            link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
            },
            cancel: function () {

            }
          });
          wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc,
            link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
            },
            cancel: function () {
            }
          });
        });
      }
    },
    mounted:function(){
      // 执行拦截器
      api.setTerminal("H5");
      api.setUserId(localStorage.userid?localStorage.userid:0)
      api.initInterceptors();
      this.share();
    }
  }
</script>
<style lang="scss" type="text/css">
  body{
    background: #F9F8F8;
  }
</style>
<style lang="scss" scoped="" type="text/css">
  .success-box{
    padding: 0 20px 44px 20px;
  }
  .success-box .img-1{
    width: 100%;
    display: block;
    margin: 60px auto 0;
  }
  .success-box .img-2{
    width: 173px;
    height: 40px;
    display: block;
    margin: 0 auto;
  }
  .success-box .code{
    width: 100px;
    height: 100px;
    border-radius: 3px;
    margin: 10px auto 0;
    background-color: #D6242B;
    padding: 10px;
  }
  .success-box .code img{
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
    background-color: #fff;
  }
  .success-box .img-3{
    margin-top: 35px;
    position: relative;
  }
  .success-box .img-3 img{
    width: 338px;
    max-width: 100%;
    display: block;
    margin: 0 auto;
    height: auto;
  }
  .success-box .img-3 .f-btn{
    bottom: 19%;
    left: 0;
    position: absolute;
    left: 50%;
    margin-left: -166px;
  }
  @media (max-width: 374px) {
    .success-box{
      padding:0 16px  44px 16px;
    }
    .success-box .img-3 .f-btn{
      margin-left: -143px;
    }
  }
</style>
