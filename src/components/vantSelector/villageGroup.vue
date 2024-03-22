<!-- 选择村居  -->
<template>
  <div>
    <van-field
      readonly
      clickable
      :value="selectedName"
      :label="label"
      :required="required"
      :disabled="disabled"
      :rules="rules"
      :placeholder="placeholder"
      :right-icon="readonly ? '' : 'arrow-down'"
      @click="clickFn"
    />
    <div
      class="van-hairline--bottom"
      style="height: 1px; padding: 0px 16px"
    ></div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>


<script>
import { VillageData } from "@/api/secondLevelPage";

export default {
  name: "vant-selector",
  data() {
    return {
      showPicker: false,
      rules: [],
      columns: [],
      selectedName: "",
    };
  },
  computed: {
    placeholder() {
      return this.readonly ? "" : "请输入" + this.label;
    },
  },
  created() {
    if (this.readonly) {
      this.selectedName=this.mc
    } else {
      this.$indicator.open("加载中...");
      this.$get("api/common/villageGroupData").then((res) => {
        this.$indicator.close();
        if (res.data.success) {
          this.columns = res.data.content;
          this.initSelected();
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    }
    if (this.required) {
      this.rules = [
        { required: true, message: "请选择" + this.label, trigger: "onChange" },
      ];
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    sszj: {
      type: Number,
      default: 0,
    },
    sscj: {
      type: Number,
      default: 0,
    },
    sszrc: {
      type: Number,
      default: 0,
    },
    value: {
      type: String,
    },
    mc:{
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    initSelected() {
      // if (this.value && this.sszj) {
      //   let zj = this.columns.find(m=>m.id==this.sszj)
      //   let cj = zj.children.find(m=>m.id==this.value)
      //   this.selectedName=`${zj.text}/${cj.text}`
      //   this.$emit("update:mc", this.selectedName);
      // }
    },
    clickFn() {
      if (this.readonly) return;
      this.showPicker = true;
    },
    onConfirm(values, indexs) {
      let zj = this.columns[indexs[0]];
      let cj = zj.children[indexs[1]];
      let zrc = cj.children[indexs[2]];
      this.$emit("update:sszj", zj.value);
      this.$emit("update:sscj", cj.value);
      this.$emit("update:sszrc", zrc.value);
      this.showPicker = false;
      this.selectedName = values.join("/");
      this.$emit("update:mc", this.selectedName);
    },
  },
};
</script>