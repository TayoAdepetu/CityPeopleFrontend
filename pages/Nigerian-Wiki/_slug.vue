<template>
<div>
    <!--Dynamic page for individual subject articles fetched by slug-->
    <h1>{{ post[0].title }}</h1>
        <div v-for="subsubject in subsubjects" :key="subsubject.id" >
            <div>{{ subsubject.name }}</div>
        </div>
        <img id="short-image" :src="baseURL + 'postimage/' + post[0].image">
        <p>By <span>{{ post[0].user.name }}</span> in <span>{{ post[0].category.name }}</span></p>
        <p>Last Updated: <span>{{ getDate(post[0].updated_at) }}</span></p>
        <div class="body" v-html="`${ post[0].body }`"></div>

        <!--
    <div>
        <comments />
    </div>
    -->
    <div>
        <h1>Please, help us in expanding and maintaining the integrity of this Nigerian-People-and-Institutions Knowledge Base.</h1>
    </div>
        <h2>Here are ways you can help us:</h2>
        <p>Tell us the people or institutions you would want us to create web pages for on this website.</p>
        <p>Tell us about any wrong information about a person or insttitution that we might have mistakenly published on this website.</p>

        <h2>The Rules:</h2>
        <ul>
            <li>Please, if you're refuting any statement made about a person or institution, kindly share with us sources containing facts about the subject matter.</li>
        </ul>

        <div>
        Thanks,
        The CityPeople Team
        </div>
</div>
</template>

<script scoped>
export default {
      auth: false,
      data(){
        return{
            baseURL: process.env.BASE_URL || 'http://localhost:8000/',
            subsubjects:[],

        }
      },

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
        },

        methods:{
            async fetchSubsubject(context){
                let response = await context.$axios.get(`/api/auth/subsubject/${context.params.slug}`)
                let subsubjects = response.data
                return {
                    subsubjects  
                 }
            }
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
