<template>
  <div>
    <div class="container">
      <div>
        <form @submit.prevent="addCategory()">
          <input type="text" v-model="category_name" />
          <button class="btn" type="submit">Add Category</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isadmin",
  layout: "admin",
  data() {
    return {
      category_name: "",
      error: "",
    };
  },

  methods: {
    async addCategory() {
      try {
        await this.$axios.post(`/api/auth/create-category`, {
          name: this.category_name,
        });

        //this.$router.push('/admin/published-articles/categories')
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 200px;
  width: 60vw;
  margin-right: auto;
  margin-left: auto;
  display: block;
}

input {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  max-height: 60px;
  width: 90%;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
}
</style>
