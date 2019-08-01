<template>
  <div>
    <div class="banner-box">
      <img src="../../../static/img/activity/banner@2x.png">
    </div>
    <div class='desc'>
      <div class="bg"></div>
      <p :class='[moreType?"active":""]'>绵竹的父老乡亲们，绵竹要火啦！<br/>天天看看视频网站在咱们绵竹拍摄“恋上绵竹-101不得不说的故事”系列微剧微电影，演的都是咱们绵竹的故事哦！全部由咱们绵竹人自己选场景、写故事、做主演甚至当导演哦！有200多个演员出镜哦！你会不会是最火的那个？！<br/>天天看看联合绵竹市文化馆、四川文化传媒职业学院向全市民众征集影片选景地。咱们美丽的绵竹处处是都是拍摄地，也许在我的家里、你的园子里，也许在小区里、村子里，也许是在单位门口、学校校园，也许是在广场、公园、车站，也许是在湖边、山上……<br/>你来选个地方吧，告诉导演，这里可以讲啥子故事，适合拍什么片子——故事片？爱情片？悬疑片？风光片？武打片…… 用你的手机，拍摄你喜欢的场景，配上你的解说，上传到看看视频APP，会有惊喜哦！</p>
      <div class="btn-box" v-if="!moreType">
        <div  class="bg-1"></div>
        <div class="f-btn f-btn-1" @click="showMore()">阅读更多</div>
      </div>
    </div>
    <div class="rewards-box">
     <img class="top-box" src="../../../static/img/activity/case_bg_1.png">
     <div class="center-box">
       <div :class='["video-list",activityList.length<activityNum?"":"video-list-1"]'>
         <p class="titles"><span>共<em>&nbsp;{{activityNum}}&nbsp;</em>个作品</span></p>
         <dl class="list clearfix">
           <dd v-for="item in activityList" @click="videoDetail(item.id)">
             <div class="left-box">
               <div class="box">
                 <img :src="item.screensHotUrl">
                 <div class="cover"></div>
               </div>
               <i class="icon"></i>
             </div>
             <div class="right-box">
               <p class="title">{{item.name}}</p>
               <p class="desc">{{item.des}}</p>
               <div class="b-box">
                 <div class="info"><i class="eye-icon"></i><span>{{item.playCount>10000?parseInt(item.playCount/1000)/10+"w":item.playCount}}</span></div>
                 <div class="info"><i class="follow-icon"></i><span>{{item.likeCount>10000?parseInt(item.likeCount/1000)/10+"w":item.likeCount}}</span></div>
               </div>
             </div>
             <!--<div class="follow-box">-->
               <!--<i></i>-->
             <!--</div>-->
           </dd>
         </dl>
       </div>
       <div class="f-btn f-btn-1" v-show="activityList.length<activityNum" @click="activityMore()">加载更多</div>
     </div>
      <img class="bottom-box" src="../../../static/img/activity/case_bg_3.png">
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
      <ul class="introduction-box">
        <li>
          <span>主办单位：</span>
          <div>
            <p>绵竹市文化馆</p>
            <p>四川文化传媒职业学院</p>
            <p>深圳市天天看看信息技术有限公司</p>
          </div>
        </li>
        <li>
          <span>承办单位：</span>
          <div>
            <p>德阳市策源营销策划有限公司</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="f-btn-box">
      <a class="f-btn" @click="uploadFuc">{{btnText}}</a>
      <!--<div class="line"></div>-->
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
        moreType:false,
        activityList:[],
        activityNum:0,
        pageSize:6,
        startId:0,
        btnText:'下载APP 立即参与'
      }
    },
    methods:{
      videoDetail:function(id){
        //查询子集
        var _this=this;
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
          api.httpGet({
              productId:id
            }, function (data) {
              if(data.code==200 && data.data.length>0){
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                  window.location.href=_this.link+"/?productId="+data.data[0].movieId+"&setId="+data.data[0].setId
                }else{
                  alert("需要在微信客户端打开~");
                }
              }
            },
            // 请求的接口地址
            process.env.SVIDEO_API + "/microvision/getSetListByProductId");
        }else{
          alert("需要在微信客户端打开~");
        }
      },
      activityNumFuc:function(){
        var _this=this;
        api.httpGet({
          }, function (data) {
            if(data.code==200){
              _this.activityNum=data.data
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microDrama/countNum");
      },
      activityMore:function(){
          this.activityListFuc();
      },
      activityListFuc:function(){
        var _this=this;
        api.httpGet({
            startId:this.activityList.length==0?0:this.activityList[this.activityList.length-1].rowNum,
            pageSize:this.pageSize,
            sortType:2
          }, function (data) {
            if(data.code==200){
              _this.activityList=_this.activityList.concat(data.data);
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microDrama/getMicrovisionListForSquare");
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
//              if(this.$route.query.userid || localStorage.userid){
//                window.location.href=this.link+'/uploadvideo';
//              }else{
//                window.location.href=this.link+'/?activity=1';
//              }
            window.location.href=this.link+'/jump';
          }else{
//              if(this.$route.query.userid && this.$route.query.ticket && this.$route.query.ticket.length>0 && this.$route.query.sessionid && this.$route.query.sessionid.length>0){
//                window.location.href=this.link+'/uploadvideo';
//              }
            if(this.$route.query.ticket && this.$route.query.ticket.length>0 && (this.$route.query.ticket.indexOf("IOS")!=-1 || this.$route.query.ticket.indexOf("ANDROID")!=-1)){
              window.location.href=this.link+'/?type=openReleaseVideo';
            }else{
              window.location.href=this.link+'/jump';
            }
          }
        }else{
          //alert("需要在微信客户端打开，才能上传作品哦~");
          window.location.href=this.link+'/jump';
        }
      },
      playVideo:function(){
        this.$refs.videos.play();
        this.coverType=false;
      },
      showMore:function(){
          this.moreType=true;
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
      this.activityNumFuc();
      this.activityListFuc();
    },
    beforeUpdate() {
//      let _this = this
//      setTimeout(function () {
//        _this.share();
//        //函数执行 跳转第三方
//      }, 100)
    },
    mounted:function(){
      // 执行拦截器
      api.setTerminal("H5");
      api.setUserId(this.$route.query.userid?this.$route.query.userid:0)
      api.initInterceptors();
      if(this.$route.query.ticket && this.$route.query.ticket.length>0 && (this.$route.query.ticket.indexOf("IOS")!=-1 || this.$route.query.ticket.indexOf("ANDROID")!=-1)){
        this.btnText="立即上传"
      }
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
    /*background: url("../../../static/img/activity/bg@2x.png") left bottom no-repeat;*/
    /*background-size: 100% auto;*/
    /*padding-bottom: 108px;*/
    margin-top: -22px;
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
    height: 148px;
    overflow: hidden;
    line-height: 25px;
  }
  .desc p.active{
    height: auto;
  }
  .desc .btn-box{
    padding: 12px 0;
    position: relative;
  }
  .desc .bg-1{
    background: linear-gradient(rgba(253,252,252,0), rgba(249,248,248,1));
    height: 40px;
    width: 100%;
    position: absolute;
    left: 0;
    top:-44px;
  }
  .f-btn-1{
    width: 105px;
    height: 32px;
    line-height: 32px;
    background-image: url("../../../static/img/activity/btn_bg_1@2x.png");
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
  .rewards-box .f-btn{
    position: absolute;
    bottom: -5px;
    left: 50%;
    margin-left: -52px;
  }
  .rewards-box{
    padding: 0 20px;
  }
  .rewards-box .center-box{
    background: url("../../../static/img/activity/case_bg_2.png") repeat-y;
    background-size: 100% auto;
    padding: 12px 0;
    width: 100%;
    position: relative;
  }
  .rewards-box>img{
    width: 100%;
    height: auto;
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
  .join-box{
    margin-top: 28px;
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
    padding: 0 20px 88px 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    background: url("../../../static/img/activity/bg_1@2x.png") right bottom no-repeat;
    background-size: 100% auto;
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
  .video-list{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
    padding-bottom: 36px;
  }
  .video-list-1{
    padding-bottom: 0;
  }
  .video-list .titles{
    text-align: center;
    font-size: 12px;
    color: #333333;
    margin-top: -32px;
  }
  .video-list .titles em{
    color: #D70E19;
    font-style: normal;
  }
  .video-list .titles span{
    border-bottom: 1px solid #999;
    line-height: 18px;
    height: 18px;
    display: inline-block;
  }
  .video-list .title-box .text-1{
    float: left;
    font-size: 16px;
    line-height: 22px;
    color: #000;
    font-weight: bold;
  }
  .video-list .title-box .text-2{
    float: right;
    font-size: 12px;
    line-height: 22px;
  }
  .video-list .title-box .text-2 em{
    font-style: normal;
    color: #D70E19;
  }
  .video-list .list{
  }
  .video-list .list dd{
    display: flex;
    padding: 0 30px;
    margin-top: 20px;
  }
  .video-list .list .left-box{
    width: 80px;
    height: 140px;
    opacity: 1;
    background: #fff;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.2);
    position: relative;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .video-list .list .left-box .box{
    background-color: #000;
    width: 100%;
    height: 100%;
  }
  .video-list .list .left-box .box .cover{
    position: absolute;
    left: 4px;
    top:4px;
    height: 132px;
    width: 72px;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.2));
  }
  .video-list .list .left-box .box img{
    width: 100%;
    height: 100%;
    object-fit:cover
  }
  .video-list .list .left-box i{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    background: url("../../../static/img/activity/pc/play_icon@2x.png") no-repeat;
    background-size: cover;
  }
  .video-list .list .left-box .box{

  }
  .video-list .list .right-box{
    flex: 1;
    height: 140px;
    position: relative;
    margin-left: 10px;
    width: calc(100% - 145px);
  }
  .video-list .list .right-box .title{
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    line-height: 20px;
    margin-top: 10px;
  }
  .video-list .list .right-box .desc{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #666666;
    line-height: 17px;
    font-size: 12px;
    margin-top: 5px;
    text-align: justify;
  }
  .video-list .list .right-box .b-box{
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom:10px;
    width: 100%;
  }
  .video-list .list .right-box .b-box .info{
    float: left;
    width: 50%;
  }
  .video-list .list .right-box .b-box .info i{
    float: left;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 4px;
  }
  .video-list .list .right-box .b-box .info .eye-icon{
    width: 16px;
    height: 12px;
    background-image: url("../../../static/img/activity/pc/eye_icon@2x.png");
    margin-top: 2px;
  }
  .video-list .list .right-box .b-box .info .follow-icon{
    width: 15px;
    height: 13px;
    margin-top: 2px;
    background-image: url("../../../static/img/activity/pc/follow_icon@2x.png");
  }
  .video-list .list .right-box .b-box .info span{
    float: left;
    font-size: 12px;
    color: #666666;
    line-height: 17px;
  }
  .video-list .list .follow-box{
    margin-left: 15px;
  }
  .video-list .list .follow-box i{
    margin-top: 52px;
    width: 40px;
    height: 34px;
    display: inline-block;
    background: url("../../../static/img/activity/zan_icon_1.png") no-repeat;
    background-size: cover;
  }
  .video-list .list .follow-box i.active{
    background-image: url("../../../static/img/activity/zan_icon_active@2x.png");
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
    .video-list .list dd{
      padding: 0 20px;
    }
  }
</style>
