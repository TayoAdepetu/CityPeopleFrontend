<template>
  <div>
    <div class="container">
      <div class="secret-container">
        <h3>{{ secret.title }}</h3>
        <p class="full-secret-description">{{ secret.description }}</p>
        <div>
          <div class="real-secret-author-date">
            <span> Posted: {{ getDate(secret.created_at) }} </span>
          </div>
        </div>
      </div>

      <div>
        <secret-comments />
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,

  async asyncData(context) {
    let data = await context.$axios.get(
      `/api/auth/secret/${context.params.slug}`
    );
    let secret = data.data[0];
    return {
      secret,
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
.secret-container {
  margin: 10vw;
  word-wrap: break-word;
}
.full-secret-description {
  text-align: left;
  text-align: justify;
}

.real-secret-author-date {
  font-weight: bold;
}
</style>
