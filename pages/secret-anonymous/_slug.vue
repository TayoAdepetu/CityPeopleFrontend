<template>
    <div>
        <div>
           
                    <h3 id="title"> {{ secret.title }} </h3>
                    <p> {{ secret.description }} </p>           
                    <div id="author-date">
                       <div id="author"> <span> Posted: {{getDate(secret.created_at)}} </span></div>
                    </div>
              
                </div> 

<div>
   <!-- <secret-comments />-->
</div>
</div>

</template>

<script scoped>

export default {
    auth: false,
       
      async asyncData(context) {
        let data = await context.$axios.get(`/api/auth/secret/${context.params.slug}`)
        let secret = data.data[0]
        return {
                secret          
            }
        },

        methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
            }

}
</script>
