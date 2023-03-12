<template>
  <div>
    <div class="container">
      <form @submit.prevent="registerUser" v-if="!savingSuccessful">
        <h2>CityPeople Nigerian Forum Registration</h2>
        <p>Please Fill This Form To Enjoy The Full Features Of This Forum</p>
        <hr />

        <input
          type="text"
          v-model="name"
          placeholder="Enter username"
          name="name"
        />
        <!--- <span v-if="errors.name">{{ errors.name[0] }}</span>  -->

        <!----<input type="text" v-model="form.username" placeholder="Enter username" name="username"/>
          <span v-if="errors.username">{{ errors.username[0] }}</span>

          -->

        <input
          type="email"
          v-model="email"
          placeholder="Enter email"
          name="email"
        />
        <!--- <span v-if="errors.email">{{ errors.email[0] }}</span> -->

        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
          name="password"
        />
        <!--- <span v-if="errors.password">{{ errors.password[0] }}</span> -->

        <input
          type="password"
          v-model="password_confirmation"
          placeholder="Confirm your password"
          name="password_confirmation"
        />
        <!---<span v-if="errors.confirmpassword">{{ errors.password_confirmation[0] }}</span> -->

        <button class="registerbtn" type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: "guest",
  components: {
    Notification,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
      password_confirmation: "",
      error: null,
    };
  },

  methods: {
    async registerUser() {
      this.loading = true;
      this.$toast.show("Registering...");
      try {
        const Register = await this.$axios.post("/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        /*
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        */

        if (Register) {
          this.$toast.success(
            "Registered successfully. Check your email to verify your email address to enjoy full features."
          );
          this.loading = false;
        }

        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        //this.$router.push("/confirm-email");
      } catch (e) {
        this.loading = false;
        this.$toast.info(
          "There was a problem registering, check your credentials"
        );
        console.log(e);
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
  margin-right: auto;
  margin-left: auto;
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
