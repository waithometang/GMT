<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :required="required"
      :label="label"
      :rules="rules"
      :placeholder="'点击选择'+label"
      :right-icon="readonly?'':'arrow-down'"
      @click="clickFn"
    />
    <div class="van-hairline--bottom" style="height:1px;padding:0px 16px;"></div>
    <van-popup v-model="showPicker" position="bottom">
      <DatetimePicker
        v-model="currentDate"
        :type="type"
        :title="title"
        show-toolbar
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>


<script>
import { DatetimePicker } from 'vant';
export default {
  components: {
    DatetimePicker
  },
  computed: {
    title(){
      return '选择' + this.label
    }
  },
  created() {
    if (this.required) {
      this.rules=[{ required: true, message: '请选择'+this.label, trigger:'onChange' }]
    }
  },
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      rules:[]
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
    type: {
      type: String,
      default: 'date'
    },
    maxDate: {
      type: Date,
      default: ()=>new Date()
    },
    minDate: {
      type: Date,
      default: ()=>new Date(2000, 0, 1)
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required:{
      type: Boolean,
      default:true
    }
  },
  methods: {
    clickFn() {
      if (this.readonly) return;
      this.showPicker = true;
    },
    onConfirm() {
      if (this.type === 'year-month') {
        this.$emit("input", this.currentDate.getFullYear()+'-'+(this.currentDate.getMonth()+1));
      }else{
        this.$emit("input", this.currentDate.getFullYear()+'-'+(this.currentDate.getMonth()+1) + '-'+this.currentDate.getDate());
      }
      this.showPicker = false;
    }
  }
};
</script>