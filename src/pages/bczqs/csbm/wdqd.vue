<template>
  <div class="wdqd">
    <p class="title">球队成员</p>
    <div class="member">
      <ul class="member-ul">
        <li class="member-li" v-for="(item, index) in member" @click="clickFn(item)" :key="index">
          <div class="name">
            <img src="../images/card.png" />
            <span>{{ item.xm }}</span>
            <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{{ item.dfhm }}</span>
          </div>
          <div
            class="state"
            :class="
              item.shzt === '待审核'
                ? 'green'
                : item.shjg === '通过'
                ? 'blue'
                : 'red'
            "
          >
            {{ item.shzt === '待审核' ? '审核中' : item.shjg }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      member: []
    }
  },
  methods: {
    clickFn(row){
      this.$emit('showDetails', row)
    }
  },
  created() {
    this.$indicator.open('加载中...')
    this.$post('api/gcjd/qdwdqy').then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.member = res.data.content
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import './style/wdqd.scss';
</style>