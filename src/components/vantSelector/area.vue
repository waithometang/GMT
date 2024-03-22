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
    <van-popup v-model="showAreaPicker" position="bottom">
      <van-area
        :area-list="areaList"
        :value="defAera"
        @confirm="clickConfirm"
        @cancel="cancelFn"
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
      this.showAreaPicker = true;
    },
    cancelFn() {
      this.showAreaPicker = false;
    },
    clickConfirm(vals) {
      this.showAreaPicker = false;
      this.$emit('input',vals[0].name+vals[1].name+vals[2].name)
    },
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