<!-- 出租申报 -->
<template>
  <div class="rentOutApplication">
    <div class="leaser">
      <div class="top">出租人信息</div>
      <div class="hread">        
        <ul class="letter-from">
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/letter-name.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的姓名（必填）" class="letter-from-text"/>
              </li>
            </ul>
          </li>
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/letter-phone.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的联系电话" class="letter-from-text"/>
              </li>
            </ul>
          </li>
        <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/adders-log.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入出租地址（必填）" class="letter-from-text"/>
              </li>
            </ul>
          </li>
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/shenfenzhen-logo.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的身份证号（必填）" class="letter-from-text"/>
              </li>
            </ul>
          </li>
        </ul>     
      </div>
      <div class="images">
        <ul>
          <li class="icon">
            <img src="/images/secondLevelPages/timg.jpg">
          </li>
          <li class="icon">
            <img src="/images/secondLevelPages/timg.jpg">
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="img-action">
          <div><img class="but-img" src="/images/secondLevelPages/letter-img.png"/>点击选取身份证正反面照片</div>
        </div>
      </div>
    </div>
    <div class="lessee">
      <ul class="top-tab">
        <li :class="{'cor': Type == 1}" @click="switchover(1)">承租人</li>
        <li :class="{'cor': Type == 2}" @click="switchover(2)">同户人一</li>
        <li :class="{'cor': Type == 3}" @click="switchover(3)">同户人二</li>
        <li :class="{'cor': Type == 4}" @click="switchover(4)">同户人三</li>
      </ul>
      <div class="top">{{title}}</div>
      <div class="hread">        
        <ul class="letter-from">
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/letter-name.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的姓名（必填）" class="letter-from-text"/>
              </li>
            </ul>
          </li>
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/letter-phone.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的联系电话" class="letter-from-text"/>
              </li>
            </ul>
          </li>
          <li class="letter-from-li">
            <ul class="chr-ul">
              <li class="chr-li-one"><img class="letter-from-img" src="/images/secondLevelPages/shenfenzhen-logo.png"/></li>
              <li class="chr-li-two">
                <input type="text" placeholder="请输入您的身份证号（必填）" class="letter-from-text"/>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="images">
        <ul>
          <li class="icon">
            <img src="/images/secondLevelPages/timg.jpg">
          </li>
          <li class="icon">
            <img src="/images/secondLevelPages/timg.jpg">
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="img-action">
          <div><img class="but-img" src="/images/secondLevelPages/letter-img.png"/>点击选取身份证正反面照片</div>
        </div>
      </div>
    </div>
    <div class="declaration">
      <div class="fot">
        <div>承租人何时承租<img src="/images/secondLevelPages/right.png"/></div>
        <div>承租人何时承租<span>务工</span><img src="/images/secondLevelPages/right.png"/></div>
        <div>承租人何时承租<img src="/images/secondLevelPages/right.png"/></div>
        <div>承租人何时承租<span>务工</span><img src="/images/secondLevelPages/right.png"/></div>
      </div>
      <div class="bottom">
        <div class="but">
          提交申请
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Type: 1,
      title: '承租人'
    }
  },
  methods: {
    switchover (item) {
      this.Type = item
      if (item == 2) {
        this.title = '同户人一'
      }
      if (item == 3) {
        this.title = '同户人二'
      }
      if (item == 4) {
        this.title = '同户人三'
      }
    }
  }
}
</script>

<style lang='scss'>
@import '@/style/pages/secondLevelPages/SafeConstruction/rentOutApplication.scss';
</style>
