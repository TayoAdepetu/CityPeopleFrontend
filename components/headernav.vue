<template>
    <div class="nav-align">
     
      <H1>The CityPeople</H1>
   
  <section id="Mainheading">
    
  <H2>The Fact-based, Nigerian Wiki</H2>
  <p>{{time}}</p>
  <hr>
    <p><NuxtLink to="#">Politics</NuxtLink> | <NuxtLink to="#">Entertainment</NuxtLink> | <NuxtLink to="#">Sports</NuxtLink> | <NuxtLink to="#">Technology</NuxtLink> | <NuxtLink to="#">Private Sector</NuxtLink> | <NuxtLink to="#">Events</NuxtLink> | <NuxtLink to="#">Others</NuxtLink></p>
    <hr>

    <template v-if="user">
      <span>Welcome, <NuxtLink to="/admin/dashboard">{{ user.name }}</NuxtLink>.</span> | <span><NuxtLink to="/admin/dashboard">Dashboard</NuxtLink></span> |
      <span><NuxtLink to="#">Check Us On Twitter</NuxtLink></span> | <span class="logout" @click="logout">Logout</span>
    </template>

    <template v-else>
      <span>Welcome, Guest</span> | <span><NuxtLink to="/login">Login</NuxtLink></span> | <span><NuxtLink to="/register">Signup</NuxtLink></span> | <span><NuxtLink to="#">Check Us On Twitter</NuxtLink></span>
    </template>
 <!--
    <div id="form">
      <form class="example" @submit.prevent="searchBiz">
        <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            v-model="keyword"
          />
         
          <select v-model="item" required>
            <option :value="null" disabled hidden>Pick Search Category...</option>
            <option value="username"><button >Search For A User</button></option>
            <option value="business"><button>Search For A Business</button></option>
            <option value="article"><button>Search For An Article</button></option>
            <option value="product"><button>Search For A Product</button></option>
          </select>

        <button type="submit">Find User</button>
      </form>
    </div>
    <div id="form">
    <form class="example" @submit.prevent="searchBiz">
      <div class="picker">
        <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            readonly
          />
          <select v-model="item" required>
            <option :value="null" disabled hidden>Pick Search Category...</option>
            <option value="username"><button >Search For A User</button></option>
            <option value="business"><button>Search For A Business</button></option>
            <option value="article"><button>Search For An Article</button></option>
            <option value="product"><button>Search For A Product</button></option>
          </select>
        </div>

<div class="input-action" v-if="(item != null)">

          <div v-if="(item == 'username')">
          <input
            type="text"
            placeholder="Search by name of a user..."
            v-model="keyword"
          />
          <button type="submit">Find User</button>
        </div>

        <div v-if="(item == 'business')">
          <input
            type="text"
            placeholder="Search by name of a business..."
            v-model="keyword"
          />
          <button type="submit">Find Business</button>
        </div>

        <div v-if="(item == 'business')">
          <input
            type="text"
            placeholder="Search by name of a business..."
            v-model="keyword"
          />
          <button type="submit">Find Business</button>
        </div>

        <div v-if="(item == 'article')">
          <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            v-model="keyword"
          />
          <button type="submit">Search Topic</button>
        </div>

        <div v-if="(item == 'product')">
          <input
            type="text"
            placeholder="Search by name of product..."
            v-model="keyword"
          />
          <button type="submit">Find Product</button>
        </div>
      </div>


            </form>
            </div>
            -->
  </section>
  
  <section id="Mainheading">
    <H2>Nigerian State Gists</H2>
    <hr>
<NuxtLink to="#">Lagos</NuxtLink> | <NuxtLink to="#">Ogun</NuxtLink> | <NuxtLink to="#">Oyo</NuxtLink> | <NuxtLink to="#">Osun</NuxtLink> | <NuxtLink to="#">Ondo</NuxtLink> | <NuxtLink to="#">Ekiti</NuxtLink> | <NuxtLink to="#">National</NuxtLink> | <NuxtLink to="#">International</NuxtLink>
  
  </section>
  
  <section id="Mainheading">
    <h2>Other Trending Categories</h2>
    <hr>
    <p><NuxtLink to="#">How To Make Money In Nigeria</NuxtLink> | <NuxtLink to="/secret-anonymous">Stories: Share Secrets Anonymously</NuxtLink> | <NuxtLink to="#">FundHelp</NuxtLink> | <NuxtLink to="#">LendMe</NuxtLink> | <NuxtLink to="#">African Images</NuxtLink> | <NuxtLink to="#">Nigerian Business Directory</NuxtLink> | <NuxtLink to="#">Artisans Directory</NuxtLink> | <NuxtLink to="#">Job Vacancy Board</NuxtLink></p>
  </section>
  <section>
  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729">
  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729">
  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729">
  </section>`
    </div>
  </template>
  

<script>
  export default {
    
    data () {
      return {
        time: Date(),
        user: this.$auth.user,
        //https://stackoverflow.com/questions/40375602/placeholder-for-select-in-vuejs-2-0-0
        item:null,
        keyword:"",
        results:null,
        search:false,
      }

    },

    methods: {   
      
      async logout () {
        console.log('logout')
        await this.$axios.$post('/api/auth/logout')
        this.$router.push('/')
      },

      async searchBiz(){
          this.loading = true;
          this.$toast.info('Searching...');
          try {
            const { data } = await this.$axios.get(`/api/auth/search-web/${this.keyword}`);
            this.results = data
            this.toast.success('Results found...');
            return {results};
          } catch (error) {
            this.loading = false;
            this.$toast.error(error.response.data.error);
          }
        },

    }
  }
  </script>
