<template>
    <div class="container">
      <form @submit.prevent="createPost">

       <input hidden type="" :value="user_id">
        <div class="form-group">
          <textarea v-model="title" class="form-control" id="title" placeholder="Enter title" required></textarea>
        </div>

        <div class="form-group">
          <input type="text" v-model="slug" class="form-control" id="slug" placeholder="Enter title" required>
        </div>

        <div class="form-group">
          <textarea type="text" v-model="description" class="form-control" id="description" placeholder="Enter title" required></textarea>
        </div>
        
        <div class="form-group">
          <textarea class="form-control" v-model="body" id="body" placeholder="Enter a body" rows="8" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary block">
          Publish
        </button>
      </form>
    </div>
  </template>

<script scoped>

export default {
  middleware: 'ispublisher',
  layout: "admin",
  data() {
    return {
      user_id: this.$auth.user.id,
      title: '',
      slug: '',
      description: '',
      //image: null,
      body: '',
      error: null
    }
  },

  methods: {
  async createPost() {
      try {
        await this.$axios.post(`/api/auth/create-new-post`, {
          title: this.title,
          slug: this.title.replace(/ +/g, '-'),
          description: this.description,
          body: this.body,
          user_id: this.user_id
          //image: this.onFileChange()
        })

        this.$router.push('/admin/articles')
      } catch (e) {
        this.error = e.response
      }
    },

  onFileChange(e) {
  var image = e.target.files || e.dataTransfer.files;
  return this.image;
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