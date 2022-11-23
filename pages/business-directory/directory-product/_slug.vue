<template>
    <div>
             <div>                                
                  <div id="new-headlines">                    
                    <img :src="`{{ product[0].image }}`" > 
                    <h1>{{product[0].product_name}}</h1>
                    <p><span>Price: ₦ {{product[0].price}}</span></p>
                    <div id="product-description">
                        <h2>Contact Seller</h2>
                        <p><span class="seller-details">Product Location:</span> {{product[0].location}}</p>
                    <p><span class="seller-details">Seller:</span> {{product[0].user.business_name}}</p>
                        <p><span class="seller-details">Seller Phone:</span> {{product[0].user.phone_number}}</p> 
                    </div>
                    
                    <div id="product-description"><h2 id="product-details">Product Details</h2>
                        <div>{{product[0].description}}</div>
                    </div>
                     
                </div>
             </div>
    </div>

</template>

<script>
export default {
       auth: false,
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/product/${context.params.slug}`)
        let product = response.data
        return {
                product
            }
        }

}
</script>

<style scoped>
#new-headlines{
    display: block;
}

#product-description {
      border: 2px solid #036;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #F7F5F4;
      margin-bottom: 3px !important;
      text-align: left;

  }

.seller-details{
    font-weight: bold;
}
</style>