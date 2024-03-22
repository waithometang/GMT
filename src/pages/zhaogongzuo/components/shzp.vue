<template>
	<div class="red_blackboard" ref="red_blackboard" :style="styleData">
		<div class="content">
			<GmtSearchList url="api/Common/PulishList" :parms="{mkId:this.mkid,fblxId:this.fblxId}">
				<template slot="item" slot-scope="listData">
					<GmtDefaultList :listData="listData.data" :mkid='1'></GmtDefaultList>
				</template>
			</GmtSearchList>
		</div>
	</div>
</template>

<script>
import GmtDefaultList from "@/components/GmtDefaultList"
import GmtSearchList from "@/components/GmtSearchList"

export default {
  components: {
    GmtDefaultList,
    GmtSearchList
  },
  data () {
    return {
      styleData: {},
      mkid: 1,
			fblxId: 20,
    }
  },
  mounted () {
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.red_blackboard
        let domeTop = dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
        }
      }, 100);
    })
  }
}
</script>