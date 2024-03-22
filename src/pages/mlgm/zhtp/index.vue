<template>
  <div class="container">
    <water-fall :showNum="showNum" url="api/mlgm/ZpList"></water-fall>
  </div>
</template>
<script>
import waterFall from "../component/Waterfall"
export default {
  data() {
    return {
      showNum: true
    }
  },
  components: { waterFall }
}
</script>
<style lang="scss" scoped>
.waterfall {
  /deep/ .commonList {
    top: 0;
    bottom: 0;
  }
}
</style>