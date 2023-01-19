<template>
    <div>
<h1>{{ post[0].susubject_name }}</h1>
<img id="short-image" :src="baseURL + 'postimage/' + post[0].image">
<p>{{ post[0].subject_name }}</p>
<p>Last Updated: <span>{{ getDate(post[0].updated_at) }}</span></p>
<div class="body" v-html="`${ post[0].body }`"></div>

<!--
<div>
    <comments />
</div>
-->
</div>

</template>

<script scoped>
export default {
      auth: false,
      data(){
        return{
            baseURL: process.env.BASE_URL || 'http://localhost:8000/',

        }
      },

      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/fetch-subsubject/${context.params.slug}`)
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

#short-image{
    width: 70%;
    height: 500px;
}
.body{
    text-align: left !important;
}

/*css for the description classes*/
.bold-span{
    font-weight: bold;
}

.italic-span{
    font-style: italic;
}

.image-dressing{
    width:100vh;
    height: 400px;
}
</style>
