<template>
  <div class="activity-box" id="top">
    <div class="header-box">
      <div class="container-box clearfix">
        <div class="logo">
          <img src="../../../static/img/activity/pc/logo@2x.png">
        </div>
        <ul class="right-nav clearfix">
          <li><a href="#top">手机拍绵竹</a></li>
          <li><a href="#activity-Info">活动详情</a></li>
          <li><a href="javascript:void(0)" @click="modalType=true">上传作品</a></li>
        </ul>
      </div>
    </div>
    <div class="content-box">
      <div class="video-box" v-show="activityNum!=0">
        <div class="container-box clearfix">
          <div class="video-play">
            <div class="box" v-on:click="playVideo()">
              <video ref="videosTop" id="videos-top" loop="loop" width="300" height="540"  volume="1.0" autoplay="autoplay">
                您的浏览器不支持 video 视屏播放。
              </video>
              <div class=""></div>
              <form id="myForm1" method="get" target="myFrame1">
                <input type="hidden" name="gcid" />
                <input type="hidden" name="bid" />
              </form>
              <iframe name="myFrame1" id="myFrame1" width="0px" height="0px;"></iframe>
              <div class="videoPlay_pending" v-if="playHide">
                <img src="../../../static/img/video/play@2x.png">
              </div>
              <div class="cover"></div>
              <div class="title">
                <p class="text-1">{{selectVideo?selectVideo.name:""}}</p>
                <p class="text-3" v-if="selectVideo && selectVideo.nickName">{{"@"+selectVideo.nickName}}</p>
                <p class="text-2">{{selectVideo?selectVideo.des:""}}</p>
              </div>
              <div class="optionBox">
                <div class="option_see" @click="linkClick()">
                  <img src="../../../static/img/video/video_look.png">
                  <p v-if="selectVideo">{{selectVideo.playCount>10000?parseInt(selectVideo.playCount/1000)/10+"w":selectVideo.playCount}}</p>
                  <p v-else>0</p>
                </div>
                <div class="option_give" @click="linkClick()">
                  <img src="../../../static/img/video/video_fa.png">
                  <p v-if="selectVideo">{{selectVideo.likeCount>10000?parseInt(selectVideo.likeCount/1000)/10+"w":selectVideo.likeCount}}</p>
                  <p v-else>0</p>
                </div>
                <div class="option_head" v-if="selectVideo && selectVideo.headPic">
                  <img :src="selectVideo?selectVideo.headPic:''">
                </div>
              </div>
            </div>
          </div>
          <div class="video-list">
            <div class="title-box clearfix">
              <span class="text-1">作品展示</span>
              <span class="text-2">共&nbsp;<em>{{activityNum}}</em>&nbsp;个作品</span>
            </div>
            <ul class="list clearfix">
              <li v-for="item in activityList">
                <div class="left-box" @click="playListvideo(item)">
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
              </li>
            </ul>
            <div class="paging">
              <Page @jumpPage="jumpPage" :total-count="activityNum" :page-number="selectPage" :page-size-array="[pageSize]"></Page>
            </div>
          </div>
        </div>
      </div>
      <div class="container-box">
        <div class="anchor" id="activity-Info"></div>
        <div class="banner-box">
          <img src="../../../static/img/activity/pc/banner@2x.png">
        </div>
        <div class="activity-desc">
          <p>绵竹的父老乡亲们，绵竹要火啦！<br/>天天看看视频网站在咱们绵竹拍摄“恋上绵竹-101不得不说的故事”系列微剧微电影，演的都是咱们绵竹的故事哦！全部由咱们绵竹人自己选场景、写故事、做主演甚至当导演哦！有200多个演员出镜哦！你会不会是最火的那个？！<br/>天天看看联合四川文化传媒职业学院向全市民众征集影片选景地。咱们美丽的绵竹处处是都是拍摄地，也许在我的家里、你的园子里，也许在小区里、村子里，也许是在单位门口、学校校园，也许是在广场、公园、车站，也许是在湖边、山上……<br/>你来选个地方吧，告诉导演，这里可以讲啥子故事，适合拍什么片子——故事片？爱情片？悬疑片？风光片？武打片…… 用你的手机，拍摄你喜欢的场景，配上你的解说，上传到看看视频APP，会有惊喜哦！</p>
          <img src="../../../static/img/activity/pc/font_img@2x.png">
        </div>
        <div class="activity-img">
          <img src="../../../static/img/activity/activity_2.png">
          <img src="../../../static/img/activity/activity_1.png">
        </div>
        <div class="recommend-box">
          <p class="title">推荐视频示例</p>
          <div class="video-box"><!--muted-->
            <video ref="videos" id="videos"  width="232" height="426" controls="controls">
              您的浏览器不支持 video 视屏播放。
            </video>
            <form id="myForm" method="get" target="myFrame">
              <input type="hidden" name="gcid" />
              <input type="hidden" name="bid" />
            </form>
            <iframe name="myFrame" id="myFrame" width="0px" height="0px;"></iframe>
          </div>
        </div>
        <div class="join-box">
          <div class="title-box title-box-1">
            <img src="../../../static/img/activity/title_3@2x.png">
          </div>
          <div class="code">
            <img src="../../../static/img/activity/kkcode.png">
          </div>
        </div>
        <div class="units-box">
          <img class="introduce-img" src="../../../static/img/activity/introduce@2x.png">
          <ul>
            <li>
              <p><span class="text-1">主办单位：</span><span class="text-2">深圳市天天看看信息技术有限公司</span></p>
              <p><span class="text-1">&nbsp;</span><span class="text-2">四川文化传媒职业学院</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer id="kankan-footer" class="footer">
      <div class="wrapper">
        <ul class="footer_ul">
          <li><a href="http://www.12377.cn/" target="_blank"><img src="http://misc.web.kankan.com/www/v10/img/icp_2.png">互联网违法和不良信息举报中心</a></li>
          <li><a href="http://www.kankan.com/zheng/stxkz.html" target="_blank">信息网络传播视听许可证1908323号</a></li>
          <li><a href="http://misc.web.kankan.com/www_v7/testimg/2.jpg" target="_blank">广播电视节目制作经营许可证（粤）字第01738号</a></li>
          <li><a href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/6a33fa8a42304575aca0d4e551ca7b8f" target="_blank"><img src="http://misc.web.kankan.com/www/v10/img/icp_4.png">互联网文化经营单位</a></li>
          <li><a href="http://misc.web.kankan.com/www_v7/testimg/zengzhi.jpg" target="_blank">增值电信业务经营许可证粤B2-20170523号</a></li>
          <li><a href="http://misc.web.kankan.com/www_v7/testimg/4.pdf" target="_blank">互联网出版许可证新出网证（粤）字053号</a></li>
          <li><a href="http://szcert.ebs.org.cn/301c5bca-cbab-4e0f-9cce-e111ebef8d07"><img src="http://misc.web.kankan.com/www/v10/img/icp_3.png" width="12" height="12">深圳市市场监督管理局（工商网监）</a></li>
          <li><a href="http://www.beian.miit.gov.cn/" target="_blank">备案号: 粤ICP备15049026号</a></li>
          <li><a href="http://misc.web.kankan.com/www_v7/testimg/1.jpg" target="_blank">网络文化经营许可证粤网文[2016]5612-1340号</a></li>
          <li><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502002153" target="_blank"><img src="http://misc.web.kankan.com/www/v10/img/icp_5.png" width="12" height="12">备案号: 粤公网安备 44030502002153号</a></li>
          <li><a href="http://misc.web.kankan.com/www_v7/testimg/3.jpg" target="_blank">互联网药品信息服务资格证书（粤）-非经营性-2016-0165</a></li>
        </ul>
        <a class="footer_qr" href="http://www.kankan.com/app/xckk.html" target="_blank"><img src="http://misc.web.kankan.com/www/v10/img/footer_qr.png"></a>
      </div>
      <p class="footer_cp">Copyright © 2003-2017 Kankan.com 版权所有<span style="margin-left: 15px;">不良信息举报电话：0755-88111710</span></p>
    </footer>
    <div class="upload-box">
      <img class="bg" src="../../../static/img/activity/pc/upload_bg@2x.png">
      <div class="ewm">
        <div class="icon-box">
          <img class="icon" src="../../../static/img/activity/pc/ewm_icon_red@2x.png">
          <img class="ewm-img" src="../../../static/img/activity/pc/kk_app_ewm@2x.png">
          <p>下载看看视频APP<br/>上传作品</p>
        </div>
        <div class="icon-box">
          <img class="icon" src="../../../static/img/activity/pc/ewm_icon_red@2x.png">
          <img class="ewm-img" src="../../../static/img/activity/pc/kk_wx_ewm@2x.png">
          <p>扫码进群了解<br/>最新活动信息</p>
        </div>
      </div>
    </div>
    <div class="mask" v-show="modalType" @click="modalType=false"></div>
    <div class="upload-modal" v-show="modalType">
      <i class="close" @click="modalType=false"></i>
      <p class="title">上传作品</p>
      <div class="modal-bg">
        <p>看看视频APP中上传作品并<br/>选择活动#手机拍绵竹<br/>即可参加活动得万元大奖</p>
        <div class="ewm-box clearfix">
          <div class="left-code-box">
            <img src="../../../static/img/activity/pc/kk_app_ewm@2x.png">
            <p>下载APP</p>
          </div>
          <div class="right-code-box">
            <img src="../../../static/img/activity/pc/kk_wx_ewm@2x.png">
            <p>扫码入群</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../axios/axios';
