import Vue from 'vue';

const mutations = {
    carregaListaPaciente(state,obj){
        state.listaPacientes = obj;           

    },
    deletaPaciente(state,idx){       
        state.listaPacientes.results.splice(idx,1);        
        
    },
    carregaPacienteExcluidos(state,obj){        
        state.listaArquivoMorto = obj;        
    }
}
export default mutations;