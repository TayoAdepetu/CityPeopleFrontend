<template>
  <div>
    <div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
    },

    methods: {
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
      const { data } = await this.$axios.get("/api/auth/category-admin");
      this.categories = data;
      return { categories };
    },
  

  mounted() {
    this.getAllCategories();
  },
};
</script>
