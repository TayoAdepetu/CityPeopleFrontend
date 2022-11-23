<template>
    <div>
       
        <div>
                    <h2 id="title"> {{ directory.user.business_name }} </h2>
                    <img :src="`{{ directory.image }}`">
                    <div> {{ directory.description }} </div>       
                    <div id="author-date">
                       <div id="author"> 
                        <span> Established: {{directory.established}} </span>
                        <span> Location: {{directory.location}} </span>
                        <span> No Of Employees: {{directory.number_of_employees}} </span>
                        <span> Registered On This Site Since: {{directory.registered_here}} </span>
                        <span> Verified?: {{directory.verified}} </span>
                        <span> Email Address: {{directory.email}} </span>
                        <span> Website: {{directory.website}} </span>
                        <span> Phone: {{directory.phone}} </span>
                    </div>
                    </div>
                  
                </div> 

<div>
                    <h2>Our Working Hours</h2>
           <h3>Monday: {{worktime[0].monday}}</h3> 
           <h3>Tuesday: {{worktime[0].tuesday}}</h3> 
           <h3>Wednesday: {{worktime[0].wednesday}}</h3> 
           <h3>Thursday: {{worktime[0].thursday}}</h3> 
           <h3>Friday: {{worktime[0].friday}}</h3>
           <h3>Saturday: {{worktime[0].saturday}}</h3>  
           <h3>Sunday: {{worktime[0].sunday}}</h3>   
        </div>

        <h3 id="title"> Our Products </h3>
        <div v-for="product in products" :key="product.id" id="before-headlines">
            <NuxtLink :to="`/business-directory/directory-product/${product.product_name_slug}`">
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

        <h3 id="title"> Frequently Asked Questions </h3>
        <div v-for="faq in faqs" :key="faq.id" id="before-headlines">
            <div id="headlines">              
                  
                  <div>
                    
                    <p> {{ faq.question }} </p> 
                    <p>{{faq.answer}}</p>
                  
                </div>             
              
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
         
}
</script>
