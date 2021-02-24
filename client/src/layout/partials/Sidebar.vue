<template>
  <section class="app-sidebar custom">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item sidebar-user-actions">
          <div class="user-details">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="d-flex align-items-center">
                  <div class="sidebar-profile-img">
                    <b-avatar variant="info" style="height:inherit" :src="get_admin.img"></b-avatar>
                  </div>
                  <div class="sidebar-profile-text">
                    <p class="mb-1">{{ get_admin.name | nonNull }}</p>
                  </div>
                </div>
              </div>
              <div class="badge badge-danger">3</div>
            </div>
          </div>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" :to="`/dashboard/${get_admin.loa}`">
            <span class="icon-bg"><i class="mdi mdi-cube menu-icon"></i></span>
            <span class="menu-title">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="`/dashboard/${this.get_admin.loa}/institution`">
            <span class="icon-bg"><i class="mdi mdi-bank menu-icon"></i></span>
            <span class="menu-title">Institution</span>
          </router-link>
        </li>
        <li class="nav-item sidebar-user-actions">
          <div class="sidebar-user-menu">
            <a href="#" class="nav-link"><i class="mdi mdi-logout menu-icon"></i>
              <span class="menu-title">Log Out</span></a>
          </div>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'sidebar',
 data () {
    return {
      collapses: [ 
     { show: false },
     { show: false },
     { show: false }
    ]
    }
  },
  computed:{
    ...mapGetters(['get_admin'])
  },
  filters:{
    nonNull:function(value){
      if(value!=''){
        return value
      }else{
        return "guest"
      }
    }
  },
  methods: {
    collapseAll() {
      var exp_element = document.getElementsByClassName("show");
      if (exp_element.length > 0) {
        var elm_id = exp_element[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    }
  },
  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  },
  watch:{
    $route () {
       document.querySelector('#sidebar').classList.toggle('active');
    }
  } 
}
</script>

<style lang="scss" scoped>
.nav{
  height: 98vh;
}
.nav>li:last-child{
  margin-top: auto !important;
}
#sidebar{
  margin-top:4rem;
}
</style>