<template>
  <div class="first-container">
    <div class="container">
      <h3>Add A Frequestly Asked Question About Your Business</h3>
      <p>Step 4 of 5</p>
      <h3>
        No More Questions? Go To The Next Step To
        <span
          ><nuxt-link to="/business-directory/create-directory-products"
            >Upload Your Products or Services</nuxt-link
          ></span
        >
      </h3>
      <form @submit.prevent="createFaqQuestions()">
        <input hidden type="" :value="user_id" />

        <div class="form-group">
          <textarea
            v-model="question"
            class="form-control"
            id="title"
            placeholder="Enter a question"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <textarea
            v-model="answer"
            class="form-control"
            id="title"
            placeholder="Enter answer to the question"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn">Publish</button>
      </form>
    </div>
  </div>
</template>

<script>
//import Notification from '~/components/Notification'

export default {
  middleware: "iscommenter",
  layout: "admin",
  data() {
    return {
      user_id: null,
      question: "",
      answer: "",
      error: null,
    };
  },

  methods: {
    async createFaqQuestions() {
      try {
        await this.$axios.post(`/api/auth/create-new-faq`, {
          question: this.question,
          answer: this.answer,
          user_id: this.$auth.user.id,
        });

        this.$router.push("/business-directory/create-faq");
      } catch (e) {
        this.error = e.response;
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.first-container {
  margin-top: 100px;
  width: 80vw;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
}

.container {
  margin-top: 50px;
  width: 80vw;
  margin-bottom: 20px;
}
form,
textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
  min-height: 60px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 5px;
}

@media screen and (max-width: 700px) {
}
</style>
