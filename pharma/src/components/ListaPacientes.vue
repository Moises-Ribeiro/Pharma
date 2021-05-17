<template>
    <div class="ListaPaciente">
        <div class="busca">
           <Busca @realizaBusca="getTextoBusca" />
        </div>  
        <div class="mygrid">
           <MyGrid :gridColumns="colluns" 
                   :gridPaginator=paginator 
                   :actionsAcoes=action 
                   @changeListaDeletados="getListaDeletados"
                   />
        </div>              
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import MyGrid from '@/components/MyGrid.vue'
import Busca from '@/components/Busca.vue'
export default{
    components:{
      MyGrid,
      Busca
    },
       
    data(){
        return{
            colluns:[],
            listaDeletados:[],
            listaPacientes:[],
            lstFiltrados:[],
            textoBusca: '',
            action: false,
            paginator: false
        }
    },
    watch:{
      loadListaPacientes : 'setColluns'
    },
    computed: Object.assign({},
      mapGetters(['loadListaPacientes']),
      {
         
      }
    ),
    methods: Object.assign({},
      mapActions(['getListaPacientes']),
      {
          loadPacientes(){      
              let page = '10'        
              this['getListaPacientes'](page).then(ret =>{                 
                  if(ret.ok){                      
                      this.$store.commit('carregaListaPaciente',ret.data);
                  }
              })
          },
          setColluns(val){       
              this.action = true;   
              this.paginator = true;
              this.listaPacientes = val.results;   
              this.colluns = val.results;                 

          },
          getTextoBusca(texto){
              
              this.textoBusca = texto;
              if(this.textoBusca !== ''){
                this.lstFiltrados = [];  
                //this.findList(this.listaDeletados);            
                this.findList(this.colluns);
                this.colluns = this.lstFiltrados;
                this.action = true;
                this.paginator = true;
              }
              else{
                this.colluns = this.listaPacientes;
                this.action = true;  
                this.paginator = true;
              }              
          },
          findList(lista){                                      
             for(const item in lista){                
                if(lista[item].nat === this.textoBusca || lista[item].gender === this.textoBusca || lista[item].name.first === this.textoBusca ){
                  this.lstFiltrados.push(lista[item]);
                    console.log(lista[item]);
                }
             }                         
          },
          getListaDeletados(lista){
              this.listaDeletados = lista;                          

          }
      }
    ),
    mounted(){
        this.loadPacientes();

    },

}

</script>
<style>
  .busca{
    text-align: center;
    padding-top: 20px;
  }

</style>
