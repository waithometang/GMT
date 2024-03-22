<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :label="label"
      :rules="rules"
      :required="required"
      :placeholder="'点击选择' + label"
      :right-icon="readonly ? '' : 'arrow-down'"
      @click="clickFn"
    />
    <div
      class="van-hairline--bottom"
      style="height: 1px; padding: 0px 16px"
    ></div>
    <van-popup v-model="showPicker" position="bottom">
      <div class="select-site">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <button type="button" class="van-picker__cancel" @click="cancelFn">
            取消
          </button>
          <button
            type="button"
            class="van-picker__confirm"
            @click="clickConfirm"
          >
            确认
          </button>
        </div>
        <van-field
          v-model="xkmc"
          label="学科名称"
          :readonly="true"
          @click="setAffirmSite"
          clickable
          placeholder="学科名称"
          :rules="[{ required: true, message: '请选择学科名称' }]"
        />
        <van-field
          v-model="zymc"
          label="专业名称"
          :readonly="true"
          @click="setAffirmSite2"
          clickable
          placeholder="专业名称"
          :rules="[{ required: true, message: '请选择专业名称' }]"
        />
      </div>
    </van-popup>
    <van-popup v-model="showAreaPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="xkmcArray"
        @confirm="onConfirm"
        @cancel="showAreaPicker = false"
      />
    </van-popup>
    <van-popup v-model="showAreaPicker2" position="bottom">
      <van-picker
        show-toolbar
        :columns="zymcArray"
        @confirm="onConfirm2"
        @cancel="showAreaPicker2 = false"
      />
    </van-popup>
  </div>
</template>


<script>
export default {
  data () {
    return {
      xkmc: '',
      zymc: '',
      showPicker: false,
      showAreaPicker: false,
      showAreaPicker2: false,
      rules: [],
      xkmcArray: [],
      zymcArray: []
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
    columns: {
      type: Array,
      required: true
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
  created () {
    this.columns.forEach(column => {
      this.xkmcArray.push(column.text)
    });
    if (this.required) {
      this.rules = [{ required: true, message: '请选择' + this.label, trigger: 'onChange' }]
    }
  },
  methods: {
    clickFn () {
      if (this.readonly) return;
      this.showPicker = true;
    },
    cancelFn () {
      this.showPicker = false;
    },
    clickConfirm () {
      if (!this.xkmc) {
        this.$toast.fail("请选择学科名称");
        return;
      }
      if (!this.zymc) {
        this.$toast.fail("请选择专业名称");
        return;
      }
      this.showPicker = false;
      this.$emit("input", `${this.xkmc}${this.zymc}`);
      this.showPicker = false;
    },
    setAffirmSite () {
      this.showAreaPicker = !this.showAreaPicker;
    },
    setAffirmSite2 () {
      if (this.xkmc === '') {
        this.$toast.fail("请先选择学科名称");
        return;
      }
      this.showAreaPicker2 = !this.showAreaPicker2;
    },
    onConfirm (value) {
      this.zymcArray = []
      this.showAreaPicker = false;
      this.xkmc = value
      this.columns.forEach(column => {
        if (column.text === value) {
          column.children.forEach(item => {
            this.zymcArray.push(item.text)
          });
        }
      });
      this.zymc = ''
    },
    onConfirm2 (value) {
      this.showAreaPicker2 = false;
      this.zymc = value
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