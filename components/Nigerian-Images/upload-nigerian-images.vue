<template>
  <div>
    <div class="container">
      <form @submit.prevent="imageUpload()">
        <div>
          <textarea
            v-model="image_name"
            placeholder="Enter image name"
            type="text"
          ></textarea>
          <textarea
            v-model="image_description"
            placeholder="Enter image description"
            type="text"
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

          <div class="image-section">
            <input
              placeholder="select an image"
              type="file"
              @change="onFileChange"
            />
          </div>

          <div class="image-section" v-if="imagepiece">
            <img :src="imagepiece" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary block">
          Publish Image
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      categories: [],
      category_id: undefined,
      imagepiece: null,
      user_id: null,
      image_name: "",
      image_description: "",
      error: null,
    };
  },

  methods: {
    async getAllCategories() {
      const { data } = await this.$axios.get("/api/auth/fetch-categories");
      this.categories = data;
      return { categories };
    },

    async imageUpload() {
      try {
        await this.$axios.post(`/api/auth/create-images`, {
          image_name: this.image_name,
          image_name_slug: this.image_name.replace(/ +/g, "-"),
          image_description: this.image_description,
          user_id: this.$auth.user.id,
          image: this.imagepiece,
          category_id: this.category_id,
        });
        this.$toast.success("Image uploaded successfully.");
      } catch (e) {
        console.log(e.response);
        this.$toast.info("Image not uploaded.");
      }
    },

    onFileChange(e) {
      let image = e.target.files[0];

      let reader = new FileReader();

      if (image && image.type.match("image.*")) {
        reader.readAsDataURL(image);

        reader.onloadend = (e) => {
          this.imagepiece = reader.result;
        };
      }
    },

    removeImage: function (e) {
      this.image = null;
    },

    /*

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

    */
  },

  mounted() {
    this.getAllCategories();
  },
};
</script>
<style scoped>
select,
textarea,
input {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
  min-height: 60px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
}
</style>
