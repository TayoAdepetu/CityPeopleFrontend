<template>
  <div>
    <!--Display all subject articles-->
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
    <div class="pagination">
      <button class="paginate" @click.prevent="moveBack()">Previous List</button
      ><button class="paginate" @click.prevent="moveFront()">Next List</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      posts: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
      error: null,
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getPosts(page) {
      page = page || "posts?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.posts = data.data;
        this.first_page = data.first_page_url.split("/")[5];
        this.last_page = data.last_page_url.split("/")[5];

        if (data.prev_page_url != null) {
          this.previous_page = data.prev_page_url.split("/")[5];
        } else {
          this.previous_page = data.last_page_url.split("/")[5];
        }

        if (data.next_page_url != null) {
          this.next_page = data.next_page_url.split("/")[5];
        } else {
          this.next_page = data.first_page_url.split("/")[5];
        }

        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    moveFront() {
      this.page = this.next_page;
      this.getPosts(this.page);
    },

    moveBack() {
      this.page = this.previous_page;
      this.getPosts(this.page);
    },
  },
};
</script>

<style scoped>
.paginate {
  width: 20%;
  padding: 3px;
  background-color: aqua;
}
.pagination {
  
  justify-content: space-between;
  display: flex;
  gap: 2px;
  margin: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 2.5%;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin: 20px;
  margin-top: 60px;
}

#before-headlines {
  margin-bottom: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: #c20017;
  width:250px;
}

#short-body, #before-title {
  margin-top: 4px;
  margin-right:4px;
  margin-left:4px;
}

#short-paragraph{
  word-wrap: break-word;
}

#title {
  color: #c20017;
}

#short-image {
  width: 100%;
  height: 220px;
  margin-top: 0px;
}

@media screen and (max-width: 1270px) {
  .grid-container {
    grid-template-columns: auto auto auto auto;
  }
}

@media screen and (max-width: 1100px) {
  .grid-container {
    grid-template-columns: auto auto auto;
  }

  #before-headlines {
  width:300px;
}
}

@media screen and (max-width: 960px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
  width:40vw;
}
}

@media screen and (max-width: 650px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
  width:230px;
}
}

@media screen and (max-width: 515px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
  width:220px;
}
}

@media screen and (max-width: 498px) {
  .grid-container {
    grid-template-columns: auto;
  }

  #before-headlines {
  width:70vw;
  margin-right:auto;
  margin-left:auto;
}

p{
  font-size:15px;
}
}


@media screen and (max-width: 300px) {
p{
  font-size:17px;
}
}

@media screen and (max-width: 350px) {
#before-headlines{
  width:80vw;
}
}

</style>
