<template>
  <div class="nav-align">
    <nav class="flex word-size">
      <div class="logo"><NuxtLink to="/index">The CityPeople</NuxtLink></div>

      <nav v-if="user" class="flex">
        <div class="flex pre-name">
          Welcome
          <NuxtLink to="/admin/dashboard"
            ><span class="user-greeting">, {{ user.name }}</span></NuxtLink
          >
        </div>
        <div class="flex space-between">
          <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
          <NuxtLink to="#">Check Us On Twitter</NuxtLink>
          <span class="logout" @click="logout">Logout</span>
        </div>
      </nav>

      <nav v-else class="flex">
        <div class="flex pre-name">
          Welcome<span class="user-greeting">, Guest</span>
        </div>
        <div class="flex space-between">
          <nuxt-link to="/login">Login</nuxt-link>
          <NuxtLink to="/register">Signup</NuxtLink>
          <NuxtLink to="#">Check Us On Twitter</NuxtLink>
        </div>
      </nav>
    </nav>

    <div class="flex hero">
      <div class="hero-head">
        <H2 class="head"
          >The Fact-based Wiki For Nigerian Peeps, Institutions, and Businesses
        </H2>
        <p class="sub-head">
          We give you the fact. You decide what to do with it.
        </p>
      </div>
      <div>
        <img
          class="map"
          src="../assets/images/Nigeria-Map.jpg"
          alt="Nigerian Map"
        />
      </div>
    </div>

    <hr class="hero-end-horizontal" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: Date(),
      user: this.$auth.user,
      //https://stackoverflow.com/questions/40375602/placeholder-for-select-in-vuejs-2-0-0
      item: null,
      keyword: "",
      results: null,
      search: false,
    };
  },

  methods: {
    async logout() {
      console.log("logout");
      await this.$axios.$post("/api/auth/logout");
      this.$router.push("/");
    },

    async searchBiz() {
      this.loading = true;
      this.$toast.info("Searching...");
      try {
        const { data } = await this.$axios.get(
          `/api/auth/search-web/${this.keyword}`
        );
        this.results = data;
        this.toast.success("Results found...");
        return { results };
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
.user-greeting {
  color: var(--yellow) !important;
}

.pre-name {
  color: var(--lightest) !important;
}

.v-application a {
  color: var(--lightest) !important;
}
.logo {
  margin-right: 100px;
}

.map {
  width: 600px;
  height: 50vh;
}

.word-size {
  font-size: 20px;
  background-color: var(--dark-blue);
  padding: 20px;
}

.hero {
  height: 50vh;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
}

.hero-head {
  text-align: left;
  justify-content: center;
}

.head {
  font-size: 40px;
}

.sub-head {
  font-size: 20px;
}

@media screen and (max-width: 1196px) {
  .head {
    font-size: 35px;
  }

}

@media screen and (max-width: 1155px) {
  .map {
    width: 550px;
  }
}

@media screen and (max-width: 1066px) {
  .map {
    width: 500px;
  }
}

@media screen and (max-width: 1004px) {
  .head {
    font-size: 30px;
  }

  .sub-head {
    font-size: 18px;
  }
}

@media screen and (max-width: 905px) {
  .head {
    font-size: 25px;
  }
}

@media screen and (max-width: 850px) {
  .map {
    width: 450px;
  }
}

@media screen and (max-width: 790px) {
  .map {
    width: 400px;
  }

  .sub-head {
    font-size: 16px;
  }
}

@media screen and (max-width: 723px) {
  .map {
    width: 350px;
  }

  .sub-head {
    font-size: 15px;
  }
}

@media screen and (max-width: 660px) {
  .hero {
    width: 90%;
  }

  .map {
    width: 300px;
  }
}

@media screen and (max-width: 525px) {
  .hero {
    width: 95%;
    margin-bottom: 0;
  }

  .map {
    width: 300px;
  }
}

@media screen and (max-width: 504px) {
  .head {
    font-size: 22px;
  }
}

@media screen and (max-width: 446px) {
  .map {
    width: 250px;
  }

  .sub-head {
    font-size: 13px;
  }
}

@media screen and (max-width: 392px) {
  .hero {
    height: 40vh;
  }

  .sub-head {
    font-size: 12px;
  }

  .head {
    font-size: 20px;
  }

  .map {
    width: 200px;
    height: 40vh;
  }
}

@media screen and (max-width: 353px) {
  .map {
    width: 195px;
  }

  .head {
    font-size: 18px;
  }
}

@media screen and (max-width: 310px) {
  .map {
    width: 180px;
  }

  .head {
    font-size: 16px;
  }
}

@media screen and (max-width: 285px) {
  .map {
    display: none;
  }

  .head {
    text-align: center;
    font-size: 28px;
  }

  .sub-head {
    text-align: center;
    font-size: 16px;
  }
}
</style>
