<template>
    <div class="container">
      <form @submit.prevent="createDirectoryProduct">

       <input hidden type="" :value="user_id">
        <div class="form-group">
          <textarea hidden v-model="business_name" class="form-control" id="title" placeholder="Enter business_name" required></textarea>
        </div>

        <div class="form-group">
          <input type="text" hidden v-model="slug" class="form-control" id="slug" required>
        </div>

        <div class="form-group">
          <textarea hidden v-model="product_name" class="form-control" id="title" placeholder="Enter the name of the product" required></textarea>
        </div>
        
        <div class="form-group">
            <input type="text" v-model="website" placeholder="Enter price of the product">
        </div>
        <div class="form-group">
            <input type="tel" v-model="phone" placeholder="Add your WhatsApp number">
        </div>

        <div class="form-group">
            <input hidden type="text" v-model="biz_location" placeholder="Add your business location">
        </div>

        <div class="form-group">
          <textarea type="text" v-model="description" class="form-control" id="description" placeholder="Describe the product" required></textarea>
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
      product_name: '',
      business_name: '',
      slug: '',
      description: '',
      //image: null,
      phone: '',
      biz_location: '',
      error: null
    }
  },

  methods: {
  async createDirectoryProduct() {
      try {
        await this.$axios.post(`/api/auth/create-directory-product`, {
          business_name: this.$auth.user.business_name,
          product_name: this.product_name,
          slug: this.$auth.user.business_name,
          description: this.description,
          phone: this.phone,
          location: this.$auth.user.biz_location,
          user_id: this.$auth.user.user_id,
          //image: this.onFileChange()
        })

        this.$router.push('/business-directory')
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