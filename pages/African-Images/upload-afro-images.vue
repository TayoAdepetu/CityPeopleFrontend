<template>
  <div>
    <div>
      <form>
        <div>
          <input v-model="user_id" />
          <textarea
            v-model="image_name"
            placeholder="Enter image name"
          ></textarea>
          <textarea
            v-model="image_description"
            placeholder="Enter image description"
          ></textarea>
        </div>

        <div class="picking">
          <select v-model="category_id" id="slug">
            <option :value="undefined">Pick a Category 👇</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>

          <div class="image-section" v-if="!image">
            Select an Image
            <input type="file" @change="onFileChange" />
          </div>

          <div class="image-section" v-else>
            <img :src="image" />
            <button @click="removeImage">Remove image</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      category_id: null,
      image: null,
      user_id: this.$auth.user.id,
      image_name: "",
      image_description: "",
      error: null,
    };
  },

  methods: {
    async imageUpload() {
      try {
        await this.axios.post(`create-images`, {
          image_name: this.image_name,
          image_description: this.image_description,
          user_id: this.user_id,
          image: this.image,
          category_id: this.category_id,
        });
      } catch (e) {
        this.error = e.response;
      }
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let image = new Image();
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },

    removeImage: function (e) {
      this.image = "";
    },
  },

  async getAllCategories() {
    const { data } = await this.$axios.get("/api/auth/fetch-categories");
    this.categories = data;
    return { categories };
  },

  mounted() {
    this.getAllCategories();
  },
};
</script>
