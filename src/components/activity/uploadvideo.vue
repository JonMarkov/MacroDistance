<template>
  <div>
    <div class="upload-box" v-show="loadShow">
      <div class="top">
        <span>{{(percentage==100?"上传完成":"上传中")+percentage}}%</span><i></i>
        <em v-if="type==1" @click="stop()">暂停</em>
        <em v-else-if="type==2" @click="start()">继续</em>
      </div>
      <div class="progress"><div class="nums" :style="'width:'+percentage+'%'"></div></div>
    </div>
    <button class="upload-btn" v-show="!loadShow">
      <span><i></i>选择视频</span>
      <input ref="video" accept="video/*" type="file" @change="uploadFuc()" />
    </button>
    <div class="desc">
      <p class="text-1">MP4、AVI、MOV常见视频格式竖版最佳比例9:16<br/>时间大于15秒小于60秒</p>
      <p class="text-2">上传视频，即表示您已同意天天看看上传服务条款，<br/> 请勿上传色情，反动等违规视频。</p>
    </div>
    <div class="form-box">
      <div class="item-box">
        <div class="title">作品标题<span>*</span></div>
        <div class="input-box">
          <input type="text" @change="changeTitle()" @input="inputTitle" v-model="title" placeholder="10字以内" maxlength="10" />
        </div>
      </div>
      <div class="item-box">
        <div class="title">一句话描述</div>
        <div class="input-box">
          <textarea type="text" v-model="desc" @input="inputDesc"  placeholder="30字以内" maxlength="30"></textarea>
        </div>
      </div>
      <p class="msg-box">{{msgText}}</p>
      <button :class="['f-btn',btnType?'':'f-btn-d']" @click="submitFuc()">提交</button>
    </div>
  </div>
