<template>
  <div>
    <div class="banner-box">
       <img src="../../../static/img/activity/banner@2x.png">
    </div>
    <div class="desc">
      <div class="bg"></div>
      <p>绵竹的父老乡亲们，绵竹要火啦！<br/>天天看看视频网站在咱们绵竹拍摄“恋上绵竹-101不得不说的故事”系列微剧微电影，演的都是咱们绵竹的故事哦！全部由咱们绵竹人自己选场景、写故事、做主演甚至当导演哦！有200多个演员出镜哦！你会不会是最火的那个？！<br/>天天看看联合四川文化传媒职业学院向全市民众征集影片选景地。咱们美丽的绵竹处处是都是拍摄地，也许在我的家里、你的园子里，也许在小区里、村子里，也许是在单位门口、学校校园，也许是在广场、公园、车站，也许是在湖边、山上……<br/>你来选个地方吧，告诉导演，这里可以讲啥子故事，适合拍什么片子——故事片？爱情片？悬疑片？风光片？武打片…… 用你的手机，拍摄你喜欢的场景，配上你的解说，上传到看看视频APP，会有惊喜哦！</p>
      <img class="title-bg" src="../../../static/img/activity/title_1@2x.png">
    </div>
    <div class="rewards-box">
      <img class="img" src="../../../static/img/activity/activity_2.png">
      <a href="https://item.taobao.com/item.htm?spm=a219t.7664554.1998457203.128.568135d9fE0tss&id=589074886339"><img class="adv-img" src="../../../static/img/activity/adv_banner@2x.png"></a>
      <img class="img" src="../../../static/img/activity/activity_1.png">
      <!--<ul class="rewards-list">-->
        <!--<li>-->
          <!--<img />-->
          <!--<p>金奖</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<img />-->
          <!--<p>金奖</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<img />-->
          <!--<p>铜奖</p>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<ul class="rewards-list rewards-list-1">-->
        <!--<li>-->
          <!--<img />-->
          <!--<p>参与奖</p>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
    <div class="rule-box">
      <p class="title-text">推荐视频示例</p>
      <div class="video-box">
        <video ref="videos" width="232" height="426" id="videoPlay" controls="controls" autoplay="autoplay">
          您的浏览器不支持 video 视屏播放。
        </video>
        <div class="cover" v-show="coverType" @click="playVideo">
          <div class="bg"></div>
          <img class="icon" src="../../../static/img/activity/pc/play_icon@2x.png">
        </div>
      </div>
      <form id="myForm" method="get" target="myFrame">
        <input type="hidden" name="gcid" id="gcid"/>
        <input type="hidden" name="bid" id="bid"/>
      </form>
      <iframe name="myFrame" id="myFrame" width="0px" height="0px;"></iframe>
    </div>
    <div class="join-box">
      <div class="title-box title-box-1">
        <img src="../../../static/img/activity/title_3@2x.png">
      </div>
      <div class="code">
        <img src="../../../static/img/activity/kkcode.png">
      </div>
    </div>
    <div class="introduction">
      <img class="introduce-img" src="../../../static/img/activity/introduce@2x.png">
      <ul class="introduction-box">
        <li>
          <span>主办单位：</span>
          <div>
            <p>深圳市天天看看信息技术有限公司</p>
            <p>四川文化传媒职业学院</p>
          </div>
        </li>
      </ul>
    </div>
    <!--<div class="f-btn-box">-->
      <!--<a class="f-btn" @click="uploadFuc">{{btnText}}</a>-->
      <!--&lt;!&ndash;<div class="line"></div>&ndash;&gt;-->
    <!--</div>-->
    <div class="mask" @click="modalHide()" v-if="modalShow"></div>
    <div class="modal-box" v-if="modalShow">
      <img src="../../../static/img/activity/modal_top_img.png">
      <div class="modal-content">
        <p class="text-1">本次获奖结果正在统计中，活动工作 人员将在7日后联系获奖人，沟通颁 奖事宜。</p>
        <p class="text-2">新的活动也在同步筹备中，欢迎保持关注~</p>
        <span class="btn-s">敬请期待</span>
      </div>
      <div class="close" @click="modalHide()"></div>
    </div>
  </div>
