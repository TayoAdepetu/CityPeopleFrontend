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

        <button class="btn" type="submit">Login</button>
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

        console.log(logUser);

        this.$toast.success("You are logged-in.");
        this.loading = false;

        /*
          await this.$auth.setUser({
            email: this.email,
            password: this.password,
          });
          */
        //this.$router.push("/");
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
  margin-top: 100px;
  width: 60vw;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
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
</style>
