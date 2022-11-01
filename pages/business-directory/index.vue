<template>
    <div>
      <div class="posts-container">
    
      <div v-for="post in posts" :key="post.id" id="before-headlines">
            <div id="headlines">
              <NuxtLink :to="post.slug">
                <div id="short-body">
                  <img id="short-image" :src="post.image">
                  
                  <div id="before-title">
                    <h3 id="title"> {{ post.title }} </h3>
                    <p id="short-paragraph"> {{ post.description }} </p>            
                    <div id="author-date">
                       <div id="author"><span>By</span> <span> {{ post.user_id }} {{ post.id }}</span></div>
                       <div id="category-tag"><span>In</span> <span> {{ post.category }} </span></div>
                    </div>
                  </div>
                </div>             
              </NuxtLink>
            </div>
            
      </div>
    
      </div>
    
      <div>
        <job-vacancy />
      </div>
    </div>
    </template>
    
    <script scoped>
    
    export default { 
    
      data() {
        return {
          directories: [],
        }
      },
    
      methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
    
        async getDirectories(){
          try {
            const { data } = await this.$axios.get(`/api/auth/all-biz`);
            this.directories = data.bizdirectories.data
            return true; 
          } catch (error) {
            this.loading = false;
           console.log(error.response)
            this.$toast.error(error.response.data.error);
          }
        },
      },
    
      created() {
        this.getDirectories();
      },
    
     
    }
    
    </script>
    
    <style scoped>
    
      #before-title {
        min-height: 200px;
      }
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
    border-radius: 5px;
    border-color: #c20017;
      }
    
    #short-body {
      display: flex;
      margin-top: 1px;
    }
    
    #title {
      margin-bottom: 1px;
      color: #c20017;
    }
    
    #short-paragraph {
      width: auto;
      font-size: 14px;
      text-align: justify;
      margin-left: 4px;
      margin-right: 4px;
    }
    
    #short-image {
      width: 200px;
      height: 200px;
    }
    
    #author-date {
      display: flex;
      margin-bottom: 0;
      justify-content: space-between;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: auto !important;  
     
    
    }
    
    #title {
      margin-top: 0;
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
     
      #short-image {
        width: 40%;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    </style>