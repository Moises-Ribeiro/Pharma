import Vue from 'vue';

const actions = {

    getListaPacientes(page){
      return Vue.http.get(`https://randomuser.me/api/?inc=location,picture,email,phone,registered,name,nat,gender&page=${page}&results=50`).then(ret =>{
          return ret;
      })   
    }

}
export default actions;