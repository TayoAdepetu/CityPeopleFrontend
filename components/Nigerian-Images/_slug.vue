<template>
  <div>
    <div class="container">
      <!--Showing individual images in frontend-->
      <div v-for="{ image, index } in images" :key="index">
        <div>
          <!--<img :src="baseURL + 'postimage/' + image.image_path" />-->
          <img :src="image.data.image_path" :alt="image.data.image_name" />
          <div>{{ image.data.image_name }}</div>
          <div>{{ image.data.image_description }}</div>
        </div>
        <div>
          <!--<button @click="downloadImage(image.data.id)" class="btn"></button>-->

          <a
            :href="image.data.image_path"
            @click.prevent="downloadImage(image.data.image_path)"
            class="btn href"
            >Download Image</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
export default {
  auth: false,
  data() {
    return {
      error: null,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    };
  },

  async asyncData(context) {
    try {
      const images = await context.$axios.get(
        `/api/auth/retrieve-image/${context.params.slug}`
      );

      // console.log(data.data)
      return { images };
    } catch (error) {
      console.log(error);
      //this.$toast.error(error.response.data.error);
    }
  },

  methods: {
    downloadImage(image_path) {
      //https://eligrey.com/demos/FileSaver.js/
      saveAs(image_path, "image.jpg");
    },

    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.png"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },

    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },

  mounted() {
    //this.getImage();
  },
};
</script>
<style scoped>
.href {
  display: block;
}
</style>
