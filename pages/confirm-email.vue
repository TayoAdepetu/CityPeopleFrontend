<template>
    <div>
        <form @submit.prevent="verifyUserEmail">
        <input v-model="code" type="number" placeholder="paste verification code here"/>
        <button>Verify Email</button>
        </form>
    </div>
</template>
<script>

export default {
    data() {
        return{
            code:null,
            //baseURL: process.env.BASE_URL || 'http://localhost:8000/',
        }    
    },

    methods:{
        async verifyUserEmail(){
            const code = this.code;
            try {
        await this.$axios.post(`/api/auth/user/verify/${this.code}`, {
            code: this.code,
            email: this.$auth.user.email,
        })

        //this.$router.push('/admin/articles')
      } catch (e) {
        this.error = e.response
      }
        }

    }
}
</script>
