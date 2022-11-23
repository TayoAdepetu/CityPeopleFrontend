<template>
    <div>
<h1>{{ post[0].title }}</h1>
<p>By <span>{{ post[0].user.name }}</span> in <span>{{ post[0].category.name }}</span></p>
<p>Last Updated: <span>{{ getDate(post[0].updated_at) }}</span></p>
<p class="body">{{ post[0].body }}</p>

<div>
    <comments />
</div>
</div>

</template>

<script scoped>
export default {
      auth: false,
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/blog/${context.params.slug}`)
        let post = response.data
        return {
                post          
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
<style scoped>
.body{
    text-align: left !important;
}
</style>