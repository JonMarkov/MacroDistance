<template>
  <div class="div_body">
    <!--头图部分-->
    <div class="head_img">
      <img src="../../../static/img/Android.png" height="1500" width="975"/>
    </div>
    <!--排行榜部分-->
    <div class="ranking_info">
      <!--一次循环榜单-->
      <div class="ranking_det" v-for="item in rankData">
        <div class="det_left">
          <div class="det_left_num">
            {{item.rank}}
          </div>
          <div class="det_left_img">
            <img src="../../../static/img/big_back.png">
          </div>
        </div>
        <div class="det_right">
          <div class="det_right_title">
            <p>食堂夜话</p>
          </div>
          <div class="det_right_info">
            <p>大家好，我是老黑，在这个城市开了家料理店；有很多人光顾</p>
          </div>
          <div class="det_right_data">
            <div>观看数</div>
            <div>点赞数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ranking",
    components: {},
    data() {
      return {
        rankData: [
          {
            name: 1,
            rank: 1
          }, {
            name: 2,
            rank: 2,
          }, {
            name: 3,
            rank: 3
          }, {
            name: 4,
            rank: 4
          }, {
            name: 5,
            rank: 5
          },
        ]
      }
    }
  }

</script>

<style scoped>
  /*整个页面盒子*/
  .div_body {
    background: #bfcbd9;
  }

  /*头部图片*/
  .head_img img {
    width: 100%;
    height: 200px;
  }

  /*排行榜详细内容部分*/
  .ranking_det {
    display: flex;
    flex-direction: row;
    padding: 10px;
  }

  /*排行榜内容左侧*/
  .det_left {
    position: relative;
  }

  /*排行榜内容左侧图片*/
  .det_left img {
    width: 50px;
    height: 100px;
  }

  /*排行榜序号*/
  .det_left_num {
    position: absolute;
    background: #00ff00;
    padding: 2px 8px;
    border-radius: 50px;
  }

  /*排行榜内容右侧*/
  .det_right {
    display: flex;
    flex-direction: column;

  }
</style>
