<template>
  <div>
    <div class="container">
      <form @submit.prevent="loginUser">
        <div v-if="errors">
          <span>{{ errors }}</span>
        </div>

        <input
          v-model="form.email"
          type="text"
          id="text"
          placeholder="Enter email..."
          name="email"
          required
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          name="password"
          required
        />

        <button class="registerbtn" type="submit">Login</button>
      </form>
      <p>
        If you're not yet a member, <NuxtLink to="/register">Register</NuxtLink>
      </p>
      <p>
        Forgot your password?
        <NuxtLink to="/passchangecode">Reset Password</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  auth: "guest",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      errors: "",
    };
  },

  methods: {
    async loginUser() {
      try {
        this.loading = true;
        this.$toast.show("Logging in...");
        const logUser = await this.$auth.loginWith("laravelJWT", {
          data: this.form,
        });

        if (logUser) {
          this.$toast.success("You are logged-in.");
          this.loading = false;
          this.$router.push("/");
        }
      } catch (error) {
        this.loading = false;
        this.$toast.info(
          "There was a problem logging in, check your credentials"
        );
        console.log(error);
        /*if (err.response.status = 422) {
                    this.errors = 'Could not sign you in with those credentials.'
                }
*/
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 15px;
  background-color: white;
  border: 2px solid #036;
  margin-top: 60px;
  margin-bottom: 20px;
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
  font-size: small;
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
  background-color: var(--red);
  padding: 16px;
  color: #036;
  border: none;
  width: 100%;
  margin: auto;
  font-weight: bolder;
  font-size: 20px;
}

.registerbtn:hover {
  opacity: 0.9;
}
</style>