//  import QRCode  from "qrcodejs2";
  import Page from './page.vue';
  export default {
    name: 'index',
    components: {
//        QRCode,
        Page
    },
    data() {
      return {
        modalType:false,
        link:location.origin,
        activityList:[],
        playHide:true,
        selectVideo:null,
        activityNum:0,
        pageSize:6,
        selectPage:1,
        videoSon:[],
        playType:true
      }
    },
    methods:{
//  生成二维码
//      qrcode (id,width,height,link) {
//        let that = this;
//        let qrcode = new QRCode(id, {
//          width: width,
//          height: height,
//          text:  link,
//        })
//      },
      playListvideo:function(item){
          if(this.playType){
            this.playType=false
            this.selectVideo=item;
            this.playHide=false;
            this.videoSonFuc(item.id)
          }
      },
      playVideo:function(){
        if(this.playHide){
            this.playHide=false;
            this.$refs.videosTop.play();
        }else{
          this.playHide=true;
          this.$refs.videosTop.pause();
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
      activityListFuc:function(){
        var _this=this;
        api.httpGet({
            startId:(this.selectPage-1)*this.pageSize,
            pageSize:this.pageSize,
            sortType:2
          }, function (data) {
            if(data.code==200){
              _this.activityList=data.data;
              if(_this.$refs.videosTop.src.length==0){
                  if(!_this.selectVideo){
                    _this.selectVideo=_this.activityList[0];
                    if(_this.activityList.length>0){
                      _this.videoSonFuc(_this.activityList[0].id)
                    }
                  }
              }
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microDrama/getMicrovisionListForSquare");
      },
      //视频子集
      videoSonFuc:function(id){
        var _this=this;
        api.httpGet({
            productId:id
          }, function (data) {
            if(data.code==200){
              _this.videoSon=data.data;
              if(_this.videoSon.length>0){
                _this.GCVideo(_this.videoSon[0].moviesSetScreenList[_this.videoSon[0].moviesSetScreenList.length-1].mp4Gcid,"videosTop","myFrame1","myForm1");
              }else{
                _this.playType=true;
              }
            }else{
              _this.playType=true;
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microvision/getSetListByProductId");
        //获取作者等信息
        api.httpGet({
            productId:id
          }, function (data) {
            if(data.code==200){
              if(data.data){
                var temp=_this.selectVideo;
                _this.selectVideo={..._this.selectVideo,"nickName":data.data.nickName,"headPic":data.data.headPic}
              }
            }else{
              _this.playType=true;
            }
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/author/getAuthorInfoByProductId");
      },
      jumpPage:function (page) {
        this.selectPage=page.currentPage;
        this.activityListFuc();
      },
      // 函数定义 用GCID请求视频
      GCVideo: function (gcid,name,id,formId) {
        let _this = this;
        console.log(document.domain.indexOf("kankan.com"))
        if(document.domain.indexOf("kankan.com")!=-1) {
          document.domain = "kankan.com";
          $("#" + formId + " input[name='gcid']").val(gcid);
          $("#" + formId + " input[name='bid']").val("21");
          $("#" + formId).attr("action", "http://mp4.cl.kankan.com/getCdnresource_flv");
          $("#" + formId).submit();
          var ifrm1 = document.getElementById(id);
          console.log(ifrm1)
          // 异步获取视频的播放源 用定时器实现
          setTimeout(function () {
            let timeSet = setInterval(function () {
              if (ifrm1.contentWindow.jsonObj && ifrm1.contentWindow.jsonObj.cdnlist1[0]) {
                let urlInfo = ifrm1.contentWindow.jsonObj.cdnlist1[0];
                let ip = urlInfo.ip;
                let port = urlInfo.port;
                let path = urlInfo.path;
                let movieUrl = "http://" + ip + path;
                _this.$refs[name].src = movieUrl
                // 执行开始 获取video信息（获取完视频源再执行）异步
                if (!_this.playType) {
                  _this.playType = true;
                }
                clearInterval(timeSet);
              } else {
                // 刷新页面
              }
            }, 10)
          }, 100)
        }else{
          if (!_this.playType) {
            _this.playType = true;
          }
        }
      }
    },
    created() {
        var _this=this;
      this.$nextTick (function () {
//        this.qrcode("qrcode",100,100,this.link+"/activity");
//        this.qrcode("code-bg",210,210,this.link+"/activity");
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '../../../static/img/activity/pc/miznzhu_favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
        document.getElementById("videos-top").addEventListener('play', function () {
          _this.playHide=false;
          _this.$refs.videos.pause();
        }, false);
        document.getElementById("videos").addEventListener('play', function () {
          _this.playHide=true;
          _this.$refs.videosTop.pause();
        }, false);
      })
    },
    beforeCreate(){
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
        window.location.href=location.origin+'/activity';
      }else{
      }
    },
    beforeMount() {
      this.activityNumFuc();
      this.activityListFuc();
    },
    mounted:function(){
      this.GCVideo("76ae7a5e816f40f2039db6e939c4c96357ce7da5","videos","myFrame","myForm");
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
  .clearfix:after{
    content:".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden
  }
  .activity-box{
    font: 12px/1.5 Arial,"hiragino sans gb","microsoft yahei",simsun,Helvetica,sans-serif;
    color: #333;
    padding-top: 60px;
  }
  .container-box{
    width: 940px;
    margin: 0 auto;
    position: relative;
  }
  .header-box{
    background-color: #fff;
    box-shadow: 0 3px 8px 0px rgba(0,0,0,0.2);
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .header-box .logo{
    float: left;
    margin-top: 16px;
  }
  .header-box .logo img{
    width: 112px;
    height: 28px;
  }
  .header-box .right-nav{
    float: right;
  }
  .header-box .right-nav li{
    float: left;
    margin-right: 50px;
  }
  .header-box .right-nav li:last-child{
    margin-right: 0;
  }
  .header-box .right-nav li a{
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    line-height: 60px;
  }
  .header-box .right-nav li a:hover{
    text-decoration: none;
  }
  .content-box{
    margin-top: 20px;
  }
  .content-box .video-box .container-box{
    background-image: url("../../../static/img/activity/pc/video_bg@2x.png");
    background-repeat: no-repeat;
    background-position: 59px bottom;
    background-size: 847px 213px;
  }
  .anchor{
    position: absolute;
    margin-top: -60px;
    z-index: -1;
  }
  .content-box .video-play{
    float: left;
    width: 320px;
    height: 560px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 12px 32px 0px rgba(0,0,0,0.2);
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .content-box .video-play .box{
    background-color: #000;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
  }
  .content-box .video-play .box .cover{
    width: 100%;
    height: 200px;
    border-bottom: 0;
    position: absolute;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
    left: 0;
    bottom: 0;
  }
  .content-box .video-play .box video{
    border-radius: 10px;
  }
  .content-box .video-play .box .title{
    position: absolute;
    left: 16px;
    color: #fff;
    bottom: 40px;
    width: 200px;
  }
  .content-box .video-play .box .title .text-1{
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 8px;
    text-align: justify;
  }
  .content-box .video-play .box .title .text-2{
    line-height: 22px;
    font-size: 14px;
    text-align: justify;
  }
  .content-box .video-play .box .title .text-3{
    line-height: 22px;
    font-size: 14px;
    text-align: justify;
  }
  .video-list{
    float: right;
    width: 520px;
    height: 600px;
    background: #fff;
    padding: 30px 30px 20px 30px;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
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
    margin-top: 18px;
  }
  .video-list .list li{
    float: left;
    width: 220px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .video-list .list li:after{
    content:".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden
  }
  .video-list .list li:nth-child(even){
    margin-right: 0;
  }
  .video-list .list .left-box{
    float: left;
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
    float: right;
    width: 130px;
    height: 140px;
    position: relative;
  }
  .video-list .list .right-box .title{
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    line-height: 20px;
  }
  .video-list .list .right-box .desc{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #666666;
    line-height: 17px;
    font-size: 12px;
    margin-top: 5px;
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
  .paging{
    text-align: center;
    position: absolute;
    width: 100%;
    bottom:20px;
    left: 0;
  }
  .banner-box{
    margin-top: 20px;
  }
  .banner-box img{
    width: 100%;
    height: auto;
    display: block;
  }
  .activity-desc{
    width: 640px;
    padding: 0 20px 130px 20px;
    margin: 35px auto 0 auto;
    background: url("../../../static/img/activity/pc/bg_2@2x.png") left bottom no-repeat;
    background-size: 100% auto;
    position: relative;
  }
  .activity-desc p:first-child{
    text-align: center;
    letter-spacing: 1px;
  }
  .activity-desc p{
    font-size: 14px;
    color: #2C2C2C;
    line-height: 25px;
    text-align: justify;
  }
  .activity-desc img{
    width: 297px;
    height: 71px;
    position: absolute;
    bottom: 17px;
    left: 50%;
    margin-left: -148px;
  }
  .activity-img img{
    width: 335px;
    height: auto;
    margin: 0 auto 20px auto;
    display: block;
  }
  .activity-img img:last-child{

  }
  .recommend-box{

  }
  .recommend-box .title{
    text-align: center;
    font-size: 14px;
    color: #2C2C2C;
    margin: 20px 0 10px 0;
  }
  .recommend-box .video-box{
    width: 232px;
    height: 426px;
    background-color: #000;
    margin: 0 auto;
  }
  .units-box{
    margin-top: 30px;
    padding-top: 0;
    height: 370px;
    box-sizing: border-box;
    background: url("../../../static/img/activity/pc/bg_3@2x.png") center bottom no-repeat;
    background-size: 847px 213px;
  }
  .units-box .introduce-img{
    width: 342px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .units-box ul{
    width: 244px;
    margin: 20px auto 0 auto;
  }
  .units-box ul li{
    margin-bottom: 10px;
  }
  .units-box ul li:last-child{
    margin-bottom: 0;
  }
  .units-box ul li p{
    font-size: 12px;
    color: #000;
    line-height: 17px;
    margin-bottom: 5px;
  }
  .units-box ul li p:last-child{
    margin-bottom: 0;
  }
  .units-box ul li .text-1{
    font-weight: bold;
    width: 60px;
    display: inline-block;
  }
  .upload-box{
    position: fixed;
    right:52px;
    bottom: 300px;
    z-index: 1;
  }
  .upload-box .bg{
    width: 152px;
    height: auto;
  }
  .upload-box .ewm{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
  .upload-box .ewm .icon-box:first-child{
    margin-top: 90px;
  }
  .upload-box .ewm .icon-box{
    position: relative;
    text-align: center;
    cursor: pointer;
  }
  .upload-box .ewm .icon-box p{
    margin-top: 5px;
    margin-bottom: 14px;
    font-size: 12px;
    color: #2C2C2C;
    line-height: 17px;
  }
  .upload-box .ewm .icon-box .icon{
    width: 30px;
    height: 30px;
  }
  .upload-box .ewm .icon-box .ewm-img{
    display: none;
    width: 120px;
    height: 120px;
    position: absolute;
    left: -64px;
    bottom: 44px;
    border-radius: 5px;
  }
  .upload-box .ewm .icon-box:hover .ewm-img{
    display: block;
  }
  .upload-box .qrcode{
    width: 126px;
    height: 126px;
    position: absolute;
    left: 10px;
    bottom: 31px;
  }
  .mask{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    background-color: rgba(0,0,0,0.5);
  }
  .upload-modal{
    width: 788px;
    height: 480px;
    background: #fff;
    position: fixed;
    top:50%;
    left: 50%;
    margin-top: -210px;
    margin-left: -394px;
    z-index: 2;
  }
  .upload-modal i{
    position: absolute;
    width: 15px;
    height: 15px;
    background: url("../../../static/img/activity/pc/close_icon@2x.png") no-repeat;
    background-size: cover;
    right: 20px;
    top:20px;
    cursor: pointer;
  }
  .upload-modal .title{
    line-height: 34px;
    font-size: 24px;
    color: #000000;
    font-weight: bold;
    text-align: center;
    margin-top: 73px;
  }
  .upload-modal .modal-bg{
    width: 717px;
    height: 334px;
    background:url("../../../static/img/activity/pc/upload_modal_bg@2x.png") no-repeat;
    background-size: cover;
    margin: 8px auto 0 auto;
    position: relative;
  }
  .upload-modal .modal-bg .ewm-box{
    width: 320px;
    margin:  0 auto;
    padding-top: 103px;
  }
  .upload-modal .modal-bg .ewm-box img{
    width: 144px;
    height: 144px;
  }
  .upload-modal .modal-bg .ewm-box p{
    font-size: 18px;
    color: #000;
    line-height: 25px;
    text-align: center;
  }
  .upload-modal .modal-bg .left-code-box{
    float: left;
  }
  .upload-modal .modal-bg .right-code-box{
    float: right;
  }
  .upload-modal .modal-bg .code-bg{
    width: 250px;
    height: 250px;
    background-color: #D6242B;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -135px;
    margin-left: -125px;
    padding: 20px;
    box-sizing: border-box;
  }
  .upload-modal .modal-bg>p{
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #D6242B;
    font-weight: bold;
    position: absolute;
    width: 100%;
    left: 0;
    margin-top: 7px;
  }
  .upload-modal .modal-bg .code-bg img{
    width: 210px;
    height: 210px;
    display: block;
    background-color: #fff;
  }
  .footer {
    background: #fff;
    line-height: 24px;
    margin-top: 20px;
    padding-bottom: 40px;
    min-width: 1180px;
  }
  .footer .wrapper {
    width: 1180px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .footer_link {
    height: 120px
  }

  .footer_link dl {
    float: left;
    display: inline;
    width: 109px;
    height: 120px;
    margin-left: 60px;
    border-right: 1px #e5e5e5 solid
  }

  .footer_link .first {
    margin: 0
  }

  .footer_link .last {
    width: 320px;
    border: none
  }

  .footer_link .last dd {
    width: 160px
  }

  .footer_link dt {
    height: 40px;
    font-size: 14px;
    color: #868686
  }

  .footer_link dd {
    line-height: 28px
  }

  .footer_ul {
    float: left;
    width: 990px;
    margin-top: 40px
  }

  .footer_ul li {
    float: left;
    width: 330px;
    line-height: 28px;
  }

  .footer_ul img {
    float: left;
    margin: 8px 5px 0 0
  }

  .footer_qr {
    float: right;
    margin-top: 30px
  }

  .footer_cp {
    margin-top: 50px;
    color: #848484;
    text-align: center
  }

  .footer .footer_ul {
    width: 967px
  }

  .footer .footer_ul li {
    width: 322px
  }

  .normalmode .footer_ul {
    width: 967px
  }

  .normalmode .footer_qr {
    display: none
  }
  .videoPlay_pending {
    color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -27px;
    margin-top: -27px;
  }
  .videoPlay_pending img {
    width: 54px;
    height: 54px;
  }
  .optionBox {
    position: absolute;
    bottom: 40px;
    right: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    z-index: 1;
  }
  .option_see {
    line-height: 20px;
    margin: 20px 0px 10px 0px
  }

  .option_give {
    line-height: 20px;
    margin: 20px 0px 10px 0px
  }
  .option_see img {
    width: 31px;
    height: 23px;
  }

  .option_give img {
    width: 40px;
    height: 40px;
  }
  .option_head {
    line-height: 20px;
    margin: 20px 0px 10px 0px
  }
  .option_head img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .join-box .title-box img{
    width: 160px;
    display: block;
    margin: 0 auto;
  }
  .join-box{
    margin-top: 20px;
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
    display: block;
  }
  @media (max-width: 750px) {
    .upload-box{
      display: none;
    }
  }
</style>
