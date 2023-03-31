<template>
  <div>
    <div class="container">
      <form @submit.prevent="addCategory()">
        <input type="text" v-model="name" />
        <button type="submit" class="btn btn-primary block">
          Add Category
        </button>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  middleware: "iscommenter",
  layout: "admin",
  data() {
    return {
      name: "",
      error: "",
    };
  },

  methods: {
    async addCategory() {
      try {
        await this.$axios.post(`/api/auth/create-categories`, {
          name: this.name,
        });

        this.$toast.success("Image category created.");

        //this.$router.push('/admin/published-articles/categories')
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
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
