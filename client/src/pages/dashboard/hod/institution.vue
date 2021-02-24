<template>
  <div>
    <div v-if="componentState=='no-institution'">
      <add-institution />
    </div>
    <div v-else-if="componentState=='got-institution'">
      <institution-details />
    </div>
    <div v-else>please wait</div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import AddInstitution from '@/components/add-institution'
import InstitutionDetails from '@/components/institution-details'
import eventbus from '@/EventBus'
export default {
  name: 'institution',
  components: {
    'add-institution':AddInstitution,
    'institution-details':InstitutionDetails
  },
  data() {
    return {
      componentState:''
    }
  },
  computed:{
    ...mapGetters(['get_admin','get_students','get_institution'])
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    }
  },
  mounted(){
    document.querySelector('body').classList.add('sidebar-icon-only')
    console.log("mounted of institution called");
    // check if institutition details in store
    // if empty/null then fetch
    // if fetch failed then show error toast
    // if fetch success and no institution then set component state to no institution
    // otherwise show institution details and edit inst button
    // state error, no-inst, got-inst
    this.$store.dispatch('FETCH_INSTITUTION')
    eventbus.$once('institution success',()=>{
      this.componentState='got institution'
    })
    eventbus.$once('institution failed',()=>{
      this.componentState='no institution'
    })
  }
}
</script>

<style scoped>

</style>