<template>
  <div class="getuserinfo">
    <!--    logo部分-->
    <div class="logoBox">
      <div class="logoBox_logo" @click="linkClick()">
        <img src="../../../static/img/video/logo@2x.png">
      </div>
      <div class="logoBox_btn" @click="linkClick()">
        <p>下载APP 看全集</p>
      </div>
    </div>
    <!--    视频部分-->
    <div class="video" :style={height:scrPxH} v-on:click="playVideo()">
      <video ref="videos" id="videoPlay" :poster="coverPic" playsinline="true" webkit-playsinline="true"
             x-webkit-airplay="true" preload="auto" x5-video-player-type="h5" x5-playsinline>您的浏览器不支持 video 视屏播放。
      </video>
      <!--      webkit-playsinline="true" playsinline="true" -->
      <div class="videoPlay_pending" v-if="playHide" :style={top:video_play_btn_height,left:video_play_btn_width}>
        <img src="../../../static/img/video/play@2x.png"></div>
      <div class="videoPlay_pending" v-if="endHide" :style={top:video_play_btn_height,left:video_play_btn_width}>
        <img src="../../../static/img/video/end@2x.png"></div>
    </div>
    <!--    最下部内容部分-->
    <div class="contentBox">
      <p class="contentBox_title">{{goodsName}}</p>
      <p class="contentBox_author">{{nickName}}</p>
      <p class="contentBox_txt" v-html="des"></p>
      <div class="contentBox_choice" :style="showHide" @click="linkClick()">
        <span v-for="(item,index) in sitcomArr" :class="index + 1 == sitcomNum ? 'activeClass' : 'noActiveClass'"
              class="spanClass">{{item}}</span>
      </div>
    </div>
    <!--    右侧用户信息部分-->
    <div class="optionBox">
      <div class="option_see" @click="linkClick()">
        <img src="../../../static/img/video/video_look.png">
        <p>{{watchNum}}</p>
      </div>
      <div class="option_give" @click="linkClick()">
        <img src="../../../static/img/video/video_fa.png">
        <p>{{likeNum}}</p>
      </div>
      <div class="option_head" @click="linkClick()">
        <img :src="headPic">
      </div>
    </div>
    <div class="cache" :style={width:cache_Width}></div>
    <div class="cache_play" :style={width:cache_Paly_Width}></div>
    <div class="shadow_box"></div>
    <form id="myForm" method="get" target="myFrame">
      <input type="hidden" name="gcid" id="gcid"/>
      <input type="hidden" name="bid" id="bid"/>
    </form>
    <iframe name="myFrame" id="myFrame" width="0px" height="0px;"></iframe>
  </div>
</template>

