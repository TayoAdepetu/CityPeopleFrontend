<template>
    <div>
       
        <div>
                    <h1 id="title"> {{ directory.user.business_name }} </h1>
                    <img :src="`{{ directory.image }}`">
                    <div class="biz-describe"> {{ directory.description }} </div>
                    <div><nuxt-link :to="`/chat/${directory.user.id}`">Chat Business</nuxt-link></div>
                    <div id="author-date">
                       <div class="biz-details">
                        <div><span class="biz-bold"> Established:</span> {{directory.established}} </div>
                        <div><span class="biz-bold"> Location:</span> {{directory.location}} </div>
                        <div><span class="biz-bold"> No Of Employees:</span> {{directory.number_of_employees}} </div>
                        <div><span class="biz-bold"> Registered Here:</span> {{getDate(directory.created_at)}} </div>
                        <div><span class="biz-bold"> Email Address:</span> {{directory.user.email}} </div>
                        <div><span class="biz-bold"> Website:</span> {{directory.website}} </div>
                        <div><span class="biz-bold"> Phone:</span> {{directory.user.phone_number}} </div>
                    </div>
                    <div><span> Verified?: {{directory.verified}} </span></div>
                    </div>
                  
                </div> 

<div class="work-time faqs">
    <thead>
      <tr>
        <th class="text-center">Our Working Hours</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
            <span class="biz-bold">Monday:</span>
        </td>
        <td>
            {{worktime[0].monday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Tuesday:</span>
        </td>
        <td>
            {{worktime[0].tuesday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Wednesday:</span>
        </td>
        <td>
            {{worktime[0].wednesday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Thursday:</span>
        </td>
        <td>
            {{worktime[0].thursday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Friday:</span>
        </td>
        <td>
            {{worktime[0].friday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Saturday:</span>
        </td>
        <td>
            {{worktime[0].saturday}}
        </td>
        </tr>
        <tr>
        <td>
            <span class="biz-bold">Sunday:</span>
        </td>
        <td>
            {{worktime[0].sunday}}
        </td>
        </tr>
    </tbody>

</div>
<div class="faqs">
        <h3> Our Products </h3>
        <div class="product-section">
        <div v-for="product in products" :key="product.id" class="before-product">
            <NuxtLink :to="`/business-directory/directory-product/${product.product_name_slug}`">
                                         
                    <img :src="`{{ product.image }}`" >
                    <h4><span>{{product.product_name}}</span> (<span>₦ {{product.price}}</span>)</h4>  
                    <p>{{product.description}}</p>
                </NuxtLink>
            
        </div>
        </div>
    </div>

    <div class="faqs">
        <h3> Frequently Asked Questions </h3>
        <div v-for="faq in faqs" :key="faq.id" class="before-product">
  
                    <p class="biz-bold"> {{ faq.question }} </p> 
                    <p>{{faq.answer}}</p>
    
      </div>
    </div>
</div>

</template>

<script>
export default {
    auth: false,
    /*
    date(){
        return{
           directory:[],
        }
    },
*/
    async asyncData(context) {
        const [directoryRes, productsRes, worktimeRes, faqsRes] = await Promise.all([
            context.$axios.get(`/api/auth/biz-directory/${context.params.slug}`),
            context.$axios.get(`/api/auth/products/${context.params.slug}`),
            context.$axios.get(`/api/auth/all-worktime/${context.params.slug}`),
            context.$axios.get(`/api/auth/all-faqs/${context.params.slug}`)])
        return {
                directory: directoryRes.data,
                products: productsRes.data,
                worktime: worktimeRes.data,
                faqs: faqsRes.data,      
            }
        },

    methods:{
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },

}
         
}
</script>

<style scoped>
 .biz-describe {
      border: 2px solid #036;
      margin-top: 10px;
      padding: 12px;
      background-color: #F7F5F4;
      margin-bottom: 10x !important;
      text-align: left;

  }

  .biz-details{
    border: 2px solid #036;
      margin-top: 10px;
      padding: 12px;
      background-color: #F7F5F4;
      margin-bottom: 10x !important;
      text-align: left;
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 2.5%;
  }

  .biz-bold{
    font-weight: bold;
  }

  .work-time{
    border: 2px solid #036;
      margin-top: 10px;
      padding: 12px;
      background-color: #F7F5F4;
      margin-bottom: 10x !important;
      text-align: left;
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 2.5%;
  }

.text-center{
    text-align: center;
}

.before-product{
    display: block;
    border: 2px solid #036;
    margin-bottom: 10px;
}

.product-section{
      margin-top: 10px;
      padding: 12px;
      background-color: #F7F5F4;
      margin-bottom: 10x !important;
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 2.5%;
}

.faqs{
    margin-top: 20px;
}

@media screen and (max-width: 700px) {
  .biz-details{
    display: block;    
  }

  .product-section{
    display: block;
  }

}
</style>