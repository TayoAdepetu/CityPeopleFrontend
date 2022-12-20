<template>
    <div>
      <div class="container">
        <form @submit.prevent="changePassword">
  
         <input type="text" v-model="code" id="slug" placeholder="Paste verification code">
  
         <input type="email" v-model="email" class="form-control" id="slug" placeholder="Enter your email" >
  
         <input type="text" v-model="newpassword" id="slug" placeholder="Enter new password">

         <input type="text" v-model="newpassword_confirmation" id="slug" placeholder="Confirm new password">

          <button type="submit" class="btn btn-primary block">
            Publish
          </button>
        </form>
      </div>
    </div>
    </template>
  
  <script scoped>
  
  export default {
    auth: false,
    data() {
      return {
        email: '',
        newpassword:"",
        newpassword_confirmation:"",
        code:null,
        error: null
      }
    },
  
    methods: {
      async changePassword() {
        try {
          await this.$axios.post(`/api/auth/create-new-password`, {
            email: this.email,
            code: this.code,
            newpassword: this.newpassword,
            newpassword_confirmation: this.newpassword_confirmation,

          })
  
          //this.$router.push('/admin/articles')
        } catch (e) {
          this.error = e.response
        }
      },
  
   
    },
  
  
  }
  </script>
  
  <style scoped>
  form {
    border: 2px;
    border-style: solid;
    border-radius: 2px;
    width: 99%;
  }
  
  #title {
    border: 2px;
    border-style: solid;
    border-radius: 2px;
    max-height: 60px;
    width: 99%;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  
  
  #slug {
    padding: 2px;
  }
  
  .btn {
  background-color: red;
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