<script>
  import api from '../../axios/axios'

  export default {
    name: 'getuserinfoqq',
    components: {},
    data() {
      return {
        // 视频播放地址
        video_Src: '',
        // 屏幕的总高
        screen_Height: window.innerHeight,
        scrPxH: '',
        // 屏幕的总宽
        screen_Width: window.innerWidth,
        scrPxW: '',
        // 缓存的进度
        cache_Width: '0%',
        // 播放的进度
        cache_Paly_Width: '0%',
        // 距离左侧的距离,
        video_play_btn_width: '',
        // 距离上部的距离
        video_play_btn_height: '',
        // 播放按钮是否隐藏
        playHide: true,
        // 播放结束的按钮是否隐藏
        endHide: false,
        // class判断此前续集是否在第一滑屏内
        showHide: '',
        // 页面显示的数组
        newSitcom: '',
        // 全部续集数组
        sitcomArr: [],
        // 当前播放的第几集
        sitcomNum: 2,
        // 观看数
        watchNum: '0',
        // 点赞数
        likeNum: '0',
        // 头像
        headPic: '',
        // 昵称
        nickName: '',
        // 视频名称
        goodsName: '',
        // 剧情描述
        des: '',
        // 视频的gcid
        moviesSetScreenList: '',
        // 续集
        setNum: '',
        // 视频默认图
        coverPic: ''
      }
    },
    methods: {
      // 函数定义 获取用户信息并设置请求头
      userHead: function () {
        // 获取code存入本地data
        this.ReqCode = this.$route.query.code;
        // 获取user_id存入data
        this.UrlUserId = this.$route.query.userid;
        // 获取sessionid存入data
        this.UrlSessionId = this.$route.query.sessionid;
        // 执行SessionId，把数据传到axios设置到headers
        api.setSessionId(this.UrlSessionId);
        // 获取子集ID
        this.setId = this.$route.params.setId
        // this.setId = this.$route.query.setId;
        // 获取微剧ID
        this.productId = this.$route.params.productId;
        // this.productId = this.$route.query.productId;
        // 获取视频名称
        this.goodsName = this.$route.params.productName;
        // this.goodsName = this.$route.query.productName;
        // 执行SessionId，把数据传到axios设置到headers
        api.setUserId(this.UrlUserId);
        // 执行拦截器
        api.initInterceptors();

      },
      // 函数定义 获取屏幕的高和宽
      winHWInfo() {
        // 获取屏幕的高度
        let winHeight = window.innerHeight;
        // 获取屏幕的宽度
        let winWidth = window.innerWidth;
        // 把获取到的高度传入data
        this.screen_Height = winHeight;
        // 把获取到的宽度传入data
        this.screen_Width = winWidth;
        // 样式-宽
        this.scrPxW = winWidth + 'px';
        // 样式-高
        this.scrPxH = winHeight + 'px';
        console.log(winWidth)
        console.log(winHeight)
      },
      // 函数定义 播放按钮位置
      videoPlay: function () {
        // 获取播放按钮距离左侧的距离
        let video_play_btn_width = this.screen_Width;
        // 获取播放按钮距离上部的距离
        let video_play_btn_height = this.screen_Height;
        // 距离左侧的距离 存入data
        this.video_play_btn_width = ((video_play_btn_width / 2) - 27) + 'px';
        // 距离上部的距离 存入data
        this.video_play_btn_height = ((video_play_btn_height / 2) - 54) + 'px';
      },
      // 函数定义 请求用户信息接口
      UseInfo: function () {
        let _this = this
        // GET请求
        api.httpGet({
            productId: this.productId,
          }, function (data) {
            // 返回的数据
            let resData = data.data
            // 用户头像
            _this.headPic = resData.headPic
            // 用户昵称
            _this.nickName = "@" + resData.nickName
          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/author/getAuthorInfoByProductId");
      },
      // 函数定义 请求视频信息接口-获取到一个GCID
      UseInfoVideo: function () {
        let _this = this
        // GET请求
        api.httpGet({
            productId: this.productId,
          }, function (data) {
            // 返回的数据
            let resData = data.data;
            let sitcomArr = [];
            for (let i in resData) {
              sitcomArr.push(resData[i].setNum);
              if (_this.setId == resData[i].setId) {
                // let获取点赞数量
                let likeCount = resData[i].likeCount
                // 判断是否大于1万
                if (likeCount > 10000) {
                  // 截取保留一位小数
                  let like_num = (likeCount / 10000).toFixed(1)
                  // 最终显示形式 点赞数量拼接
                  _this.likeNum = like_num + "w"
                } else {
                  // 点赞数量
                  _this.likeNum = resData[i].likeCount
                }

                // let获取观看数量
                let playCount = resData[i].playCount
                // 判断是否大于1万
                if (playCount > 10000) {
                  // 截取保留一位小数
                  let watch_num = (playCount / 10000).toFixed(1)
                  // 最终显示形式 点赞数量拼接
                  _this.watchNum = watch_num + "w"
                } else {
                  // 点赞数量
                  _this.watchNum = resData[i].playCount
                }

                // 视频默认图
                _this.coverPic = resData[i].coverPic
                // 微剧当前续集
                _this.sitcomNum = resData[i].setNum;
                // 视频描述
                _this.des = resData[i].des
                // 视频的gcId
                _this.moviesSetScreenList = resData[i].moviesSetScreenList[1].mp4Gcid
                _this.GCVideo(resData[i].moviesSetScreenList[1].mp4Gcid)
              }
            }
            // 视频的续集列表
            _this.sitcomArr = sitcomArr

          },
          // 请求的接口地址
          process.env.SVIDEO_API + "/microvision/getSetListByProductId");
      },
      // 函数定义 用GCID请求视频
      GCVideo: function (res) {
        let _this = this
        document.domain = "kankan.com";
        $("#gcid").val(res);
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
              _this.$refs.videos.src = movieUrl
              // 执行开始 获取video信息（获取完视频源再执行）异步
              setTimeout(function () {
                // 函数执行 开始操作视频
                _this.videoObj();
              }, 100)
              clearInterval(timeSet)
            } else {
              // 刷新页面
            }
          }, 10)
        }, 100)
      },
      // 函数定义 开始获取视频的信息
      videoObj: function () {

        // 定义this指向
        let _this = this;
        // 设置定时器，每100毫秒执行一次
        let video_obi = setInterval(function () {
          let videoDome = document.getElementById("videoPlay");
          // 获取缓存
          let buf = videoDome.buffered;
          // 获取视频时长
          let dur = videoDome.duration;
          // 获取视频当前播放位置
          let current = videoDome.currentTime;
          // 缓存的结束点
          let endBuf = buf.end(0);
          if (dur === current) {
            // 清除定时器
            clearInterval(video_obi)
            // 当条件成立代表视频播放完毕，则设置播放结束按钮显示
            _this.endHide = true
            // 函数执行 播放记录 当前为为播放完毕
            _this.playRecord(3)
          }
          // 获取缓存进度占总时长的比例
          let cacheW = (endBuf / dur) * 100;
          // 当前播放进度占总时长的比例
          let cachepalyW = (current / dur) * 100;
          // 设置缓存进度数据存入data
          _this.cache_Width = cacheW + '%';
          // 设置播放进度数据存入data
          _this.cache_Paly_Width = cachepalyW + '%';
        }, 100)
        setTimeout(function () {
          _this.playRecord(1)
        }, 10000)
        setTimeout(function () {
          _this.playRecord(2)
        }, 30000)
      },
      // 函数定义 电影续集显示问题
      movieSequel: function () {
        // 当前子集
        let sitcomNum = this.sitcomNum;
        // 当前屏幕宽
        let screen_Width = this.screen_Width
        // IPhone 5
        if (screen_Width <= 320) {
          if (sitcomNum <= 7) {
            this.showHide = "margin-left:0px"
          } else if (8 <= sitcomNum <= 14) {
            this.showHide = "margin-left:-" + (screen_Width - 20) + "px"
          } else if (15 <= sitcomNum <= 21) {
            this.showHide = "margin-left:-" + (screen_Width * 2 - 20) + "px"
          }
          return
        }
        // IPhone 6
        if (screen_Width <= 375) {
          if (sitcomNum <= 8) {
            this.showHide = "margin-left:0px"
          } else if (9 <= sitcomNum <= 16) {
            this.showHide = "margin-left:-" + (screen_Width - 20) + "px"
          } else if (17 <= sitcomNum <= 24) {
            this.showHide = "margin-left:-" + (screen_Width * 2 - 20) + "px"
          }
          return
        }
        // IPhone 6p
        if (screen_Width <= 414) {
          if (sitcomNum <= 9) {
            this.showHide = "margin-left:0px"
          } else if (10 <= sitcomNum <= 18) {
            this.showHide = "margin-left:-" + (screen_Width - 20) + "px"
          } else if (19 <= sitcomNum <= 27) {
            this.showHide = "margin-left:-" + (screen_Width * 2 - 20) + "px"
          }
          return
        }
        // 其他型号
        if (sitcomNum > 414) {
          if (sitcomNum <= 9) {
            this.showHide = "margin-left:0px"
          } else if (10 <= sitcomNum <= 18) {
            this.showHide = "margin-left:-" + (screen_Width - 20) + "px"
          } else if (19 <= sitcomNum <= 27) {
            this.showHide = "margin-left:-" + (screen_Width * 2 - 20) + "px"
          }
          return;
        }
      },
      // 函数定义 视频播放
      playVideo() {
        // 声明video实例
        let vdo = document.getElementById("videoPlay");
        // 如果是暂停状态则执行
        if (vdo.paused) {
          // 设置播放结束按钮隐藏
          this.endHide = false;
          // 设置暂停按钮隐藏
          this.playHide = false;
          // 控制视频开始播放
          vdo.play();
          this.cache_Width = "0%";
          this.cache_Paly_Width = "0%";
          this.videoObj()
          // 函数执行 播放进度
          this.playRecord(4)
        }
        // 如果是播放状态下
        else {
          // 设置播放结束按钮隐藏
          this.endHide = false;
          // 设置暂停按钮显示
          this.playHide = true;
          this.cache_Width = "0%";
          this.cache_Paly_Width = "0%";
          // 控制视频暂停
          vdo.pause()
        }
      },
      // 函数定义 点击跳转应用宝
      linkClick() {
        let ua = navigator.userAgent.toLowerCase();
        //Android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //Ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          window.location = "https://itunes.apple.com/cn/app//id466321750?mt=8"
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.location = "https://android.myapp.com/myapp/detail.htm?apkName=com.xunlei.kankan&ADTAG=mobile"
        }
      }
    },

    // 钩子函数 --> 初始化事件，进行数据的观测
    created() {
      // 函数执行 设置请求头函数-初始化
      this.userHead();
      // 函数执行 获取当前窗口的高度和宽度-初始化
      this.winHWInfo();
      // 函数执行 获取播放按钮的位置-初始化
      this.videoPlay();
    },
    // 钩子函数 --> 模板编译/挂载之前
    beforeMount() {
      // 函数执行 请求用户信息接口
      this.UseInfo()
      // 函数执行 请求视频接口，获取到一个GCid
      this.UseInfoVideo()
    },
    // 钩子函数 --> 模板编译/挂载之后（不能保证组件已在document中）
    mounted() {
    },
    beforeUpdate() {
      // 函数执行 电影续集显示问题
      this.movieSequel()
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @media (min-height: 723px) {
    /*文字内容区*/
    .contentBox {
      position: fixed;
      bottom: 31px;
      left: 16px;
      right: 16px;
      width: 70%;
      z-index: 1;
      /*background-image: -webkit-linear-gradient(top,rgba(0,0,0,0),#0084ff); */
      /*background-image:linear-gradient(360deg,hsla(255,0%,100%,0),#0d0d0d);*/
    }

    .cache {
      background: #D8D8D8;
      /* height: 3px; */
      /* margin-top: -2px; */
      z-index: 10;
      color: #ffffff;
      padding: 1.5px 0px;
      position: fixed;
      bottom: 26px;
    }

    .cache_play {
      background: #CCAC6C;
      /* height: 3px; */
      /* margin-top: -2px; */
      z-index: 10;
      color: #ffffff;
      padding: 1.5px 0px;
      position: fixed;
      bottom: 26px;
    }
  }

  @media (max-height: 723px) {
    /*文字内容区*/
    .contentBox {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      width: 70%;
      z-index: 1;
      /*background-image: -webkit-linear-gradient(top,rgba(0,0,0,0),#0084ff); */
      /*background-image:linear-gradient(360deg,hsla(255,0%,100%,0),#0d0d0d);*/
    }

    /*缓存进度*/
    .cache {
      background: #D8D8D8;
      /*height: 3px;*/
      /*margin-top: -2px;*/
      z-index: 10;
      color: #ffffff;
      padding: 1.5px 0px;
      position: fixed;
      bottom: 1px;
    }

    /*播放进度*/
    .cache_play {
      background: #CCAC6C;
      /*height: 3px;*/
      /*margin-top: -2px;*/
      z-index: 10;
      color: #ffffff;
      padding: 1.5px 0px;
      position: fixed;
      bottom: 1px;
    }
  }

  .contentBox_txt {
    color: #ffffff;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    opacity: 1;
    font-size: 16px;
    font-family: PingFang;
    line-height: 22px;
    letter-spacing: 0px;
    margin-bottom: 8px;
  }

  #myFrame {
    display: none;
  }

  /*测试*/
  .activeClass {
    background-color: rgba(250, 250, 250, 0.2);
  }

  .shadow_box {
    /* 新语法，不带前缀，以支持标准兼容的浏览器（Opera 12.1， IE 10， Firefox 16， Chrome 26， Safari 6.1） */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    width: 100%;
    height: 200px;
    position: fixed;
    bottom: 0px;
    opacity: 0.3;
    z-index: 0;
  }

  .noActiveClass {
    background-color: rgba(250, 250, 250, 0.5);
    color: #ffffff;
  }

  .spanClass {
    /*opacity: 0.2;*/
    padding: 8px 12px;
    border-radius: 5px;
    margin-right: 10px;
  }

  /*logo部分样式表*/
  .logoBox {
    width: 94%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(24, 24, 24, 0.8);
    padding: 14px;
    position: fixed;
    top: 0;
    z-index: 9999;
  }

  .logoBox_logo img {
    width: 108px;
    height: 27px;
  }

  .logoBox_btn p {
    background: linear-gradient(#FFF0D2, #FFD37A);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
  }

  /*!*视频样式表*!*/
  .video {
    width: 100%;
    /*height: 568px ;*/
    background-color: #000000;
    margin: auto;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    flex-direction: column;
  }

  .videoPlay_pending {
    color: #fff;
    position: fixed;
    top: 200px;
    left: 200px;
  }

  .videoPlay_pending img {
    width: 54px;
    height: 54px;
  }


  .video video {
    width: 100%;
    display: block;
    object-fit: fill
  }


  .contentBox_title {
    opacity: 1;
    font-size: 18px;
    font-family: PingFang;
    color: #ffffff;
    line-height: 25px;
    letter-spacing: 0px;
    margin-bottom: 4px;
  }

  .contentBox_author {
    color: #ffffff;
    opacity: 1;
    font-size: 15px;
    font-family: PingFang;
    line-height: 21px;
    letter-spacing: 0px;
    margin-bottom: 8px;
  }


  .contentBox_choice {
    color: #FFD37A;
    padding: 8px 0px;
  }


  /*右侧 选项部分*/
  .optionBox {
    position: fixed;
    bottom: 50px;
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

  .option_head {
    line-height: 20px;
    margin: 20px 0px 10px 0px
  }

  .option_see img {
    width: 31px;
    height: 23px;
  }

  .option_give img {
    width: 30px;
    height: 25px;
  }

  .option_head img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>

