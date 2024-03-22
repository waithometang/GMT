<template>
  <div>
    <div class="serch" v-if="useSearch">
      <div>
        <input placeholder="请输入搜索内容" type="text" v-model="key" v-on:keyup.enter="search"/>
        <div class="imagesss" @click="search">
          <img src="/images/secondLevelPages/search.png" />
        </div>
      </div>
    </div>
    <div class="MissiveList" :class="{'blockserch': useSearch}">
      <div class="existList" v-if="listData.length>0">
        <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myScroller">
          <slot name="item" :data="listData"></slot>
        </scroller>
      </div>
      <div class="noList" v-else>
        <slot name="item" :data="listData"></slot>
        <p v-if="loading">正在获取数据</p>
        <div v-else>
          <slot v-if="$slots.empty" name="empty"/>
          <p v-else>当前没有数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "@/api/axios";

let refreshing = false;

export default {
  data() {
    return {
      count: 0,
      key: "", //输入框的key
      searchKey: "", //提交接口的key
      listData: [],
      loading: true, //是否正在获取数据
      pageIndex: 1,
      countNumber: 0,
    };
  },
  watch: {
    renovateScroller() {
      try {
        this.$refs.myScroller.finishInfinite(false);
      } catch (error) {
        console.log(error);
      }
      this.pageIndex = 1;
      this.listData = [];
      this.GetListData();
    },
    parms() {
      try {
        this.$refs.myScroller.finishInfinite(false);
      } catch (error) {
        console.log(error);
      }
      this.pageIndex = 1;
      this.listData = [];
      this.loading = true;
      this.GetListData();
    },
  },
  created() {
    if (this.autoFetchData) this.initData();
  },
  methods: {
    initData() {
      this.GetListData();
    },
    updateListData() {
      //重新获取数据
      this.pageIndex = 1;
      this.listData = [];
      this.loading = true;
      this.GetListData();
    },
    Api(SettingData) {
      let url = this.url;
      let data = SettingData;
      return Axios({
        url,
        data,
      });
    },
    search() {
      this.searchKey = this.key;
      this.pageIndex = 1;
      this.listData = [];
      this.initData();
    },
    GetListData(done) {
      if (refreshing) return;
      refreshing = true;
      let _parms = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: this.searchKey,
      };
      this.Api(Object.assign(_parms, this.parms)).then((rps) => {
        refreshing = false;
        this.loading = false;
        if (rps.data.success) {
          if (this.pageIndex === 1) this.listData = rps.data.content;
          else this.listData.push(...rps.data.content);
          this.pageIndex++;
          if (!this.initFlag) this.initFlag = true;
          if (done) done();
          if (
            rps.data.content.length < this.pageSize &&
            this.$refs["myScroller"]
          ) {
            try {
              this.$refs.myScroller.finishInfinite(true);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          try {
            this.$refs.myScroller.finishInfinite(true);
          } catch (error) {
            console.log(error);
          }
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    infinite(done) {
      this.GetListData(done);
    },
    refresh(done) {
      this.pageIndex = 1;
      this.GetListData(done);
      this.$refs.myScroller.finishInfinite(false);
    },
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    parms: {
      type: Object,
    },
    useSearch: {
      type: Boolean,
      default: true,
    },
    renovateScroller: {
      type: Boolean,
      default: false,
    },
    autoFetchData: {
      //自动获取数据，默认是true
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/components/GmtSearchList.scss";
input::-webkit-input-placeholder {
  font-size: 28px;
}
</style>
