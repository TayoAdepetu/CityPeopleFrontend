<template>
<div>
  <!--
    <div class="grid-container">
    <div v-for="post in posts" :key="post.id" id="before-headlines">
      
      <NuxtLink :to="`${post.slug}`">
        
        <img id="short-image" :src="baseURL + 'postimage/' + post.image">
          <div id="before-title">
            <h3 id="title"> {{ post.title }} </h3>           
          </div>
         <div id="short-body">
          <p id="short-paragraph">{post.description }</p>
         </div>
                                        
          <div id="author-date">
              <div id="author"><span>By</span> <span> {{ post.user.name }} In {{ post.category.name }}</span></div>
          </div>  
        </NuxtLink> 
      </div>
  </div>
     -->
  <div>
      <job-vacancy />
  </div>

  </div>
</template>

<script scoped>

export default { 
  auth: false,
  data() {
    return {
      posts: [],
      baseURL: process.env.BASE_URL || 'http://localhost:8000/',
    }
  },

  methods: {
    getDate(datetime) {
                let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                return date
            },
/*
    async getPopularNames(){
      try {
        const { data } = await this.$axios.get(`/api/auth/popularnames`);
        this.s = data
        return true; 
      } catch (error) {
        this.loading = false;
       console.log(error.response)
        this.$toast.error(error.response.data.error);
      }
    },
    */
  },
/*
  created() {
    this.getPopularNames();
  },
*/
 
}

</script>

<style scoped>

.grid-container{
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 2.5%;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
}

#before-headlines {
margin-bottom: 20px;
border-width: 2px;
border-style: solid;
border-color: #c20017;
}

#short-body {
  margin-top: 1px;
}

#title {
  margin-bottom: 1px;
  color: #c20017;
}

#short-paragraph {
  width: auto;
  font-size: 14px;
  text-align: center;
  margin-left: 4px;
  margin-right: 4px;
}

#short-image {
  width: 100%;
  height: 220px;
  margin-top: 0px;
}

#author-date {
  display: flex;
  margin-bottom: 0;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: auto !important;  
 

}

@media screen and (max-width: 1000px) {
  .grid-container{
    grid-template-columns: auto auto;    
  }

}

  @media screen and (max-width: 700px) {
  .grid-container{
    grid-template-columns: auto;
    max-width: 60%;   
  }
}

@media screen and (max-width: 500px) {
  .grid-container{
    grid-template-columns: auto;
    max-width: 80%;   
  }
}

@media screen and (max-width: 360px) {
  .grid-container{
    grid-template-columns: auto;
    max-width: 90%;   
  }
}
</style>