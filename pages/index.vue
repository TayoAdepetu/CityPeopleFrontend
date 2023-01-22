<template>
  <div>
    <hr/>
    <div><h2 class="index-h2">Get Fact-based News On Most Popular Nigerians and Institutions</h2>
    <div class="grid-container">
      
      <div v-for="post in posts" :key="post.id" id="before-headlines">
        <NuxtLink :to="`/Nigerian-Wiki/${post.slug}`">
          <img id="short-image" :src="baseURL + 'postimage/' + post.image" />
          <div id="before-title">
            <h3 id="title">{{ post.title }}</h3>
          </div>
          <div id="short-body">
            <p id="short-paragraph">{{ post.description }}</p>
          </div>
<!--
          <div id="author-date">
            <div id="author">
              <span>By</span>
              <span> {{ post.user.name }} In {{ post.category.name }}</span>
            </div>
          </div>
          -->
        </NuxtLink>
      </div>
    </div>
    </div>
    <hr/>
    <div><h2 class="index-h2">Explore A Large Nigerian Busineses Directory</h2>
    <div class="directory-container">
    
      <div v-for="directory in directories" :key="directory.id" class="before-directory-headlines">
              <NuxtLink :to="`/business-directory/${directory.user.business_name_slug}`">
                <div class="list-description">
                  <h2 class="biz-header">
                  {{directory.user.business_name}}
                  </h2>
                <div class="list-detail">
                  <p><span class="list-contact">Location:</span> {{directory.location}}</p>
                  <p><span class="list-contact">Phone:</span> {{directory.user.phone_number}}</p>
                  <p><span class="list-contact">Email:</span> {{directory.user.email}}</p>
                      <p><span class="list-contact">Website:</span> {{directory.website}}</p>
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
  auth: false,
  data() {
    return {
      posts: [],
      next_page: null,
      last_page: null,
      first_page: null,
      count:null,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
      directories: [],
      firms:null,
    };
  },

  
    mounted() {
      this.getPosts();
      this.getDirectories();
    },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getPosts() {
      try {
        const { data } = await this.$axios.get(`/api/auth/posts`);
        this.posts = data.data;
        this.next_page = data.next_page_url;  
        this.last_page = data.last_page_url;  
        this.first_page = data.first_page_url;
        this.count = this.first_page[5];
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getDirectories(){
          this.loading = true;
          try {
            const { data } = await this.$axios.get(`/api/auth/all-biz`);
            this.directories = data.data
            return true; 
          } catch (error) {
            this.loading = false;
            this.$toast.error(error.response.data.error);
          }
        },

  },
};
</script>

<style scoped>
.index-h2{
  text-align:left;
  margin-top:20px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 2.5%;
  max-width: 100%;
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
  .grid-container {
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 700px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 60%;
  }
}

@media screen and (max-width: 500px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 80%;
  }
}

@media screen and (max-width: 360px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 90%;
  }
}
</style>
