<template>
  <section class="register">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left px-5 pt-5 pb-3 rounded">
                <h4 class="text-dark font-weight-bold">New here?</h4>
                <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form class="pt-3">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-lg rounded" id="exampleInputUsername1" v-model="name" 
                    placeholder="Username">
                  </div>
                  <div class="form-group">
                    <input type="phone" class="form-control form-control-lg rounded" id="exampleInputEmail1" v-model="phone" 
                    placeholder="Phone">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg rounded" id="exampleInputPassword1" v-model="password" 
                    placeholder="Password">
                    <h6 :class="{'text-danger':isSubmitted}" class="font-weight-light">{{password_info}}</h6>
                  </div>
                  <div class="form-group">
                    <select class="form-control form-control-lg rounded" id="exampleFormControlSelect2" v-model="loa">
                      <option disabled value="" hidden>Level of access</option>
                      <option value="hod">HOD/Principal</option>
                      <option value="staff">Staff/teacher</option>
                      <option value="printer">Vendor</option>
                    </select>
                  </div>
                  <!-- hod stuff -->

                  <!-- // -->
                  <!-- staff stuff -->
                  <div v-if="loa=='staff'" class="form-group">
                    <input type="text" class="form-control form-control-lg rounded" v-model="institution_code" placeholder="institution code">
                    <h6 :class="{'text-danger':isSubmitted}" class="font-weight-light">{{ institutioncode_info }}</h6>
                  </div>
                  <div v-if="loa=='staff'">
                    <div class="d-flex justify-content-start align-items-center align-self-center py-2">
                    <button class="btn btn-success" @click="addClass">Register for a class</button>
                    <h2 class=" pl-2 m-0">+1</h2>
                    </div>
                    <div class="form-group"
                      v-for="(Class, counter) in classes"
                      v-bind:key="counter">
                        <div class="form-group">
                          <div class="d-flex justify-content-between align-items-center align-self-center py-2">
                            <div>#{{ counter+1 }}</div>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteClass(counter)">x</button>
                          </div>
                          <input type="text" class="form-control form-control-lg rounded" placeholder="class" v-model.lazy="Class.classname" required>
                          <h6 :class="{'text-danger':isSubmitted}" class="font-weight-light">{{ class_info }}</h6>
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control form-control-lg rounded" placeholder="section" v-model.lazy="Class.section" required>
                          <h6 :class="{'text-danger':isSubmitted}" class="font-weight-light">{{ section_info }}</h6>
                        </div>
                    </div>
                  </div>
                  <!-- // -->
                  <div class="mb-4">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" v-model="istoc" class="form-check-input">
                        I agree to all Terms & Conditions
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button :disabled="!istoc" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" @click.prevent="handleSubmit">SIGN UP</button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Already have an account? <router-link to="/login" class="text-primary">Login</router-link>
                  </div>
                    <h6 class="text-center font-weight-light">&#169; a product by <a target="_blank" href="https://thereciprocalsolutions.com/">the reciprocal solutions</a></h6>
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
export default {
  name: 'Register',
  data(){
    return {
      name:'',
      phone:'',
      password:'',
      loa:'',
      institution:'',
      institution_code:'',
      classes:[
        {
          classname: '',
          section:''
       }
      ],
      password_info:'must contain at least 8 characters',
      institutioncode_info:'provided by your institution',
      class_info:'must be in roman number eg: XI, V',
      section_info:'must be single character eg: A, B, 1',
      isSubmitted:false,
      istoc:false
    }
  },
  methods:{
    addClass(){
      this.classes.push({
        classname:'',
        section: ''
    })
    },
    deleteClass(counter){
      this.classes.splice(counter,1);
    },
    handleSubmit(){
      // validate inputs
      let alphaNumValidator = new RegExp("^[a-zA-Z0-9]*$")
      let NumValidator = new RegExp("^[0-9]*$")
      let isPasswordValid = this.password.length>7?alphaNumValidator.test(this.password)?true:false:false
      let isNameValid = (alphaNumValidator.test(this.name)&&this.name.length!=0)?true:false
      let isPhoneValid = this.phone.length==10&&NumValidator.test(this.phone)?true:false
      // update ui state
      this.isSubmitted=true
      if(isPasswordValid&&isNameValid&&isPhoneValid){
        console.log("everything valid");
        // loa based register
        let baseAdmin = {
          name:this.name,
          phone:this.phone,
          password:this.password,
          loa:this.loa
        }
        // ADD_ADMIN
        if(this.loa=='staff'){
          // staff validation
          let isStaffInstitutionCodeValid = this.institution_code.length>=6&&NumValidator.test(this.institution_code)?true:false
          if(isStaffInstitutionCodeValid)
          {
            console.log("staff dispatch");
            this.$store.dispatch('ADD_ADMIN',{
              ...baseAdmin,
              institution_code:this.institution_code,
              classes:this.classes,
            })
          }
        }else if(this.loa=='hod')
        {
          console.log("hod dispatch");
          this.$store.dispatch('ADD_ADMIN',{
            ...baseAdmin
          })
        }
      }
    }
  }
}
</script>