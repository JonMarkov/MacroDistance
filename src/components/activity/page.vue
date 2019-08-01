<template>
  <div>
    <div class="page-helper" v-if="showPageHelper">
      <div class="page-list">
        <!--<span>共{{ totalPage }}页 / {{ totalCount }}条</span>-->
        <!--<span class="page-item" @click="jumpPage(1)">首页</span>-->
        <span class="page-item" :class="{'disabled': currentPage === 1}"  @click="prevPage">&lt;</span>
        <span class="page-ellipsis" v-if="showPrevMore" @click="showPrevPage">...</span>
        <span class="page-item" v-for="num in groupList" :class="{'page-current':currentPage===num}" :key="num"
              @click="jumpPage(num)">{{num}}</span>
        <span class="page-ellipsis" v-if="showNextMore" @click="showNextPage">...</span>
        <span class="page-item" :class="{'disabled': currentPage === totalPage}" @click="nextPage">&gt;</span>
        <!--<span class="page-item" @click="jumpPage(totalPage)">末页</span>-->
        <!--<select class="page-select" @change="jumpPage(currentPage)" v-model="currentSize">-->
          <!--<option v-for="size in pageSizeArray" :key="size" :value="size">{{ size }}条/页</option>-->
        <!--</select>-->
        <!--<span class="ml20">跳至</span>-->
        <!--<span class="page-jump-to"><input type="type" v-model="jumpPageNumber"></span>-->
        <!--<span>页</span>-->
        <!--<span class="page-item jump-go-btn" @click="goPage(jumpPageNumber)">GO</span>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page',
    data () {
      return {
        currentPage: this.pageNumber,
        currentSize: this.pageSizeArray[0],
        jumpPageNumber: 1,
        showPrevMore: false,
        showNextMore: false
      }
    },
    props: {
      pageNumber: {   //当前页面
        type: Number,
        default: 1
      },
      pageSizeArray: {   //每页显示数量
        type: Array,
        default () {
          return [10,20,30,50]
        }
      },
      totalCount: {   //总条数
        type: Number,
        default: 1000
      },
      pageGroup: {   //连续页码个数
        type: Number,
        default: 5
      }
    },
    computed: {
      showPageHelper () {
        return this.totalCount > 0
      },
      totalPage () {   //总页数
        return Math.ceil(this.totalCount / this.currentSize);
      },
      groupList () {  //获取分页码
        const groupArray = []
        const totalPage = this.totalPage
        const pageGroup = this.pageGroup
        const _offset = (pageGroup - 1) / 2
        let current = this.currentPage
        const offset = {
          start: current - _offset,
          end: current + _offset
        }
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > totalPage) {
          offset.start = offset.start - (offset.end - totalPage)
          offset.end = totalPage
        }
        if (offset.start < 1) offset.start = 1
        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < totalPage)
        for (let i = offset.start; i <= offset.end; i++) {
          groupArray.push(i)
        }
        return groupArray
      }
    },
    methods: {
      prevPage () {
        if (this.currentPage > 1) {
          this.jumpPage(this.currentPage - 1)
        }
      },
      nextPage () {
        if (this.currentPage < this.totalPage) {
          this.jumpPage(this.currentPage + 1)
        }
      },
      showPrevPage() {
        this.currentPage = this.currentPage - this.pageGroup > 0 ? this.currentPage - this.pageGroup : 1
      },
      showNextPage() {
        this.currentPage = this.currentPage + this.pageGroup < this.totalPage ? this.currentPage + this.pageGroup : this.totalPage
      },
      goPage (jumpPageNumber) {
        if(Number(jumpPageNumber) <= 0){
          jumpPageNumber = 1
        }if(Number(jumpPageNumber) >= this.totalPage){
          jumpPageNumber = this.totalPage
        }
        this.jumpPage(Number(jumpPageNumber))
      },
      jumpPage (pageNumber) {
        if (this.currentPage !== pageNumber) {  //点击的页码不是当前页码
          this.currentPage = pageNumber
          //父组件通过change方法来接受当前的页码
          this.$emit('jumpPage', {currentPage: this.currentPage, currentSize: this.currentSize})
        }
      }
    },
    watch: {
      currentSize (newValue, oldValue) {
        if(newValue !== oldValue){
          if(this.currentPage >= this.totalPage){ //当前页面大于总页面数
            this.currentPage = this.totalPage
          }
          this.$emit('jumpPage', {currentPage: this.currentPage, currentSize: this.currentSize})
        }
      }
    }
  }
</script>

<style scoped>
  .page-helper {
    font-weight: 500;
    text-align: center;
    color: #888;
  }
  .page-list {
    font-size: 0;
  }
  .page-list span {
    font-size: 14px;
    margin-right: 5px;
    user-select: none;
  }
  .page-list .page-item {
    margin: 0;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    margin-right: 10px;
    display: inline-block;
    background-color: #F4F4F4;
    color: #666666;
    font-size: 12px;
    border: 0;
    cursor: pointer;
  }
  .page-ellipsis {
    padding: 0 8px;
  }
  .page-jump-to input {
    width: 45px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #aaa;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
  }
  .page-list .jump-go-btn {
    font-size: 12px;
  }
  .page-select{
    border: 1px solid #aaa;
    padding: 5px 8px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;
  }
  .page-list .page-item:last-child{
    margin-right: 0;
  }
  .page-list .page-item .disabled{
    pointer-events: none;
    background: #ddd;
  }
  .page-list .page-current {
    cursor: default;
    background: rgba(215,14,25,1);
    color: #fff;
  }
</style>
