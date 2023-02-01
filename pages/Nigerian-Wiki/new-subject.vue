<template>
  <div>
    <div class="container">
      <form @submit.prevent="createPost" enctype="multipart/form-data">
        <nuxt-link to="/htmlcodes" target="_blank"
          ><div class="btn">Check Component HTML Codes</div></nuxt-link
        >

        <input hidden type="" v-model="user_id" />

        <textarea
          v-model="title"
          id="title"
          placeholder="Enter title"
          required
        ></textarea>

        <input
          type="text"
          hidden
          v-model="slug"
          id="slug"
          placeholder="Enter title slug"
        />

        <textarea
          type="text"
          v-model="description"
          id="description"
          placeholder="Enter catchy description"
          required
        ></textarea>

        <div>
        <select v-model="category_id" class="picking">
          <option :value="undefined">Pick a Category 👇</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        </div>

        <textarea v-model="body" id="body-text"></textarea>
        <hr />

        <button type="submit" class="btn btn-primary block">Publish</button>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  //middleware: "ispublisher",
 // layout: "admin",
  data() {
    return {
      user_id: null,
      title: "",
      slug: "",
      description: "",
      category_id: undefined,
      body: "",
      categories: null,
      error: null,
    };
  },

  methods: {
    async createPost() {
      try {
        await this.$axios.post(`/api/auth/create-new-post`, {
          title: this.title,
          slug: this.title.replace(/ +/g, "-"),
          description: this.description,
          body: this.body,
          category_id: this.category_id,
          user_id: this.$auth.user.id,
        });

        this.$router.push(`/nigerian-wiki/${this.title.length()}`)
      } catch (e) {
        this.error = e.response;
      }
    },

    async getAllCategories() {
      const { data } = await this.$axios.get("/api/auth/category-admin");
      this.categories = data;
      return { categories };
    },
  },

  mounted() {
    this.getAllCategories();
  },
};
</script>

<style scoped>
.container{
  margin: 10vw;
  width: 80vw;
}
.image-section {
  margin-bottom: 6px;
  margin-top: 6px;
}
.picking {
  text-align: left;
}

#title, .picking,
#slug, textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  max-height: 60px;
  width: 99%;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
}

#description {
  max-height: 300px;
}

#body-text {
  min-height: 700px;
}

.btn {
  background-color: cornflowerblue;
  padding: 16px;
  color: #036;
  border: none;
  width: 100%;
  margin: auto;
  font-weight: bolder;
  font-size: 20px;
}

.btn:hover {
  opacity: 0.9;
}

@media screen and (max-width: 700px) {
}
</style>
