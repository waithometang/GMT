<template>
  <div class="fntxqbzxx">1</div>
</template>
<script>
import { YqfkWdsqXq} from '@/api/FNTApi';
export default {
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  created(){this.init()},
  methods:{
    init(){
      YqfkWdsqXq ({id:this.id
      }).then (rps => {
        if (rps.data.success) {
          console.log(rps.data.content);
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
  }
}
</script>