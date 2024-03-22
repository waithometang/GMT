<!-- 下拉选择框 -->
<template>
  <div class="GmtOption" v-if="listData.length > 0">
    <div class="select-inp" ref='select_inp' @click="SetTagState">
      <div class="select-inp-text">{{ selectTagName(selectState) ? selectTagName(selectState) : place}}</div>
      <div class="select-inp-icon">
        <img src="/images/select-icon.jpg" :class="{'select-inp-icon-icon': showTag}" alt>
      </div>
    </div>
    <div class="select-li" :style="domeStyle" ref="selct_ul" v-show="showTag">
      <div class="tag" :class="{'tag_action': selectTag === item.id}" v-for="(item, index) in listData" :key="index" @click="selecrTag(item, index)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
    },
    selectState: {
      // type: Number
    },
    place:{
      type:String
    }
  },
  data () {
    return {
      showTag: false,
      domeStyle: {},
      selectTag: this.selectState || 0
    }
  },
  methods: {
    SetTagState () {
      let dome = this.$refs.select_inp
      let selct_ul = this.$refs.selct_ul
      let select_y = dome.offsetTop + dome.clientHeight // 距离顶部距离
      let select_left = dome.offsetLeft
      let select_Width = dome.clientWidth // 选择框宽
      if (!this.showTag) {
        this.domeStyle = {
          top: select_y + 'px',
          'min-width': select_Width + 'px',
          left: select_left + 'px',
          position: 'absolute',
          'z-index': 2002
        }
      } else {
        this.domeStyle = {
          'min-width': select_Width + 'px',
          position: 'absolute',
          'z-index': 2002
        }
      }
      this.showTag = !this.showTag
    },
    selecrTag (item, index) {
      this.selectTag = item.type || item.id
      this.showTag = false
      this.$emit('SetselectTag', item)
    },
    selectTagName (id) {
      let dome = this.listData.filter(function (item) {
        return item.id === id.id
      })
      if (dome.length > 0) {
        return dome[0].name
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.GmtOption {
  background: #ffffff;
  .select-inp {
    display: flex;
    // border:1px solid rgba(200,200,200,1);
    border-radius:6px;
    display: flex;
    align-items: center;
    .select-inp-text {
      flex: 1;
      font-size:26px;
      font-weight:400;
      color:rgba(40,40,40,1);
      padding-left: 15px;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .select-inp-icon {
      flex: 0 0 auto;
      img{
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        transition: transform .3s,-webkit-transform .3s;
        -webkit-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
      }
      .select-inp-icon-icon {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
      }
    }
  }
  .select-li {
    margin-top: 10px;
    position: absolute;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    padding: 4px 0;
    .tag{
      background-color: #fff;
      font-size:26px;
      font-weight:400;
      text-align: left;
      color:rgba(40,40,40,1);
      padding: 5px 10px;
    }
    .tag_action {
      color: #409EFF;
    }
    .tag:active {
      background: #cccccc;
    }
  }
}
</style>
