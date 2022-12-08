<template>
    <div>
        <div class="container">

        <form @submit.prevent="loginUser">
      
            <div v-if="errors">
                <span>{{ errors }}</span>
            </div>
                
        <input v-model="form.email" type="text" id="text" placeholder="Enter email..." name="email" required>
       

        <input v-model="form.password" type="password" placeholder="Enter password" name="password" required>
       

        <button class='registerbtn' type="submit">Login</button>
       

        </form>
        <p>If you're not yet a member, <NuxtLink to="/auth/register">Register</NuxtLink></p>

        </div>

    </div>
</template>

<script>
export default {
    //auth: 'guest',
    data () {        
        return{
        form: {
            email: '',
            password: ''
        },
        loading:false,
       errors: '',
    }

},

    methods: {
        async loginUser(){
            try {
                this.loading = true;
                this.$toast.show("Logging in...");
                await this.$auth.loginWith('laravelJWT', {data:this.form})

                this.$router.push('/')
                this.$toast.success("You are logged in");
                this.loading = false;

            } catch (error){
                console.log(error)
                
                /*if (err.response.status = 422) {
                    this.errors = 'Could not sign you in with those credentials.'
                }
*/
            }
        }
    }
}
</script>

<style scoped>
body {
   box-sizing: border-box;
   color: #036;
  }


     .container {
         padding: 15px;
         background-color: white;    
         border: 2px solid #036;     
     }

     .form-field {
        width: 50%;
        margin-right: auto;
        margin-left: auto;        

     }
 
     input {
        width: 100%;
        padding: 15px 5px;
        margin: 5px;       
        border: none;
        background: whitesmoke;
        font-size:small;
        color: #036;
        display: block;

     }

     #id_username {
      margin-bottom: 1px;
     }

     #div_id_email {
      margin-top: 20px;
     }

     #div_id_password1 {
      margin-top: 20px;
     }

     #div_id_password2 {
      margin-top: 20px;
     }


     .registerbtn {
        background-color: #c20017;
        padding: 16px;
        color: #036;
        border: none;
        width: 100%;
        margin: auto;
        font-weight: bolder;
        font-size: 20px;
             }

     .registerbtn:hover{

        opacity: 0.9;
     }

    h1, p {
        text-align: center;
    }

    h1 {
        color: #c20017;
    }

</style>