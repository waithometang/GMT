<template>
  <div class="BlankPage">
    <!-- 空白中转页面 -->
  </div>
</template>

<script>
export default {
  created () {
    // window.history.replaceState('', '', 'http://localhost:8080/index')
    this.$router.replace('/index')
  }
}
</script>

<style>

</style>
