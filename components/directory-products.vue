<template>
    <div>
        <h3 id="title"> Our Products </h3>
        <div v-for="product in products" :key="product.id" id="before-headlines">
            <NuxtLink :to="`/business-directory/directory-product/${product.slug}`">
             <div id="headlines">              
                  <h3>{{product.product_name}}</h3>
                  <div>                    
                    <img :src="`{{ product.image }}`" > 
                    <p>{{product.price}}</p>  
                    <p>{{product.description}}</p>              
                </div>             
              
             </div>

            </NuxtLink>
            
        </div>

    </div>

</template>

<script>
export default {
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/products/${context.params.slug}`)
        let products = response.data
        return {
                products         
            }
        }

}
</script>
