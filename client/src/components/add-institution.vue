<template>
  <section class="dashboard">
   <div class="d-xl-flex justify-content-between align-items-start">
      <h2 class="text-dark font-weight-bold mb-2"> Add Institution </h2>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <b-form>
          <b-form-group v-if="show"
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            description="Full name of your institution."
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
    
          <b-form-group id="input-group-2" label="Address:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.address"
              placeholder="Enter address"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Address:" label-for="input-3"
            description = "moto or one line "
          >
            <b-form-input
              id="input-3"
              v-model="form.address"
              placeholder="Enter subtext"
              required
            ></b-form-input>
          </b-form-group>
    
          <b-form-group id="input-group-4" label="Food:" label-for="input-4">
            <b-form-select
              id="input-4"
              v-model="form.food"
              :options="foods"
              required
            ></b-form-select>
          </b-form-group>
          <div class="d-flex justify-content-start align-items-center align-self-center py-2">
          <button class="btn btn-success" @click.prevent="addClass">Register for a class</button>
          <h2 class=" pl-2 m-0">+1</h2>
          </div>
          <b-form-group
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
          </b-form-group>
      <b-button type="submit" @click.prevent="onSubmit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name:"add-institution",
  data(){
    return {
      form: {
        email: '',
        name: '',
        address:'',
        checked: [],
      },
      classes:[
      {
        classname: '',
        section:''
      }
      ],
      class_info:'must be in roman number eg: XI, V',
      section_info:'must be single character eg: A, B, 1',
      isSubmitted:false,
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods:{
    onSubmit() {
      alert(JSON.stringify(this.form))
    },
    addClass(){
      this.classes.push({
        classname:'',
        section: ''
    })
    },
    deleteClass(counter){
      this.classes.splice(counter,1);
    },
  }
}
</script>