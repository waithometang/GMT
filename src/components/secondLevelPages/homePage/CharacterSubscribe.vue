<!-- 文字预约 -->
<template>
  <div class="CharacterSubscribe">
    <div class="content">
      <ul>
        <li class='name-phone'>
          <div class="icon">
            <img src="/images/secondLevelPages/letter-name.png">
          </div>
          <div class="imput">
            <input type="tetx" placeholder="请输入你的姓名">
          </div>
        </li>
        <li class='name-phone'>
          <div class="icon">
            <img src="/images/secondLevelPages/letter-phone.png">
          </div>
          <div class="imput">
            <input type="tetx" placeholder="请输入你的姓名">
          </div>
        </li>
        <li class='mattere'>
          <div class="icon">
            <img src="/images/secondLevelPages/letter-main.png">
          </div>
          <div class="textareas">
            <textarea placeholder="预约内容"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="butoom">
      发送预约信息
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
@import "@/style/components/secondLevelPages/homePage/CharacterSubscribe.scss";
</style>
