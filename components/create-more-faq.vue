<template>
  <div class="container">
    <h3>Add A Frequestly Asked Question About Your Business</h3>
    <form @submit.prevent="createFaq">
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

      <button type="submit" class="btn btn-primary block">Publish</button>
      <h3>No More Questions? Go To The Next Step To <span><nuxt-link to="/business-directory/create-directory-product">Upload Your Products or Services</nuxt-link></span> </h3>
    </form>
  </div>
</template>

<script scoped>
//import Notification from '~/components/Notification'

export default {
  layout: "admin",
  data() {
    return {
      user_id: "",
      question: "",
      answer: "",
      error: null,
    };
  },

  methods: {
    async createFaq() {
      try {
        await this.$axios.post(`/api/auth/create-new-faq`, {
          question: this.question,
          answer: this.answer,
          user_id: this.$auth.user.user.id,
        });

        this.$router.push("/business-directory/create-faq");
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
.container{
  margin-top:50px;
  width:80vw;
  margin-bottom:20px;
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
.btn {
  background-color: var(--red);
  padding: 16px;
  color: #036;
  border: none;
  width: 100%;
  margin: auto;
  font-weight: bolder;
  font-size: 20px;
}

.btn:hover {
  opacity: 0.9;
}

@media screen and (max-width: 700px) {
}
</style>
