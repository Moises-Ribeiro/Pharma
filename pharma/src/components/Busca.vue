<template>
    <div class="Busca">
        <div class="search">
            <input type="text" placeholder="Filtrar por"  v-model="textoDeBusca" v-on:keypress.enter="busca(textoDeBusca)">           
        </div>
    </div>
</template>
<script>
export default{
    components:{      
    }, 
   data(){
       return{
           textoDeBusca: '',
       }
   },
   methods: Object.assign({},
     {
         busca(texto){             
            this.$emit('realizaBusca',texto);               
         },
     }
   ),
}
</script>
<style scoped>

</style>>
  

</style>
