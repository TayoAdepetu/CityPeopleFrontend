<template>
    <div class="container">
        <h2>Add Your User Avatar</h2>
      <form @submit.prevent="createBiz">
        <div v-if="!user_image" class="form-group">
            <input type="file" @change="onFileChange">
        </div>

    <div class="image-section" v-else>
    <img :src="user_image" />
    <button @click="removeImage">Remove image</button>
  </div>
        
        <button type="submit" class="btn btn-primary block">
          Publish
        </button>
      </form>
    </div>
  </template>

<script scoped>
//import Notification from '~/components/Notification'

export default {
  middleware:'iscommenter',
  layout: "admin",
  data() {
    return {
      user_image: null,
      error: null
    }
  },

  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
     
    },

    
    createImage(file) {
      let user_image = new Image();
      let reader = new FileReader();
      
      reader.onload = (e) => {
        this.user_image = e.target.result;
      };

      reader.readAsDataURL(file);
    },   

    removeImage: function (e) {
      this.user_image = '';
    },

  async createBiz() {
      try {
        await this.$axios.post(`/api/auth/update-user-image/${this.$auth.user.email}`, {
          user_image: this.user_image,
        })

        this.$router.push('/admin/dashboard')
      } catch (e) {
        this.error = e.response
      }
    },
  }
}
</script>

<style scoped>
form {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}


.btn {
background-color: cornflowerblue;
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