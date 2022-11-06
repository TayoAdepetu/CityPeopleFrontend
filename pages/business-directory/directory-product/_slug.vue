<template>
    <div>
       
             <div id="headlines">              
                  <h3>{{product.product_name}}</h3>
                  <p>By {{product.business_name}}</p>
                  <div>                    
                    <img :src="`{{ product.image }}`" > 
                    <p>{{product.price}}</p>  
                    <p>{{product.description}}</p>
                    <p>{{product.biz-location}}</p>  
                    <p>{{product.phone}}</p>        
                </div>
             </div>
    </div>

</template>

<script>
export default {
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/product/${context.params.slug}`)
        let product = response.data
        return {
                product        
            }
        }

}
</script>
