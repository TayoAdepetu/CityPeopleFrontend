<template>
  <div>
    <hr />
    <div>
      <h2 class="index-h2">
        Get Fact-based News On Most Popular Nigerians and Institutions
      </h2>
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
    <hr />
    <div>
      <h2 class="index-h2">Explore A Large Nigerian Busineses Directory</h2>
      <div class="grid-container">
        <div
          v-for="directory in directories"
          :key="directory.id"
          id="before-headlines"
        >
          <NuxtLink
            :to="`/business-directory/${directory.user.business_name_slug}`"
          >
            <img
              id="short-image"
              :src="baseURL + 'postimage/' + directory.image"
            />
            <div id="before-title">
              <h3 id="title">{{ directory.user.business_name }}</h3>
            </div>
            <div id="short-body">
              <p id="short-paragraph">Location: {{ directory.location }}</p>
              <p id="short-paragraph">
                Phone: {{ directory.user.phone_number }}
              </p>
              <p id="short-paragraph">Email: {{ directory.user.email }}</p>
              <p id="short-paragraph">Website: {{ directory.website }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h2 class="index-h2">
        Search For Available Job Vacancies In Nigerian States
      </h2>
      <div class="grid-container">
        <div v-for="job in jobs" :key="job.id" id="before-headlines">
          <NuxtLink :to="`/job-directory/job/${job.job_slug}`">
            <!--<img id="short-image" :src="baseURL + 'postimage/' + directory.image" />-->
            <div id="before-title">
              <h3 id="title">{{ job.title }}</h3>
            </div>
            <div id="short-body">
              <p id="short-paragraph">Posted By: {{ job.user.name }}</p>
              <p id="short-paragraph">Responsilities: {{ job.function }}</p>
              <p id="short-paragraph">Location: {{ job.location }}</p>
              <p id="short-paragraph">Salary: {{ job.salary }}</p>
              <p id="short-paragraph">Posted: {{ getDate(job.created_at) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h2 class="index-h2">
        Buy and Sell On A Booming Nigerian E-commerce Platform
      </h2>
      <div class="grid-container">
        <div
          v-for="product in products"
          :key="product.id"
          id="before-headlines"
        >
          <NuxtLink
            :to="`/business-directory/directory-product/${product.product_name_slug}`"
          >
            <img
              id="short-image"
              :src="baseURL + 'productimage/' + product.image"
            />
            <div id="before-title">
              <h3 id="title">{{ product.product_name }}</h3>
            </div>
            <div id="short-body">
              <p id="short-paragraph">{{ product.price }}</p>
              <p id="short-paragraph">
                {{ product.description }}
              </p>
              <p id="short-paragraph">{{ product.location }}</p>

              <p id="short-paragraph">{{ getDate(product.created_at) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h2 class="index-h2">Download The Most Beautiful, Free African Images</h2>
      <div class="grid-container">
        <div v-for="image in images" :key="image.id" id="before-headlines">
          <NuxtLink :to="`/african-images/${image.image_path}`">
            <img
              id="short-image"
              :src="baseURL + 'postimage/' + image.image_path"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      products: [],
      jobs: [],
      posts: [],
      images: [],
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
      directories: [],
    };
  },

  mounted() {
    this.getPosts();
    this.getDirectories();
    this.getJobs();
    this.getProducts();
    this.getImages();
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getProducts() {
      try {
        const { data } = await this.$axios.get(`/api/auth/all-products`);
        this.products = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getPosts() {
      try {
        const { data } = await this.$axios.get(`/api/auth/posts`);
        this.posts = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getDirectories() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get(`/api/auth/all-biz`);
        this.directories = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.error);
      }
    },

    async getJobs() {
      try {
        const { data } = await this.$axios.get(`/api/auth/jobs`);
        this.jobs = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getImages() {
      try {
        const { data } = await this.$axios.get(`/api/auth/fetch-images`);
        this.images = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
.index-h2 {
  text-align: left;
  margin-top: 20px;
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
