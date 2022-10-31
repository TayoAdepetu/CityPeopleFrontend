<template>
    <div class="container">
        <h2>Add A Frequestly Asked Question About Your Business</h2>
      <form @submit.prevent="createDirectory">

       <input hidden type="" :value="user_id">
        <div class="form-group">
          <textarea hidden v-model="business_name" class="form-control" id="title" placeholder="Enter business_name" required></textarea>
        </div>

        <div class="form-group">
          <input type="text" hidden v-model="slug" class="form-control" id="slug" required>
        </div>

        <div class="form-group">
          <textarea v-model="question" class="form-control" id="title" placeholder="Enter a question" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="answer" class="form-control" id="title" placeholder="Enter answer to the question" required></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary block">
          Publish
        </button>
      </form>
    </div>
  </template>

<script>
//import Notification from '~/components/Notification'

export default {
  layout: "admin",
  data() {
    return {
      user_id: '',
      business_name: '',
      slug: '',
      question: '',
      answer: '',
      error: null
    }
  },

  methods: {
  async createFaq() {
      try {
        await this.$axios.post(`/api/auth/create-directory`, {
          business_name: this.business_name,
          slug: this.slug,
          question: this.question,
          answer: this.answer,
          user_id: this.$auth.user.id,
        })

        this.$router.push('/business-directory/create-faq')
      } catch (e) {
        this.error = e.response
      }
    },
  }
}
</script>

<style scoped>
form, textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}

#title, #slug {
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

#title, #slug, #description, #body {
  padding: 2px;
}

.btn {
background-color: #c20017;
padding: 16px;
color: #036;
border: none;
        width: 100%;
        margin: auto;
        font-weight: bolder;
        font-size: 20px;
             }

     .btn:hover{

        opacity: 0.9;
     }


@media screen and (max-width: 700px) {
 
}

</style>