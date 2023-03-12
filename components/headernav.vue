<template>
  <div class="nav-align">
    <div class="word-size">
      <div class="logo"><NuxtLink to="/">The CityPeople</NuxtLink></div>

      <div class="left-roll">
        <div
          @click="toggleMenu()"
          aria-controls="main-menu"
          aria-expanded="false"
          class="mobile-nav-toggle"
        >
          <!--<span class="sr-only">Menu</span>-->
        </div>

        <ul
          id="main-menu"
          v-if="user"
          class="flex menu-list"
          data-visible="false"
        >
          <li class="pre-name">
            Welcome
            <NuxtLink class="user-greeting" to="/admin/dashboard"
              >, {{ user.name }}</NuxtLink
            >
          </li>
          <li><NuxtLink to="/admin/dashboard">Dashboard</NuxtLink></li>
          <li><NuxtLink to="#">Check Us On Twitter</NuxtLink></li>
          <li><span class="logout" @click="logout">Logout</span></li>
        </ul>

        <ul id="main-menu" v-else class="flex menu-list">
          <li class="pre-name">
            Welcome<span class="user-greeting">, Guest</span>
          </li>
          <li><nuxt-link to="/login">Login</nuxt-link></li>
          <li><NuxtLink to="/register">Signup</NuxtLink></li>
          <li><NuxtLink to="#">Check Us On Twitter</NuxtLink></li>
        </ul>
      </div>
    </div>

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
      openMenu: false,
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

    async toggleMenu() {
      //this.openMenu.getAttribute()this.
      const menu_list = this.$el.querySelector(".menu-list");
      const navToggle = this.$el.querySelector(".mobile-nav-toggle");
      const visibility = menu_list.getAttribute("data-visible");
      if (visibility === "false") {
        menu_list.setAttribute("data-visible", "true");
        navToggle.setAttribute("aria-expanded", true);
        return;
      }

      menu_list.setAttribute("data-visible", "false");
      navToggle.setAttribute("aria-expanded", false);
    },
  },
};
</script>

<style scoped>
.menu-list {
  list-style: none;
  gap: 2rem;
}

.mobile-nav-toggle {
  display: none;
}

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
  font-size: 1.2rem;
}

.map {
  width: 600px;
  height: 50vh;
}

.word-size {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
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

@media screen and (max-width: 781px) {
  .menu-list {
    text-align: right;
    font-size: 1.2rem;
    position: fixed;
    inset: 0 0 0 50%;
    /*background:hsl(0 0% 100% / 0.1);
    backdrop-filter: blur(1rem);
    */
    background: var(--dark-blue);
    opacity: 0.9;
    flex-direction: column;
    padding: min(30vh, 10rem) 2em;
    gap: 1em;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 350ms ease-in;
  }

  .menu-list[data-visible="true"] {
    transform: translateX(0%);
  }

  .mobile-nav-toggle {
    display: block;
    position: absolute;
    background: url("../assets/images/menuuuu-icon.png");
    background-repeat: no-repeat;
    border: 0;
    width: 3.2rem;
    aspect-ratio: 1;
    top: 0.6rem;
    right: 2rem;
    z-index: 9999;
    background-color: var(--lightest);
  }
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

  .logo {
    margin-right: auto;
  }
}

@media screen and (max-width: 465px) {
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
