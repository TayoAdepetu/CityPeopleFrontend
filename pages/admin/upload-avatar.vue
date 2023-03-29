<template>
  <div class="container">
    <h2>Add Your User Avatar</h2>
    <form @submit.prevent="createBiz">
      <div class="form-group">
        <input type="file" accept="image/*" @change="onChange" />
      </div>

      <div class="image-section" v-if="imagepiece != null">
        <img :src="imagepiece" />
        <!--<button @click="removeImage">Remove image</button>-->
      </div>

      <button type="submit" class="btn btn-primary block">Publish</button>
    </form>
  </div>
</template>

<script scoped>
//import Notification from '~/components/Notification'

export default {
  middleware: "iscommenter",
  layout: "admin",
  data() {
    return {
      imagepiece: null,
      error: null,
    };
  },

  methods: {
    onChange(e) {
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
      this.imagepiece = null;
    },

    async createBiz() {
      try {
        await this.$axios.post(
          `/api/auth/update-user-image/${this.$auth.user.email}`,
          {
            user_image: this.imagepiece,
          }
        );

        //this.$router.push("/admin/dashboard");
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 60vw;
  margin-left: auto;
  margin-right: auto;
}
form {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}

.form-group {
  margin-bottom: 5px;
  margin-top: 5px;
}

@media screen and (max-width: 700px) {
}
</style>
