<template>
<div>
  <div class="posts-container">

    <div v-for="post in posts" :key="post.id" id="before-headlines">
      
      <NuxtLink :to="`${post.slug}`">
        
        <img id="short-image" :src="post.image">
          <div id="before-title">
            <h3 id="title"> {{ post.title }} </h3>           
          </div>
         <div id="short-body">
          <p id="short-paragraph"> {{ post.description }} </p>
         </div>
                                        
          <div id="author-date">
              <div id="author"><span>By</span> <span> {{ post.user.name }} In {{ post.category }}</span></div>
          </div>  
        </NuxtLink> 

  </div>
     
  </div>
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
    }
  },

  methods: {
    getDate(datetime) {
                let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                return date
            },

    async getPosts(){
      try {
        const { data } = await this.$axios.get(`/api/auth/posts`);
        this.posts = data
        return true; 
      } catch (error) {
        this.loading = false;
       console.log(error.response)
        this.$toast.error(error.response.data.error);
      }
    },
  },

  created() {
    this.getPosts();
  },

 
}

</script>

<style scoped>


.posts-container {
  display: flex;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-around;
}

#before-headlines {
margin-bottom: 20px;
border-width: 2px;
border-style: solid;
border-color: #c20017;
max-width: 300px;
min-width: 300px;
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



@media screen and (max-width: 700px) {
  #short-body {
    display: flex;
    flex-direction: column;
  }

  .posts-container{
    display: block;
    width: 80%;
    
  }
}
</style>