<template>
  <div>
    <div class="container">
      <!--
<h1>{{ post[0].title }}</h1>
<img id="short-image" :src="baseURL + 'postimage/' + post[0].image">
<p>By <span>{{ post[0].user.name }}</span> in <span>{{ post[0].category.name }}</span></p>
<p>Last Updated: <span>{{ getDate(post[0].updated_at) }}</span></p>
<div class="body" v-html="`${ post[0].body }`"></div>
-->
      <div>
        <comments />
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {};
  },

  async asyncData(context) {
    let response = await context.$axios.get(
      `/api/auth/blog/${context.params.slug}`
    );
    let post = response.data;
    return {
      post,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },
};
</script>
<style scoped>
#short-image {
  width: 70%;
  height: 500px;
}
.body {
  text-align: left !important;
}

/*css for the description classes*/
.bold-span {
  font-weight: bold;
}

.italic-span {
  font-style: italic;
}

.image-dressing {
  width: 100vh;
  height: 400px;
}
</style>