</template>
<script>
  import api from '../../axios/axios';
  // 封装的微信分享函数
  import wx from 'weixin-js-sdk'
  export default {
    name: 'activity',
    components: {},
    data() {
      return {
          link:location.origin,
          coverType:true,
          btnText:'立即上传',
          modalShow:true
      }
    },
    methods:{
      modalHide:function(){
        this.modalShow=false;
        $('body,html').removeClass('ovh');
      },
      uploadFuc:function(){
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
        if (browser.versions.mobile) {
          //获取判断用的对象
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
              if(this.$route.query.userid || localStorage.userid){
                window.location.href=this.link+'/uploadvideo';
              }else{
                window.location.href=this.link+'/?activity=1';
              }
//            window.location.href=this.link+'/jump';
          }else{
//              if(this.$route.query.userid && this.$route.query.ticket && this.$route.query.ticket.length>0 && this.$route.query.sessionid && this.$route.query.sessionid.length>0){
//                window.location.href=this.link+'/uploadvideo';
//              }
            //if(this.$route.query.ticket && this.$route.query.ticket.length>0 && (this.$route.query.ticket.indexOf("IOS")!=-1 || this.$route.query.ticket.indexOf("ANDROID")!=-1)){
            if(browser.versions.ios || browser.versions.android || (this.$route.query.ticket && this.$route.query.ticket.length>0 && (this.$route.query.ticket.indexOf("IOS")!=-1 || this.$route.query.ticket.indexOf("ANDROID")!=-1))){
                window.location.href=this.link+'/?type=openReleaseVideo';
            }else{
              //window.location.href=this.link+'/jump';
              alert("需要在微信客户端打开，才能上传作品哦~");
            }
          }
        }else{
          alert("需要在微信客户端打开，才能上传作品哦~");
          //window.location.href=this.link+'/jump';
        }
      },
      // 函数定义 用GCID请求视频
      GCVideo: function (res) {
        let _this = this
        document.domain = "kankan.com";
        $("#gcid").val("76ae7a5e816f40f2039db6e939c4c96357ce7da5");
        $("#bid").val("21");
        $("#myForm").attr("action", "http://mp4.cl.kankan.com/getCdnresource_flv");
        $("#myForm").submit();
        var ifrm1 = document.getElementById('myFrame');
        // 异步获取视频的播放源 用定时器实现
        setTimeout(function () {
          let timeSet = setInterval(function () {
            if (ifrm1.contentWindow.jsonObj.cdnlist1[0]) {
              let urlInfo = ifrm1.contentWindow.jsonObj.cdnlist1[0];
              let ip = urlInfo.ip;
              let port = urlInfo.port;
              let path = urlInfo.path;
              let movieUrl = "http://" + ip + path;
              _this.video_Src = movieUrl
              _this.$refs.videos.src = movieUrl;
              // 执行开始 获取video信息（获取完视频源再执行）异步
              clearInterval(timeSet)
            } else {
              // 刷新页面
            }
          }, 10)
        }, 100)
      },
      playVideo:function(){
        this.$refs.videos.play();
        this.coverType=false;
      },
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
    created() {
      if(this.$route.query.userid){
        localStorage.userid=this.$route.query.userid;
      }
      if(this.$route.query.ticket && this.$route.query.ticket.length>0){
          console.log("ticket="+this.$route.query.ticket)
        document.cookie="ticket="+this.$route.query.ticket;
        localStorage.sessionId=this.$route.query.sessionid;
      }
    },
    beforeMount() {
    },
    beforeUpdate() {
//      let _this = this
//      setTimeout(function () {
//        _this.share();
//        //函数执行 跳转第三方
//      }, 100)
    },
    mounted:function(){
      $("body,html").addClass("ovh");
      // 执行拦截器
      api.setTerminal("H5");
      api.setUserId(this.$route.query.userid?this.$route.query.userid:0)
      api.initInterceptors();
//      if(this.$route.query.ticket && this.$route.query.ticket.length>0 && (this.$route.query.ticket.indexOf("IOS")!=-1 || this.$route.query.ticket.indexOf("ANDROID")!=-1)){
//          this.btnText="立即上传"
//      }
      this.share();
      this.GCVideo();
    }
  }
</script>
<style lang="scss" type="text/css">
  body{
    background: #F9F8F8;
  }
  .ovh{
    height: 100%;
    overflow: hidden;
  }
