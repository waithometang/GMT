<template>
  <div class="randomlySnapPicture">
    <div class="select">
      <div
        @click="changeState(item.state)"
        :class="{ cor1: tagState === item.state }"
        v-for="(item, index) in tagData"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="need-list">
      <qyewm v-if="tagState === 2"></qyewm>
      <qyxx v-else :id="id"></qyxx>
    </div>
  </div>
</template>

<script>
import Qyxx from './components/qyxx'
import Qyewm from './components/qyewm'
export default {
  name: '',
  components: {
    Qyxx,
    Qyewm
  },
  props: {

  },
  data () {
    return {
      tagData: [
        { name: "企业信息", state: 1 },
        { name: "企业二维码", state: 2 },
      ],
      tagState: 2,
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {

  },
  created () {
  },
  mounted () {

  },
  methods: {
    changeState (state) {
      this.tagState = state
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/style/FirstLevelPage/select.scss';
@import './style/qytab.scss';
.randomlySnapPicture {
  .need-list {
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}
</style>
