<template>
  <div class="getuserinfo" :style={height:video_Height}>
    <!--    logo部分-->
    <div class="logoBox">
      <div class="logoBox_logo">
        <img src="../../static/img/video/logo@2x.png">
      </div>
      <div class="logoBox_btn">
        <p>sadsds</p>
      </div>
    </div>
    <!--    视频部分-->
    <div class="video" v-on:click="playVideo()">
      <video :src="video_Src" id="videoPlay">您的浏览器不支持 video 视屏播放。</video>
      <div class="cache" :style={width:cache_Height}></div>
    </div>

    <!--    最下部内容部分-->
    <div class="contentBox">
      <p class="contentBox_title">我们的时代</p>
      <p class="contentBox_author">@賀冬冬 梦泉时尚创始人</p>
      <p class="contentBox_txt">
        大结局（8-3）李佳琪你可曾想过，你也可以像梦晨一样绽放！
      </p>
      <div class="contentBox_choice">
        <span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span>
      </div>
    </div>
    <!--    右侧用户信息部分-->
    <div class="optionBox">
      <div class="option_see">
        <img src="../../static/img/video/b.jpg">
        <p>123</p>
      </div>
      <div class="option_give">
        <img src="../../static/img/video/b.jpg">
        <p>123</p>
      </div>
      <div class="option_head">
        <img src="../../static/img/video/b.jpg">
      </div>
    </div>
  </div>
</template>

<script>
  /*模拟*/
  /*http://a1.713pw.cn?user_id=2010180117&name=wangzijuan&class=3&img_url=http://www.pptok.com/wp-content/uploads/2012/08/xunguang-9.jpg*/
  import api from '../axios/axios'
  import wxApiUrl from '../axios/resource'

  export default {
    name: 'getuserinfo',
    components: {},
    data() {
      return {
        video_Src: '../../static/img/video/Toni_Kroos.mp4',
        screen_Height: window.innerHeight,
        video_Height: '',
        cache_Height:'20%'
      }
    },
    created() {
      // 执行获取当前窗口高度函数
      this.winHeight()
      this.videoObj()
    },
    methods: {
      videoObj:function(){
        setInterval(function () {
          var x = document.getElementById("videoPlay");
          console.log(x.duration)
        },1000)

      },
      // 视频播放函数定义
      playVideo() {
        let vdo = document.getElementById("videoPlay");
        vdo.play();
      },
      // 获取当前窗口的高度
      winHeight() {
        let winHeight = window.innerHeight
        this.screen_Height = winHeight
      },
      // 填充样式设置视频的高度
      videoHeight() {
        let video_height = this.screen_Height
        this.video_Height = (video_height) + 'px'
      }
    },
    mounted() {
      // 执行设置video的高度样式(style)
      this.videoHeight()
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  /*logo部分样式表*/
  .logoBox {
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #181818;
    padding: 14px;
    position: fixed;
    top: 0;
  }

  .logoBox_logo img {
    width: 108px;
    height: 27px;
  }

  .logoBox_btn p {
    background: linear-gradient(#FFF0D2, #FFD37A);
  }

  /*!*视频样式表*!*/
  .video {
    width: 100%;
    height: 96%;
    background-color: #000000;
    margin: auto;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    flex-direction: column;
  }
  .cache{
    background: #CCAC6C;
    /*height: 3px;*/
    margin-top: -2px;
    z-index: 10;
    color: #ffffff;
    padding: 1px 0px;
  }

  .video video {
    width: 100%;
    display: block;
    object-fit: fill
  }

  /*文字内容区*/
  .contentBox {
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    width: 70%;
    /*background-image: -webkit-linear-gradient(top,rgba(0,0,0,0),#0084ff); */
    /*background-image:linear-gradient(360deg,hsla(255,0%,100%,0),#0d0d0d);*/
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

  .contentBox_choice {
    color: #FFD37A;
    padding: 8px 0px;
  }

  .contentBox_choice span {
    background: #ffffff;
    opacity: 0.2;
    padding: 8px 12px;
    border-radius: 5px;
    margin-right: 10px;
  }

  /*选项部分*/
  .optionBox {
    position: fixed;
    bottom: 50px;
    right: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }

  .option_see {
    line-height: 20px;
    margin:20px 0px 10px 0px
  }

  .option_give {
    line-height: 20px;
    margin:20px 0px 10px 0px
  }

  .option_head {
    line-height: 20px;
    margin:20px 0px 10px 0px
  }

  .option_see img {
    width: 30px;
    height: 20px;
  }

  .option_give img {
    width: 30px;
    height: 20px;
  }

  .option_head img {
    width: 40px;
    height: 40px;
  }
</style>

