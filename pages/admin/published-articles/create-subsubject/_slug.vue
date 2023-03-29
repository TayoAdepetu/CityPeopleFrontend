<template>
  <div>
    <div class="container">
      <form @submit.prevent="createPost" enctype="multipart/form-data">
        <nuxt-link to="/htmlcodes" target="_blank"
          ><div class="btn">Check Component HTML Codes</div></nuxt-link
        >

        <input hidden type="number" v-model="user_id" />
        <input hidden type="text" v-model="subject_name" />

        <textarea
          v-model="subsubject_name"
          id="title"
          placeholder="Enter title"
          required
          type="text"
        ></textarea>

        <textarea
          type="text"
          v-model="description"
          id="description"
          placeholder="Enter catchy description"
          required
        ></textarea>

        <hr />
        <textarea v-model="body" id="body-text"></textarea>
        <hr />
        <input type="text" v-model="status" />

        <button type="submit" class="btn btn-primary block">Publish</button>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  middleware: "ispublisher",
  layout: "admin",
  data() {
    return {
      user_id: null,
      subject_name: "",
      slug: "",
      description: "",
      subsubject_name: "",
      body: "",
      status: "",
      error: null,
    };
  },

  methods: {
    async createSubsubject(context) {
      try {
        await this.$axios.post(`/api/auth/create-new-subsubject`, {
          subject_name: context.params.slug,
          slug: this.subsubject_name.replace(/ +/g, "-"),
          description: this.description,
          body: this.body,
          subsubject_name: this.subsubject_name,
          user_id: this.$auth.user.id,
          status: this.status,
        });

        this.$router.push(
          `/nigerian-wiki/nigerian-knowledgebase${context.params.slug}`
        );
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
.image-section {
  margin-bottom: 6px;
  margin-top: 6px;
}
.picking {
  text-align: left;
}
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

.body {
  min-height: 700px;
}

#title,
#slug,
#description,
.body {
  padding: 2px;
}

@media screen and (max-width: 700px) {
}
</style>
