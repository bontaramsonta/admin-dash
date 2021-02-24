<template>
  <div>institution details</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name:"institution-details",
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters(['get_institution'])
  },
  methods:{
    
  }
}
</script>