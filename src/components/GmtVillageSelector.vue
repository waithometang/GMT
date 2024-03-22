<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedZj" :options="zjData" @change="zjChangeFn"/>
      <van-dropdown-item v-model="selectedSq" :options="sqData" @change="sqChangeFn"/>
      <van-dropdown-item v-model="selectedCj" :options="cjData" @change="cjChangeFn"/>
    </van-dropdown-menu>
  </div>
</template>


<script>
export default {
    data() {
        return {
            zjData:[],
            sqData:[],
            cjData:[],
            selectedZj:0,
            selectedSq:0,
            selectedCj:0,
        }
    },
    methods: {
        zjChangeFn(val){
            this.sqData=this.zjData.find(m=>m.value==val).children
            this.selectedSq=0
            this.selectedCj=0
            this.cjData=[]
        },
        sqChangeFn(val){
            this.cjData=this.sqData.find(m=>m.value==val).children
            this.selectedCj=0
        },
        cjChangeFn(val){
            this.$emit('input',val)
        }
    },
    created(){
        this.$get('/api/common/allvillagedata').then(res => {
            if(res.data.success){
                this.zjData=res.data.content
            }else{
                this.changtoast(res.data.message,'error')
            }
        })
    }
}
</script>