<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :label="label"
      :rules="rules"
      :required="required"
      :placeholder="'点击选择'+label"
      :right-icon="readonly?'':'arrow-down'"
      @click="clickFn"
    />
    <div class="van-hairline--bottom" style="height:1px;padding:0px 16px;"></div>
    <van-popup v-model="showPicker" position="bottom">
      <div class="select-site">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <button type="button" class="van-picker__cancel" @click="cancelFn">取消</button>
          <button type="button" class="van-picker__confirm" @click="clickConfirm">确认</button>
        </div>
        <van-field
          v-model="siteValue"
          label="所在地区"
          :readonly="true"
          @click="setAffirmSite"
          clickable
          placeholder="省市区"
          :rules="[{ required: true, message: '请选择省市区' }]"
        />
        <van-field
          v-model="xxdz"
          label="详细地址"
          placeholder="街道、楼牌号等"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        />
      </div>
    </van-popup>
    <van-popup v-model="showAreaPicker" position="bottom">
      <van-area
        :area-list="areaList"
        :value="defAera"
        @confirm="setSiteValue"
        @cancel="setAffirmSite"
      />
    </van-popup>
  </div>
</template>


<script>
import area from "@/js/area_v1";

export default {
  data() {
    return {
      showPicker: false,
      showAreaPicker: false,
      rules:[],
      siteValue: "",
      xxdz: "",
      defAera: "440608",
      areaList: ""
    };
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.areaList = area;
    if (this.required) {
      this.rules=[{ required: true, message: '请选择'+this.label, trigger:'onChange' }]
    }
  },
  methods: {
    clickFn() {
      if (this.readonly) return;
      this.showPicker = true;
    },
    cancelFn() {
      this.showPicker = false;
    },
    clickConfirm() {
      if (!this.siteValue) {
        this.$toast.fail("请选择所属地区");
        return;
      }
      if (!this.xxdz) {
        this.$toast.fail("请输入详细地址");
        return;
      }
      this.showPicker = false;
      this.$emit("input", `${this.siteValue}${this.xxdz}`);
      this.showPicker = false;
    },
    setAffirmSite() {
      this.showAreaPicker = !this.showAreaPicker;
    },
    setSiteValue(item) {
      this.showAreaPicker = false;
      this.siteValue = "";
      item.forEach(val => {
        this.siteValue = this.siteValue + val.name;
      });
    }
  }
};
</script>


<style>
.select-site {
  padding: 2px 10px 30px 10px;
}
/* .site-head-but {
  font-size: 30px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 20px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.site-head-but-name {
  flex: 0 0 auto;
  background: rgba(25, 174, 246, 1);
  padding: 5px 10px;
  border-radius: 6px;
} */
</style>