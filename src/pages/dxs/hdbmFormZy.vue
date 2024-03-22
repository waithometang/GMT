<template>
  <van-form ref="form" v-if="isShow">
    <van-field
      :required="required"
      :value="value"
      @input="inputEv"
      :label="label"
      placeholder="请输入正确的岗位编号"
      :rules="[{ required: true, message: '请输入岗位编号' }]"
      :readonly="readonly"
    >
      <template slot="button" v-if="!readonly">
        <van-button
          size="small"
          @click="queryFn"
          native-type="button"
          round
          plain
          type="info"
          >岗位详情</van-button
        >
      </template>
    </van-field>
    <div
      class="van-hairline--bottom"
      style="height: 1px; padding: 0px 16px"
    ></div>
    <template v-if="gwinfo">
      <div class="gwinfo van-hairline--bottom" v-if="gwinfo.dwmc">
        <p>单位名称：{{ gwinfo.dwmc }}</p>
        <p>岗位名称：{{ gwinfo.gwmc }}</p>
        <p>实习时间：{{ gwinfo.sxsj }}</p>
        <p>是否提供饭餐：{{ gwinfo.tgfc }}</p>
        <p>是否提供实习补贴：{{ gwinfo.sxbt }}</p>
        <p>岗位人数：{{ gwinfo.gwrs }}</p>
        <p>地址：{{ gwinfo.dz }}</p>
        <p class="bz">岗位描述：{{ gwinfo.bz }}</p>
      </div>
      <div class="nogwxx" v-else>
        <img
          :src="require('../../images/dxs/nogwxx.png')"
        />没有岗位信息，请检查岗位编号是否正确
      </div>
    </template>
  </van-form>
</template>

<script>
export default {
  watch: {
    infoObj (val) {
      if (!val) return
      this.isShow = true
      this.readonly = true
      this.gwinfo = val
      this.$emit("input", val.gwbh)
    },
    value (val) {
      if (!val) this.gwinfo = ''
    }
  },
  computed: {
    label () {
      if (this.index === 1) {
        return "意向岗位一：";
      } else if (this.index === 2) {
        return "意向岗位二：";
      } else if (this.index === 3) {
        return "意向岗位三：";
      } else if (this.index === 4) {
        return "意向岗位四：";
      } else if (this.index === 5) {
        return "意向岗位五：";
      }
      return "意向岗位六：";
    }
  },
  data () {
    return {
      gwinfo: "",
      readonly: false,
      isShow: false
    };
  },
  mounted () {
    this.isShow = !this.readData
  },
  methods: {
    tranToShow () {
      this.isShow = true
      this.readonly = false
    },
    inputEv (val) {
      this.$emit("input", val)
    },
    queryFn () {
      this.$refs.form.validate().then(validate => {
        this.$indicator.open('查询中...')
        this.$post('api/zx/dxsgwxx', { id: this.hdid, name: this.value }).then(res => {
          if (res.data.success) {
            if (res.data.content) {
              this.gwinfo = res.data.content
            } else {
              this.gwinfo = {}
            }
          } else {
            this.changtoast(res.data.message, 'error')
          }
        })
      }, () => { })
    }
  },
  props: {
    index: {
      type: Number
    },
    hdid: {
      type: Number
    },
    value: {
      type: String
    },
    infoObj: {
      type: Object
    },
    readData: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.van-field__label {
  font-weight: bold;
}
/deep/ .van-button--info {
  color: #65b7f3 !important;
  border-color: #65b7f3 !important;
}
.gwinfo {
  padding-left: 110px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 16px;
  background-color: #fff;
  .bz {
    color: red;
  }
}
.nogwxx {
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #ccc;
  img {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }
}
</style>