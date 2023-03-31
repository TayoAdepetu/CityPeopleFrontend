<template>
  <div>
    <div class="container">
      <!--Showing individual images in frontend-->
      <div>
        <!--<img :src="baseURL + 'postimage/' + image.image_path" />-->
        <img :src="image.data.image_path" :alt="image.data.image_name" />
        <div>{{ image.data.image_name }}</div>
        <div>{{ image.data.image_description }}</div>
      </div>
      <div>
        <!--<button @click="downloadImage(image.data.id)" class="btn">      </button>
-->
        <a download="file" :href="image.data.image_path" class="btn"></a>
        Download Image
      </div>
    </div>
  </div>
</template>

<script>
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
      const image = await context.$axios.get(
        `/api/auth/retrieve-image/${context.params.slug}`
      );

      // console.log(data.data)
      return { image };
    } catch (error) {
      console.log(error);
      //this.$toast.error(error.response.data.error);
    }
  },

  methods: {
    downloadImage(image_path) {
      return this.$axios.get(`/api/auth/download-image/${image_path}`);
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
