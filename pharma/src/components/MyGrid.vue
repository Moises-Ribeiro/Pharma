<template>
    <div class=MyGrid>
        <div>            
          <table class="table">
            <thead>
                <tr>                
                    <th scope="col">Nome</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Naturalidade</th>
                    <th v-if="actionsAcoes" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" item,idx in gridColumns" :key="idx">                    
                    <td>{{item.name.first}}</td>
                    <td>{{item.gender}}</td>
                    <td>{{item.nat}}</td>
                    <td v-if="actionsAcoes">
                       <button class="btn btn-danger" @click="deletar(idx,item.name.first,item.gender,item.nat)">Excluir</button> 
                       <button class="btn btn-info" @click="visualizar(item)">Visualizar</button>                            
                    </td>
                </tr>
            </tbody>
          </table>  
        </div>
        <div v-if="gridPaginator">
            <Pagination :totalPages="paginacao" v-on:changePage="changePage"/>
        </div>
        <div class="modal fade" id="detalhePaciente" tabindex="-1" aria-labelledby="detalhePacienteLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                      <h5 class="modal-title" id="detalhePacienteLabel">Detalhes do Paciente</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                       <div class="row g-1">
                           <div class="col-sm-10">
                               <img :src="itemLista.picture.thumbnail">
                            </div>
                            <div class="col-sm-5">
                                <legend>Nome</legend>
                                <input type="text" id="nome" v-model="nome">
                            </div>
                            <div class="col-sm-5">
                                <legend>Telefone</legend>
                                <input type="text" v-model="itemLista.phone">
                            </div>
                            <div class="col-sm-5">
                                <legend>E-mail</legend>
                                <input type="text" v-model="itemLista.email">
                            </div>
                            <div class="col-sm-5">
                                <legend>Genero</legend>
                                <input type="text" v-model="itemLista.gender">
                            </div>
                            <div class="col-sm-5">
                                <legend>Nacionalidade</legend>
                                <input type="text" v-model="itemLista.nat">
                            </div>
                            <div class="col-sm-5">
                                <legend>Data Nasc</legend>
                                <input type="text" v-model="itemLista.registered.date">
                            </div>
                            <div class="col-sm-5">
                                <legend>Endereço</legend>
                                <input type="text" v-model="endereco">
                            </div>
                            <div class="col-sm-5">
                                <legend>Cidade</legend>
                                <input type="text" v-model="itemLista.location.city">
                            </div>
                            <div class="col-sm-5">
                                <legend>Estado</legend>
                                <input type="text" v-model="itemLista.location.state">
                            </div>
                            <div class="col-sm-5">
                                <legend>Cep</legend>
                                <input type="text" v-model="itemLista.location.postcode">
                            </div>

                       </div>
                    </div>
                    <div class="modal-footer">                    
                      <button type="button" class="btn btn-primary" @click="fechar">Fechar</button>
                    </div>
                </div>
            </div>
        </div> 
       
    </div>

</template>
<script>
import {mapActions} from 'vuex';
import Pagination from '@/components/Pagination.vue'
export default{
    data(){
        return{
            nome:'',
            endereco:'',
            numPages: '10',
            paginacao :[],
            ArquivoMorto:[],
            itemLista: { name:{first:''},
                         picture:{thumbnail:''},
                         registered:{date:''},
                         location:{city:'',state:'',postcode:'',street:{name:'',number:''}}
                        }
        }
    },
    components:{
       Pagination

    },
    props:{
        gridColumns: {
        type: Array,
        default: []
      },
      gridPaginator: {
        type: Boolean,
        default: false
      },
      actionsAcoes: {
        type: Boolean,
        default: false
      },

    },
    methods: Object.assign({},
       mapActions(['getListaPacientes']),
      {
          changePage(page){
              console.log(page);
              this['getListaPacientes'](page.toString()).then(ret =>{                 
                  if(ret.ok){
                      this.$store.commit('carregaListaPaciente',ret.data);
                  }
              })

          },
          carregaListaPaginacao(){
              for (var i = 1; i < this.numPages; i++){
                  this.paginacao.push(i);

              }
          },
          deletar(idx,nome,genero,naturalidade){     
              let obj = {
                  'name':{'first':nome},
                  'gender':genero,
                  'nat': naturalidade,
                  'indice': idx
              }           
             this.$store.commit('deletaPaciente',idx);             
             this.ArquivoMorto.push(obj);             
             this.$store.commit('carregaPacienteExcluidos',this.ArquivoMorto);             
             this.$emit('changeListaDeletados',this.ArquivoMorto);
             
          },
          visualizar(item){
              this.nome = item.name.first + ' '+ item.name.last;
              this.endereco = item.location.street.name + ' '+ item.location.street.number;
              this.itemLista = item;              
              console.log(this.itemLista);
              window.$('#detalhePaciente').modal('show');
              
          },
          fechar(){
               window.$('#detalhePaciente').modal('hide');
          }

      }
    ),
    created(){
        this.carregaListaPaginacao();
    },

  
    

       

}
</script>
<style>

</style>
