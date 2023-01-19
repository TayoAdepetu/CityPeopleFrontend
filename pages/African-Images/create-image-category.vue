<template>
    <div>
        <div>
      <form @submit.prevent="addCategory()">
        <input type="text" v-model="name">
        <button type="submit">Add Category</button>
      </form>
    </div>
    </div>
    </template>

<script scoped>

export default {
    middleware:'isadmin',
    data() {
        return{
            name:'',
            error:'',
        }
        
    },

    methods:{
    async addCategory() {
      try {
        await this.$axios.post(`/api/auth/create-category`, {
          name: this.name,
        })

        //this.$router.push('/admin/published-articles/categories')
      } catch (e) {
        this.error = e.response
      }
    },

}

    }
</script>