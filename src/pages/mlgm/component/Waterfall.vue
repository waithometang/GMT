<template>
  <div class="waterfall" :class="dialog ? 'mask' : ''">
    <GmtSearchList
      ref="commonList"
      class="commonList"
      :url="url"
      :useSearch="useSearch"
      :parms="searchVal"
    >
      <template slot="item" slot-scope="listData">
        <slot />
        <div class="waterfullBox">
          <div class="left">
            <div class="content" v-for="(item,index) in listData.data" :key="index">
              <div class="odd" v-if="index % 2 == 0">
                <div class="wrapImg" @click="()=>gotoDetail(item.id)">
                  <!-- 图片 -->
                  <img :src="item.cover" alt class="pic" />
                  <!-- <van-image width="168" :radius="10" fit="cover" :src="item.cover"/> -->
                  <!-- 点赞 -->
                  <div class="like">
                    <img src="../images/like.png" alt class="heart" />
                    {{item.likeCount || '0'}}
                  </div>
                  <!-- 数字排行 -->
                  <div class="num" v-if="showNum">
                    NO.
                    <span>{{index+1}}</span>
                  </div>
                  <!-- 编号 -->
                  <div class="digit">{{item.code}}</div>
                </div>
                <div class="wrap" :class="{'wrap-last':!call}">
                  <img :src="item.avatar" alt class="avatar" />
                  <p class="info">{{item.title}}</p>
                </div>
                <div v-if="call"
                  :class="item.btnFlag?'hasCall':'call'"
                  @click="()=>btnClick(item)"
                >{{item.btnFlag?'已打call':'为路线打call'}}</div>
                <!-- <div v-else
                  :class="item.btnFlag?'hasCall':'call'"
                  @click="()=>btnClick(item)"
                >{{item.btnFlag?'已打call':'为他打call'}}</div> -->
              </div>
            </div>
          </div>
          <div class="right">
            <div class="content" v-for="(item,index) in listData.data" :key="index">
              <div class="odd" v-if="index % 2 != 0">
                <div class="wrapImg" @click="()=>gotoDetail(item.id)">
                  <!-- 图片 -->
                  <img :src="item.cover" alt class="pic" />
                  <!-- <van-image width="168" :radius="10" fit="cover" :src="item.cover"/> -->

                  <!-- 点赞 -->
                  <div class="like">
                    <img src="../images/like.png" alt class="heart" />
                    {{item.likeCount || '0'}}
                  </div>
                  <!-- 数字排行 -->
                  <div class="num" v-if="showNum">
                    NO.
                    <span>{{index+1}}</span>
                  </div>
                  <!-- 编号 -->
                  <div class="digit">{{item.code}}</div>
                </div>
                <div class="wrap" :class="{'wrap-last':!call}">
                  <img :src="item.avatar" alt class="avatar" />
                  <p class="info">{{item.title}}</p>
                </div>
                <div v-if="call"
                  :class="item.btnFlag?'hasCall':'call'"
                  @click="()=>btnClick(item)"
                >{{item.btnFlag?'已打call':'为路线打call'}}</div>
                <!-- <div v-else
                  :class="item.btnFlag?'hasCall':'call'"
                  @click="()=>btnClick(item)"
                >{{item.btnFlag?'已打call':'为他打call'}}</div> -->
              </div>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>

    <!-- dialog -->
    <!-- <div class="dialog" v-if="dialog">
            <div class="title">您今天的投票次数已用完 </div>
            <div class="info">明天再为您喜欢的作品打call吧~</div>
            <div class="footer">
                <div class="cancel" @click="closeDialog">取消</div>
                <div class="confirm" @click="closeDialog">确定</div>
            </div>
    </div>-->
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList.vue'
export default {
  props: {
    showNum: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number
    },
    url: {
      type: String,
      default: 'api/mlgm/CszpList'
    },
    params: {
      type: Object
    },
    // 是否能打call
    call: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: '',
      count: 0,
      dialog: false,
      // dialog: true,
      newList: [],
      useSearch: true,
      searchVal: {}
    }
  },
  components: {
    GmtSearchList
  },
  methods: {
    btnClick(item) {
      this.$showSubscribe().then(() => this.markcallFn(item))
    },
    markcallFn(item) {
      this.$indicator.open('正在打call...')
      this.$post('api/mlgm/markcall', { id: item.id }).then((res) => {
        this.$indicator.close()
        if (res.data.success) {
          this.$toast('打call成功')
          item.likeCount += 10
          item.btnFlag = true
        } else if (res.data.errorCode === 405) {
          this.$alert(
            '明天再为您喜欢的作品打call吧~',
            '您今天的投票次数已用完 '
          )
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog = false
    },
    gotoDetail(id) {
      if(this.call){
        this.$router.push(`/mlgm/qtjplxxq/${id}`)
      }else{
        this.$router.push(`/mlgm/qtcstg/${id}/1`)
      }
    },
    searchFn(val) {
      this.searchVal.search = val.title
      this.$refs.commonList.updateListData()
    },
    searchWeek(val) {
      this.searchVal.zcid = val
      this.$refs.commonList.updateListData()
    }
  },
  created() {
    if (this.type == 1) {
      this.useSearch = false
    }
    if (this.params) {
      this.searchVal = this.params
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/waterfall.scss';
.commonList {
  position: fixed;
  bottom: 0px;
  top: 230px;
  left: 0;
  right: 0px;
}
</style>
