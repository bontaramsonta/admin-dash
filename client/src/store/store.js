import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import eventbus from '../EventBus'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    admin:null,
    token:window.localStorage.getItem('token'),
    institutionDetails:{},
    students:[]
  },
  getters:{
    get_admin(state){
      return state.admin
    },
    get_token(state){
      return state.token
    },
    get_students(state){
      return state.students
    },
    get_institution(state){
      return state.institutionDetails
    },
  }
  ,
  mutations:{
    set_admin(state,payload){
      state.admin = payload
    },
    set_token(state,payload){
      state.token = payload;
      window.localStorage.setItem('token', payload);
    },
    set_institutionDetails(state,payload){
      state.institutionDetails = payload
    },
    set_students(state,payload){
      state.students = payload
    }
  },
  actions:{
    async FETCH_STUDENTS(context){
      try{
        // check for token in local storage
        let tokenstring = context.state.token
        console.log(tokenstring);
        if(tokenstring!=null){
          // get admin
          const response = await axios.get('http://localhost:8001/institution/add/new',
          {headers:{
            'authorization':`Bearer ${tokenstring}`
          }});
          if (response.status !== 200) {
            throw new Error(`${response.status} error when fetching token!`);
          }
          context.commit('set_admin', response.data);

        }else{
          //
        }
      }catch(err){
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("red",err.response);
          eventbus.$emit('admin failed')
        } else if (err.request) {
          // client never received a response, or request never left
          eventbus.$emit('admin failed')
        } else {
          // anything else
        }
      }
    },
    async FETCH_ADMIN(context){
      try{
        // check for token in local storage
        let tokenstring = context.state.token
        console.log(tokenstring);
        if(tokenstring!=null){
          // get admin
          const response = await axios.get('http://localhost:8001/admin/get',
          {headers:{
            'authorization':`Bearer ${tokenstring}`
          }});
          if (response.status !== 200) {
            throw new Error(`${response.status} error when fetching token!`);
          }
          context.commit('set_admin', response.data);
          eventbus.$emit('admin success',{loa:response.data.loa})
        }else{
          eventbus.$emit('admin failed',{
            title:"Profile fetch failed",
            text:"please login again"
          })
        }
      }catch(err){
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("red",err.response);
          eventbus.$emit('admin failed',{
            title:"Profile fetch failed",
            text:"please login again"
          })
        } else if (err.request) {
          // client never received a response, or request never left
          eventbus.$emit('admin failed',{
            title:"Profile fetch failed",
            text:"please login again"
          })
        } else {
          // anything else
        }
      }
    },
    async ADD_ADMIN(context,payload){
      try{
        let response = await axios.post('http://localhost:8001/admin/add',payload)
        console.log(response);
        if(response.status==201)
        {
          context.commit('set_admin',response.data)
        }
      }catch(err){
        console.log(err);
      }
    },
    async FETCH_TOKEN(context,payload){
      try{
        const response = await axios.post('http://localhost:8001/admin/login',{
          phone:payload.phone,
          password:payload.password
        })
        if (response.status !== 200) {
          throw new Error(`${response.status} error when fetching token!`);
        }
        context.commit('set_token', response.data.token);
        eventbus.$emit('login success')
      }catch(err){
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("red",err.response);
          eventbus.$emit('login failed')
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("blue",err.request);
        } else {
          // anything else
        }
      }
    },
    async FETCH_INSTITUTION(context){
      console.log("fetch institution called");
      try{
        if(context.state.token!=null){
        const response = await axios.post('http://localhost:8001/institution/get/6557',{
          headers:{
            'authorization':`Bearer ${context.state.token}`
          }
        })
        if (response.status !== 200) {
          throw new Error(`${response.status} error when fetching institution!`);
        }
        context.commit('set_institution', response.data);
        eventbus.$emit('institution success')
        }else{
          eventbus.$emit('institution failed')
        }
      }catch(err){
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("red",err.response);
          eventbus.$emit('institution fetch failed')
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("blue",err.request);
        } else {
          eventbus.$emit('institution fetch failed',{
            title:"Institution fetch failed",
            text:"please login again"
          })
        }
      }
    }
  }
})
