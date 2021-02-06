<template>

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left px-5 pt-5 pb-3 rounded">
                <h4 class="font-weight-bold text-dark">Hello! let's get started</h4>
                <h6 class="font-weight-light">Sign in to continue.</h6>
                <form class="pt-3">
                  <div class="form-group">
                    <input type="phone" class="form-control form-control-lg" id="exampleInputPhone" placeholder="Phone"
                      autocomplete="mobile"
                      v-model="phone"
                    >
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" id="exampleInputPassword"
                      placeholder="Password"
                      v-model="password">
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      @click.prevent="handleSubmit">SIGN IN</button>
                  </div>
                  <div>
                  <div class="text-center mt-4 font-weight-light">
                    Don't have an account? <router-link to="/register" class="text-primary">Create</router-link>
                  </div>
                  <h6 class="text-center font-weight-light">&#169; a product by <a target="_blank" href="https://thereciprocalsolutions.com/">the reciprocal solutions</a></h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
      <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script>
import { mapGetters } from 'vuex'
import eventbus from '@/EventBus'
export default {
  name: 'Login',
  data(){
    return {
      phone:'',
      password:''
    }
  },
  computed:{
    ...mapGetters(['get_token'])
  },
  methods:{
    handleSubmit(){
      // validate inputs
      let alphaNumValidator = new RegExp("^[a-zA-Z0-9]*$")
      let NumValidator = new RegExp("^[0-9]*$")
      let isPasswordValid = this.password.length>7?alphaNumValidator.test(this.password)?true:false:false
      let isPhoneValid = this.phone.length==10&&NumValidator.test(this.phone)?true:false
      if(isPasswordValid&&isPhoneValid)
      {
        // FETCH_TOKEN
        this.$store.dispatch('FETCH_TOKEN',{phone:this.phone,password:this.password})
        eventbus.$once('login success',()=>{
          console.log("login success");
          this.$router.push('dashboard')
        })
      }
    }
  },
  mounted(){
    eventbus.$on('login failed',function(){
      console.log("login failed");
      this.$swal("login failed")
    })
  },
}
</script>