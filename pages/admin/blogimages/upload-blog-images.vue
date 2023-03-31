<template>
  <div>
    <div class="container">
      <form>
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
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagepiece: null,
      user_id: null,
      image_name: "",
      image_description: "",
      error: null,
    };
  },

  methods: {
    async imageUpload() {
      try {
        await this.axios.post(`/api/admin/auth/create-blog-images`, {
          image_name: this.image_name,
          image_description: this.image_description,
          user_id: this.$auth.user.id,
          image: this.imagepiece,
        });
      } catch (e) {
        this.error = e.response;
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
