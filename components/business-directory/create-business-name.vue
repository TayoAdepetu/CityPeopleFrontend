<template>
  <div class="container">
    <h2>Add Your Business Name (This step is compulsory)</h2>
    <p>Step 1 of 5</p>
    <form @submit.prevent="createBiz">
      <div class="form-group">
        <textarea
          type="text"
          v-model="business_name"
          class="form-control"
          id="title"
          placeholder="Enter business_name"
        ></textarea>
      </div>

      <div class="form-group">
        <input
          type="text"
          hidden
          v-model="slug"
          class="form-control"
          id="slug"
        />
      </div>

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

      <button type="submit" class="btn">Publish</button>
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
      business_name: "",
      slug: "",
      imagepiece: null,
      error: null,
    };
  },

  methods: {
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

    async createBiz() {
      try {
        await this.$axios.post(
          `/api/auth/update-business-name/${this.$auth.user.email}`,
          {
            business_name: this.business_name,
            business_name_slug: this.business_name.replace(/ +/g, "-"),
            biz_logo: this.imagepiece,
          }
        );

        this.$router.push("/business-directory/create-directory");
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
form,
textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}

#title,
#slug {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  max-height: 60px;
  width: 99%;
  margin-bottom: 5px;
  margin-top: 5px;
}

#description {
  max-height: 300px;
}

#body {
  min-height: 700px;
}

#title,
#slug,
#description,
#body {
  padding: 2px;
}

@media screen and (max-width: 700px) {
}
</style>
