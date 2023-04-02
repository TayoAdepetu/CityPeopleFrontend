<template>
  <div>
    <div class="container">
      <div>
        <h2 class="index-h2">
          Get Fact-based News On Most Popular Nigerians and Institutions
        </h2>
        <div class="grid-container">
          <div v-for="post in posts" :key="post.id" id="before-headlines">
            <NuxtLink :to="`/Nigerian-Wiki/${post.slug}`">
              <img id="short-image" :src="post.image" />
              <div id="before-title">
                <h3 id="title">{{ post.title }}</h3>
              </div>
              <div id="short-body">
                <p id="short-paragraph">{{ post.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <nuxt-link to="/nigerian-wiki" class="explore-more"
          >Explore More</nuxt-link
        >
      </div>

      <hr />

      <div>
        <h2 class="index-h2">Buy Unique Products on Our E-commerce Platform</h2>
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
                :src="product.productimages[0].product_image_path"
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
        <nuxt-link to="/e-store/ecommerce" class="explore-more"
          >Explore More</nuxt-link
        >
      </div>
      <hr />
      <div>
        <h2 class="index-h2">
          View and Download Pictures From The Most Beautiful Places and Events
          in Nigeria
        </h2>
        <div class="grid-container">
          <div v-for="image in images" :key="image.id" id="before-headlines">
            <NuxtLink :to="`/nigerian-images/${image.id}`">
              <img id="short-image" :src="image.image_path" />
              <p id="short-paragraph">{{ image.image_name }}</p>
            </NuxtLink>
          </div>
        </div>
        <nuxt-link
          to="/nigerian-images/beautiful-nigerian-images"
          class="explore-more"
          >Explore More</nuxt-link
        >
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
      posts: [],
      images: [],
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    };
  },

  mounted() {
    this.getPosts();
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
  font-size: 1.5rem;
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
  border-color: var(--yellow);
  width: 250px;
}

#short-body,
#before-title {
  margin-top: 4px;
  margin-right: 4px;
  margin-left: 4px;
}

#short-paragraph {
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
    width: 300px;
  }
}

@media screen and (max-width: 960px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
    width: 40vw;
  }
}

@media screen and (max-width: 650px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
    width: 230px;
  }
}

@media screen and (max-width: 515px) {
  .grid-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
    width: 220px;
  }
}

@media screen and (max-width: 498px) {
  .grid-container {
    grid-template-columns: auto;
  }

  #before-headlines {
    width: 70vw;
    margin-right: auto;
    margin-left: auto;
  }

  p {
    font-size: 15px;
  }

  .index-h2 {
    text-align: center;
  }
}

@media screen and (max-width: 300px) {
  p {
    font-size: 17px;
  }
}

@media screen and (max-width: 350px) {
  #before-headlines {
    width: 80vw;
  }
}
</style>
