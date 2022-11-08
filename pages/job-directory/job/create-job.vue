<template>
    <div class="container">
      <form @submit.prevent="createDirectory">

       <input hidden type="" :value="user_id">
       <div class="form-group">
          <input type="text" hidden v-model="business_name" class="form-control" id="slug">
        </div>

        <div class="form-group">
          <input type="text" hidden v-model="business_name_slug" class="form-control" id="slug">
        </div>

        <div class="form-group">
            <input type="text" v-model="title" placeholder="Enter to the job title">
        </div>

        <div class="form-group">
            <input type="tel" v-model="phone" placeholder="Add the phone number for buyers to contact">
        </div>
        
        <div class="form-group">
            <input type="text" v-model="location" placeholder="Add your business location">
        </div>

        <div class="form-group">
            <input type="text" v-model="role_function" placeholder="State responsibilities of the role">
        </div>

        <div class="form-group">
            <input type="text" v-model="salary" placeholder="State potential salary">
        </div>
        
        <div class="form-group">
          <textarea type="text" v-model="description" class="form-control" id="description" placeholder="Describe your business" required></textarea>
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
      business_name_slug: '',
      description: '',
      salary: '',
      role_function: '',
      phone: '',
      location: '',
      title: '',
      error: null
    }
  },

  methods: {
  async createDirectory() {
      try {
        await this.$axios.post(`/api/auth/create-new-job`, {
          business_name: this.$auth.user.business_name,
          business_name_slug: this.$auth.user.business_name_slug,
          title: this.title,
          salary: this.salary,
          phone: this.phone,
          location: this.location,
          function: this.role_function,
          description: this.description,
          user_id: this.$auth.user.user_id,
          //image: this.onFileChange()
        })

        this.$router.push('/business-directory')
      } catch (e) {
        this.error = e.response
      }
    },
/*
  onFileChange(e) {
  var image = e.target.files || e.dataTransfer.files;
  return this.image;
},
*/
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