<template>
    <div>
        <div>
      <form @submit.prevent="addCategory()">
        <input type="text" v-model="category_name">
        <button type="submit">Add Category</button>
      </form>
    </div>
    </div>
    </template>

<script>

export default {
    middleware:'isadmin',
    data() {
        return{
            category_name:'',
            error:'',
        }
        
    },

    methods:{
    async addCategory() {
      try {
        await this.$axios.post(`/api/auth/create-category`, {
          name: this.category_name,
        })

        //this.$router.push('/admin/published-articles/categories')
      } catch (e) {
        this.error = e.response
      }
    },

}

    }
</script>