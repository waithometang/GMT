<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :required="required"
      :rules="rules"
      placeholder="请选择"
      @click="clickFn"
    />
    <div
      class="van-hairline--bottom"
      style="height: 1px; padding: 0px 16px"
    ></div>
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
import { DatetimePicker } from "vant"
export default {
  components: {
    DatetimePicker
  },
  computed: {
    title() {
      return "选择"
    }
  },
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      rules: []
    }
  },
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: "date"
    },
    maxDate: {
      type: Date,
      default: () => new Date(2025, 10, 1)
    },
    minDate: {
      type: Date,
      default: () => new Date(2000, 0, 1)
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
  methods: {
    clickFn() {
      if (this.readonly) return
      this.showPicker = true
    },
    onConfirm() {
      if (this.type === "year-month") {
        this.$emit(
          "input",
          this.currentDate.getFullYear() +
            "-" +
            (this.currentDate.getMonth() + 1)
        )
      } else if (this.type === "datetime") {
        var hourrs = ""
        var minutes = ""
        if (this.currentDate.getHours() < 10) {
          hourrs = "0" + this.currentDate.getHours().toString()
        } else {
          hourrs = this.currentDate.getHours().toString()
        }
        if (this.currentDate.getMinutes() < 10) {
          minutes = "0" + this.currentDate.getMinutes().toString()
        } else {
          minutes = this.currentDate.getMinutes().toString()
        }
        this.$emit(
          "input",
          this.currentDate.getFullYear() +
            "-" +
            (this.currentDate.getMonth() + 1) +
            "-" +
            this.currentDate.getDate() +
            "  " +
            hourrs +
            ":" +
            minutes
        )
      } else {
        this.$emit(
          "input",
          this.currentDate.getFullYear() +
            "-" +
            (this.currentDate.getMonth() + 1) +
            "-" +
            this.currentDate.getDate()
        )
      }
      this.showPicker = false
    }
  }
}
</script>