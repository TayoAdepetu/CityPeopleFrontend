<template>
    <div>
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
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/all-faqs/${context.params.slug}`)
        let faq = response.data
        return {
                faq       
            }
        }

}
</script>
