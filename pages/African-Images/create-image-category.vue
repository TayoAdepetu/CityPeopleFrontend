<template>
    <div>
        <div class="container">
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

<style scoped>
.container {
  margin-top: 100px;
  width: 80vw;
  margin-bottom: 20px;
  word-wrap: break-word;
}

input {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
  min-height: 60px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
}

</style>
