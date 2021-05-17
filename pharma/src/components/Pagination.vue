<template>
    <div class="Pagination" v-if="pages.info">                
       <nav aria-label="Page navigation" style="text-align: center">
          <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="idx in totalPages" :key="idx"  class="page-item" @click.prevent="setPages(idx+1)"><a class="page-link" href="#">{{ idx+1}}</a></li>
              
              <li class="page-item">
                 <a class="page-link" href="#" aria-label="Next">
                   <span aria-hidden="true">&raquo;</span>
                 </a>
              </li>
          </ul>
        </nav>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default{
    props:{
        totalPages: {
           type: Array,
           required: true
           
        },

    },
    data(){
        return{
            
        }
    },
    computed: Object.assign({},
      mapGetters(['loadListaPacientes']),
      {
         pages(){
             console.log(this.loadListaPacientes);
             return this.loadListaPacientes;
         }
      }
    ),    
    methods: Object.assign({},
      {
         setPages(page){
             this.$emit('changePage',page);
         }
      }
    ),
}
</script>
<style>

</style>
