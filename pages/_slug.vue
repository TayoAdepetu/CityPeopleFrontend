<template>
    <div>
<h1>{{ post[0].title }}</h1>
<p>By <span>{{ post[0].user_id }}</span> in <span></span></p>
<p>{{ post[0].body }}</p>

<div>
    <!--<comments />-->
</div>
</div>

</template>

<script scoped>
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