</style>
<style lang="scss" scoped="" type="text/css">
  video{
    outline: none;
    object-fit: fill;
  }
  .banner-box img{
    width: 100%;
    height: auto;
    display: block;
  }
  .desc{
    font-size: 14px;
    color: #2C2C2C;
    text-align: center;
    line-height: 28px;
    position: relative;
    background: url("../../../static/img/activity/bg@2x.png") left bottom no-repeat;
    background-size: 100% auto;
    padding-bottom: 108px;
    margin-top: 15px;
  }
  .desc .title-bg{
    width: 79%;
    height: auto;
    position: absolute;
    left: 10.5%;
    bottom:18px;
    max-width: 296px;
  }
  .desc p{
    /*position: absolute;*/
    /*width: 100%;*/
    /*left:0;*/
    /*top:-22px;*/
    text-align: justify;
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 25px;
    font-size: 14px;
    color: #2c2c2c;
  }
  .title-box img{
    width: 104px;
    height: 83px;
    display: block;
    margin: 0 auto;
  }
  .title-box-1 img{
    width: 160px;
    height: 40px;
  }
  .rewards-box{
    padding: 0 20px;
  }
  .rewards-box img{
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    display: block;
  }
  .rewards-list{
    display:flex;
    justify-content:space-between;
    flex-direction:row;
    margin-top: 20px;
  }
  .rewards-box li{
    width: 100px;
  }
  .rewards-box li img{
    width: 100%;
    height: 100px;
    display: block;
    background-color: #fff;
  }
  .rewards-box li p{
    text-align: center;
    font-size: 14px;
    color: #000;
    line-height: 20px;
    margin-top: 10px;
  }
  .rewards-list-1 li{
    flex: 1;
  }
  .rule-box{
    padding: 0 20px;
  }
  .rule-box .title-text{
    text-align: center;
    font-size: 14px;
    line-height: 26px;
    color: #2C2C2C;
  }
  .rule-box li{
    display: flex;
  }
  .rule-box li p{
    flex: 1;
    margin-left: 4px;
    font-size: 14px;
    color: #2C2C2C;
    line-height: 26px;
  }
  .rule-box li i{
    font-style: normal;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: #D6242B;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    display: inline-block;
    margin-top: 5px;
    color: #fff;
  }
  .video-box{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 426px;
    position: relative;
  }
  .video-box video{
    background-color: #000;
  }
  .video-box .cover{
    width: 232px;
    height: 426px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -116px;
    margin-top: -213px;
    z-index: 1;
    background: url("../../../static/img/activity/d_cover.jpg") no-repeat;
    background-size: cover;
  }
  .video-box .cover .icon{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -15px;
    margin-left: -15px;
  }
  .video-box .cover .bg{
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  }
  .join-box .code{
    width: 100px;
    height: 100px;
    border-radius: 3px;
    margin: 10px auto 0;
    background-color: #D6242B;
    padding: 10px;
  }
  .join-box .code img{
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
    background-color: #fff;
  }
  .introduction{
    padding: 0 20px 48px 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    background: url("../../../static/img/activity/bg_1@2x.png") right bottom no-repeat;
    background-size: 100% auto;
  }
  .introduction .introduce-img{
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 33px;
  }
  .introduction-box{

  }
  .introduction-box li{
    display: flex;
    margin-bottom: 10px;
  }
  .introduction-box li:last-child{
    margin-bottom: 0;
  }
  .introduction-box li span{
    width: 65px;
    display: inline-block;
    color: #000;
    font-size: 12px;
    line-height: 17px;
    font-weight: bold;
  }
  .introduction-box li>div{
    flex: 1;
  }
  .introduction-box li>div p{
    color: #000;
    font-size: 12px;
    line-height: 17px;
    margin-bottom: 5px;
  }
  .introduction-box li>div>p:last-child{
    margin-bottom: 0;
  }
  .f-btn-box{
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 8px 0 5px 0;
    z-index: 1;
  }
  .f-btn-box .line{
    width: 120px;
    height: 4px;
    margin: 28px auto 0;
    background-color: #0D0D0D;
    border-radius: 2px;
  }
  .mask{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  .modal-box{
    width: 280px;
    height: 350px;
    background-color: #fff;
    position: fixed;
    z-index: 2;
    border-radius: 12px;
    left: 50%;
    top:50%;
    left: 50%;
    margin-top: -175px;
    margin-left: -140px;
  }
  .modal-box>img{
    width: 100%;
    height: 134px;
    display: block;
  }
  .modal-box .modal-content{
    padding: 26px 20px;
  }
  .modal-box .modal-content .text-1{
    line-height: 23px;
    font-size: 15px;
    color: #D70E19;
    text-align: justify;
  }
  .modal-box .modal-content .text-2{
    line-height: 23px;
    font-size: 13px;
    color: #767676;
    text-align: justify;
    margin-top: 9px;
    margin-left: -2px;
  }
  .modal-box .modal-content .btn-s{
    background: url("../../../static/img/activity/modal_btn.png") no-repeat;
    background-size: cover;
    color: #F9F8F8;
    line-height: 37px;
    width: 100%;
    display: block;
    text-align: center;
    margin-top: 25px;
  }
  .modal-box .close{
    position: absolute;
    width: 38px;
    height: 38px;
    background: url("../../../static/img/activity/modal_close_btn.png") no-repeat;
    background-size: cover;
    bottom: -78px;
    left: 50%;
    margin-left: -19px;
  }
  @media (min-width: 375px) {
    .desc .title-bg{
      width: 296px;
      left: 50%;
      margin-left: -148px;
    }
  }
  @media (max-width: 374px) {
    .rewards-box li{
      width: 85px;
    }
    .rewards-box li img{
      height: 85px;
    }
    .rule-box,.rewards-box,.introduction,.desc p{
      padding-left: 16px;
      padding-right: 16px;
    }
    .rule-box li p{
      font-size: 13px;
    }
  }
  @media (max-height: 568px) {
    .modal-box .close{
      bottom: -58px;
    }
  }
</style>
