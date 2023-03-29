<template>
  <div>
    <div class="container">
      <form class="form-field" @submit.prevent="verifyUserEmail">
        <input
          v-model="code"
          type="text"
          placeholder="paste verification code here"
        />
        <button class="btn">Verify Email</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  //auth: false,
  data() {
    return {
      code: null,
      //baseURL: process.env.BASE_URL || 'http://localhost:8000/',
    };
  },

  methods: {
    async verifyUserEmail() {
      const code = this.code;
      try {
        await this.$axios.post(`/api/auth/user/verify/${this.code}`, {
          code: this.code,
          email: this.$auth.user.email,
        });
        this.$toast.success("Email verified successfully.");

        this.$router.push("/");
      } catch (e) {
        console.log(e.response);
        this.$toast.info(
          "There was a problem verifying email address. Please, check the verification code again."
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 60px;
  display: block;
}
.form-field {
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  display: block;
}

input {
  width: 100%;
  padding: 15px 5px;
  margin: 5px;
  border: none;
  background: whitesmoke;
  font-size: small;
  color: #036;
  display: block;
}
</style>
