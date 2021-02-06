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
  export default {
    name: "layout",
    components: {
      Header,
      Sidebar,
      Footer
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