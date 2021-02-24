<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header/>
        <Sidebar/>
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div> <!-- content wrapper ends -->
          <Footer/>
        </div> <!-- main panel ends -->
      </div> <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
  import Header from "./partials/Header";
  import Sidebar from "./partials/Sidebar";
  import Footer from "./partials/Footer";
  import eventbus from '@/EventBus'
  import { mapGetters } from 'vuex';
  export default {
    name: "layout",
    components: {
      Header,
      Sidebar,
      Footer
    },
    computed:{
      ...mapGetters(['get_admin'])
    },
    mounted(){
      console.log("layout mounted");
      eventbus.$once('admin failed',(payload)=>{
        console.log("admin error");
        this.$swal({
          title:payload.title,
          text:payload.text,
          toast:false,
          position:"center",
          grow:false,
          type:"error",
          confirmButtonColor:"rgb(151, 112, 177)",
          allowEscapeKey:false,
          allowOutsideClick:false
        }).then(()=>{
          this.$router.push('/login')
        })
      })
    }
  }
</script>
<style lang="scss" scoped>
.page-body-wrapper{
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
}
</style>