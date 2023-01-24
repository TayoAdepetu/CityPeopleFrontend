<template>
  <div>
    <!--Showing individual images in frontend-->
    <div>
      <img :src="baseURL + 'productimage/' + image.image_path" />
      <div>{{ image.image_name }}</div>
      <div>{{ image.image_description }}</div>
    </div>
    <div><button @click="downloadImage">Download Image</button></div>
  </div>
</template>

<script>
export default {
  middleware: "isadmin",
  data() {
    return {
      image: null,
      error: null,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    };
  },

  methods: {
    async getAllImages(context) {
      try {
        const { data } = await this.$axios.get(
          `/api/auth/retrieve-image/${context.params.slug}`
        );
        if (data) {
          this.image = data;
          // console.log(data.data)
          return true;
        }
      } catch (error) {
        this.loading = false;
        // console.log(error.response)
        this.$toast.error(error.response.data.error);
      }
      },

      downloadImage() {
        
      },

    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },
};
</script>
