<template>
    <div>
        <div>
                    <h3 id="title"> {{ secret.title }} </h3>
                    <p> {{ secret.description }} </p>           
                    <div id="author-date">
                       <div id="author"> <span> Posted: {{getDate(secret.date)}} </span></div>
                    </div>
                  
                </div> 

<div>
    <secret-comments />
</div>
</div>

</template>

<script>
export default {
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/blog/${context.params.slug}`)
        let post = response.data
        return {
                post          
            }
        }

}
</script>