</template>
<script>
  import api from '../../axios/axios';
  // 封装的微信分享函数
  import wx from 'weixin-js-sdk'
  let OSS = require('ali-oss');
  export default {
    name: 'uploadvideo',
    components: {},
    data() {
      return {
          loadShow:false,
          uploadParams:null,
          btnType:false,
          title:"",
          desc:"",
          percentage:0,
          msgText:"",
          videoInfo:null,
          fileInfo:null,
          disable:false,
          link:location.origin,
          tempCheckpoint:null,
          client:null,
          type:0,
          stopLoading:false
      }
    },
    methods: {
      getUploadAuthor:function(){
        let _this = this
        // POSt请求
        //获取上传的key等参数
        api.httpPost({
          }, function (data) {
            _this.uploadParams=data.data;
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/mianzhu/getUploadAuthor");
        //获取id和文件夹
        api.httpPost({
          }, function (data) {
            if(data.code==200){
              _this.fileInfo=data.data;
              _this.desc=_this.fileInfo.nickName+"的看看视频，快来看看。"
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microDrama/uploadMicroBefore");
      },
      uploadFuc:function(){
        this.msgText='';
        if(this.$refs.video.files[0].size/1024/1024>500){
            this.msgText="视频不能大于500M";
            return false;
        }
        if(this.uploadParams && this.fileInfo){
          this.loadShow=true;
        }else{
            return false;
        }
        let _this = this;
        this.client = new OSS({
          //region: '',
          accessKeyId: this.uploadParams.accessKeyId,
          accessKeySecret: this.uploadParams.accessKeySecret,
          stsToken: this.uploadParams.securityToken,
          bucket: 'app-ugc-upload',
          endpoint:'oss-cn-hangzhou.aliyuncs.com'
        });
        // 上传
        this.type=1
        this.client.multipartUpload(this.fileInfo.folder+"/"+localStorage.userid+"_"+this.$refs.video.files[0].name, this.$refs.video.files[0], {
          progress: function (percentage, cpt,res) {
            _this.stopLoading=false;
            // 上传进度
            _this.percentage = Math.floor(percentage * 100);
            console.log(cpt)
            _this.tempCheckpoint=cpt;
           // console.log();
          },
          checkpoint:this.tempCheckpoint
        }).then((results) => {
          // 上传完成
          this.type=0
          this.videoInfo=results;
          console.log(this.videoInfo)
          if(this.title.length>0 && this.videoInfo && this.videoInfo.name){
            this.btnType=true
          }else{
            this.btnType=false
          }
        }).catch((err) => {
          this.type=2
          if(err.status==0 && err.name=="cancel"){
            this.msgText="已暂停";
          }else{
//            this.loadShow=false;
//            this.msgText="上传失败请重新上传";
          }
          this.stopLoading=true;
          console.log(err);
        })
      },
      stop:function(){
        if(!this.stopLoading){
          this.type=2
          this.client.cancel()
        }
      },
      start:function(){
        if(this.stopLoading){
          this.$refs.video.files[0]=this.tempCheckpoint.file
          this.uploadFuc();
          this.msgText="";
        }
      },
      changeTitle:function(){
        if(this.title.length==0){
            this.msgText="请输入作品标题"
        }else {
          this.msgText=""
        }
      },
      inputTitle:function(e){
        this.title = this.title.replace(/\ud83d[\udc00-\ude4f\ude80-\udfff]/g, '');
        if(this.title.length==0){
          this.msgText="请输入作品标题"
        }else {
          this.msgText=""
        }
        if(this.title.length>0 && this.videoInfo && this.videoInfo.name){
          this.btnType=true
        }else{
          this.btnType=false
        }
      },
      inputDesc:function(){
        this.desc = this.desc.replace(/\ud83d[\udc00-\ude4f\ude80-\udfff]/g, '');
      },
      submitFuc:function(){
        var _this=this;
        // POSt请求
        if(!this.disable && this.btnType){
          this.disable=true
          api.httpPost({
              path:this.videoInfo.name,
              id:this.fileInfo.videoId,

            }, function (data) {
              _this.disable=false
              if(data.code==200){
                api.httpPost({
                    title:_this.title,
                    type:1,
                    represent:_this.desc,
                    videoId:_this.fileInfo.videoId,
                    cCode:244,
                    cName:"德阳市",
                    pCode:28,
                    pName:"四川省",
                    image:"",
                    activityId:10

                  }, function (data) {
                    _this.disable=false
                    if(data.code==200){
                      window.location.href=_this.link+"/uploadsuccess"
                    }
                  },
                  // 请求的接口地址
                  process.env.SVIDEO_API + "/microDrama/saveMicroInfo",{},
                  function(err){
                    _this.disable=false
                  });
              }else{
                _this.disable=false
              }
            },
            // 请求的接口地址
            process.env.SVIDEO_API + "/microDrama/uploadMicroAfter",{},
            function(err){
              _this.disable=false
            });
        }
      },
      // 函数定义 获取Cookie
      getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
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
    beforeCreate:function(){
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
        if (ua.match(/MicroMessenger/i) != "micromessenger" && document.cookie.length==0) {
          window.location.href=location.origin+"/activity"
        }
      }
    },
    created() {
      if(!localStorage.userid){
        window.location.href=this.link+"/?activity=1"
      }else{
        api.setUserId(localStorage.userid);
      }
      if(!this.getCookie('ticket')){
        window.location.href=this.link+"/?activity=1"
      }
      api.setTicket(this.getCookie('ticket'));
      if(this.getCookie('ticket').indexOf("IOS")!=-1){
        api.setTerminal("IOS");
        api.setSessionId(localStorage.sessionId);
      }else if(this.getCookie('ticket').indexOf("ANDROID")!=-1){
        api.setTerminal("ANDROID");
        api.setSessionId(localStorage.sessionId);
      }
      // 执行拦截器
      api.initInterceptors();

    },
    beforeMount() {
      this.getUploadAuthor();
    },
    mounted(){
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
.upload-btn{
  width: 335px;
  height: 50px;
  background-color: #D6242B;
  text-align: center;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  outline: none;
  border: 0;
  margin: 28px auto 0;
  display: block;
  position: relative;
  overflow: hidden;
}
.upload-btn span{
  padding-left: 54px;
  display: inline-block;
  position: relative;
}
.upload-btn i{
  position: absolute;
  left:0;
  display: inline-block;
  width: 36px;
  height: 22px;
  background: url("../../../static/img/activity/video_icon@2x.png");
  background-size: cover;
  top:50%;
  margin-top: -11px;
}
.desc{
  width: 280px;
  margin: 14px auto 0;
}
.desc p{
  font-size: 12px;
  line-height: 17px;
}
.desc .text-1{
  margin-bottom: 4px;
  color: #C2C2C2;
  text-align: center;
}
.desc .text-2{
  color: #9E9E9E;
}
.form-box{
  padding: 0 20px;
  margin-top: 22px;
}
.form-box .item-box .title{
  font-size: 16px;
  color: #2C2C2C;
  line-height: 22px;
  font-weight: bold;
  margin-top: 11px;
  margin-bottom: 8px;
}
.form-box .item-box:first-child .title{
  margin-top: 0;
}
.form-box .item-box .title span{
  color: #FB1212;
  margin-left: 5px;
}
.form-box .item-box .input-box{

}
.form-box .item-box .input-box input,.form-box .item-box .input-box textarea{
  width: 100%;
  background-color: #fff;
  padding: 10px;
  font-size: 14px;
  color: #000;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;
}
.form-box .item-box .input-box textarea{
  resize: none;
  height: 68px;
  color: #979797;
}
input::-webkit-input-placeholder{
  color: #979797;
}
.f-btn{
  outline: none;
}
.msg-box{
  margin-top: 20px;
  height: 22px;
  line-height: 22px;
  color: #D6242B;
  font-size: 12px;
}
.upload-box{
  padding: 0 20px;
  margin-top: 24px;
}
.upload-box .top{
  overflow: hidden;
}
.upload-box .top span{
  float: left;
  font-size: 16px;
  line-height: 22px;
  color: #2C2C2C;
  margin-top: 10px;
}
.upload-box .top i{
  float: left;
  width: 16px;
  height: 30px;
  display: inline-block;
  background: url("../../../static/img/activity/upload_icon@2x.png");
  background-size: cover;
  margin-left: 4px;
}
.upload-box .top em{
  float: right;
  font-size: 14px;
  color: #D6242B;
  width: 30px;
  padding-top: 10px;
}
.progress{
  width: 100%;
  height: 6px;
  border: 1px solid #D6242B;
  box-sizing: border-box;
  border-radius: 3px;
  margin-top: 5px;
}
.progress .nums{
  background-color: #D6242B;
  width: 0%;
  height: 100%;
}
.upload-btn input{
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
@media (max-width: 374px) {
  .upload-btn{
    width: 286px;
    height: 44px;
    line-height: 44px;
  }
  .upload-btn i{
    width: 31px;
    height: 19px;
    margin-top: -9px;
  }
  .form-box{
    padding: 0 16px;
  }
}
</style>
