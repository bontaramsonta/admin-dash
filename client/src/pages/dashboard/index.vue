<template>
  <section class="dashboard">
    <div class="proBanner">
    </div>
   <div class="d-xl-flex justify-content-between align-items-start">
      <h2 class="text-dark font-weight-bold mb-2"> XII B </h2>
      <div class="d-sm-flex justify-content-xl-between align-items-center mb-2">
        <div class="btn-group bg-white p-3" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-link text-light py-0 border-right" @click="handlestate">7 Days</button>
          <button type="button" class="btn btn-link text-dark py-0 border-right">1 Month</button>
          <button type="button" class="btn btn-link text-light py-0">3 Month</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <b-tabs class="tab-transparent">
          <b-tab title="Overview" active>
            <div class="tab-transparent-content">
              <div class="row">
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body text-center">
                      <h5 class="mb-2 text-dark font-weight-normal">{{get_admin.name}}</h5>
                      <h2 class="mb-4 text-dark font-weight-bold">932.00</h2>
                      <div>
                        <radial-progress-bar class="ml-auto mr-auto" :diameter="125"
                        :completed-steps="70"
                        :total-steps="100"
                        innerStrokeColor="#eee"
                        startColor = "#1579ff"
                        stopColor="#7922e5"
                        :strokeWidth="7"
                        >
                        <i class="mdi mdi-lightbulb icon-md absolute-center text-dark"></i>
                      </radial-progress-bar>
                      </div>
                      <p class="mt-4 mb-0">Completed</p>
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">5443</h3>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body text-center">
                      <h5 class="mb-2 text-dark font-weight-normal">Unique Visitors</h5>
                      <h2 class="mb-4 text-dark font-weight-bold">756,00</h2>
                      <radial-progress-bar class="ml-auto mr-auto" :diameter="125"
                        :completed-steps="60"
                        :total-steps="100"
                        innerStrokeColor="#eee"
                        startColor = "#b4ec51"
                        stopColor="#429321"
                        :strokeWidth="7"
                        >
                        <i class="mdi mdi-account-circle icon-md absolute-center text-dark"></i>
                      </radial-progress-bar>
                      <p class="mt-4 mb-0">Increased since yesterday</p>
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">50%</h3>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body text-center">
                      <h5 class="mb-2 text-dark font-weight-normal">Impressions</h5>
                      <h2 class="mb-4 text-dark font-weight-bold">100,38</h2>
                        <radial-progress-bar class="ml-auto mr-auto" :diameter="125"
                        :completed-steps="90"
                        :total-steps="100"
                        innerStrokeColor="#eee"
                        startColor = "#fad961"
                        stopColor="#f76b1c"
                        :strokeWidth="7"
                        >
                        <i class="mdi mdi-eye icon-md absolute-center text-dark"></i>
                      </radial-progress-bar>
                      <p class="mt-4 mb-0">Increased since yesterday</p>
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">35%</h3>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body text-center">
                      <h5 class="mb-2 text-dark font-weight-normal">Followers</h5>
                      <h2 class="mb-4 text-dark font-weight-bold">4250k</h2>
                        <radial-progress-bar class="ml-auto mr-auto" :diameter="125"
                        :completed-steps="45"
                        :total-steps="100"
                        innerStrokeColor="#eee"
                        startColor = "#f5515f"
                        stopColor="#9f041b"
                        :strokeWidth="7"
                        >
                        <i class="mdi mdi-cube icon-md absolute-center text-dark"></i>
                      </radial-progress-bar>
                      <p class="mt-4 mb-0">Decreased since yesterday</p>
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">25%</h3>
                    </div>
                  </div>
                </div>
              </div>
              <basic-table></basic-table>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>

import RadialProgressBar from 'vue-radial-progress'
import BasicTable from '@/components/basic-tables'
import {mapGetters} from 'vuex'
export default {
  name: 'dashboard',
  components: {
    RadialProgressBar,
    BasicTable
  },
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters(['get_admin','get_students'])
  },
  methods: {
    toggleProBanner: () => {
      document.querySelector('body').classList.toggle('pro-banner-collapse');
    },
    handlestate(){
      this.$store.dispatch('FETCH_ADMIN',{email:"redmark@gmail.com",password:"12345678"})
    }
  },
  mounted(){
    this.$store.dispatch('FETCH_ADMIN')
  }
}
</script>

<style scoped>

</style>