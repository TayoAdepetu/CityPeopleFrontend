<template>
    <div class="nav-align">
     
      <H1>The Citypeople</H1>
   
  <section id="Mainheading">
    
  <H2>Nigerian and Foreign News</H2>
  <p>{{time}}</p>
  <hr>
    <p><NuxtLink to="#">Politics</NuxtLink> | <NuxtLink to="#">Entertainment</NuxtLink> | <NuxtLink to="#">Sports</NuxtLink> | <NuxtLink to="#">Technology</NuxtLink> | <NuxtLink to="#">Private Sector</NuxtLink> | <NuxtLink to="#">Events</NuxtLink> | <NuxtLink to="#">Others</NuxtLink></p>
    <hr>

    <template v-if="user">
      <span>Welcome, <NuxtLink to="/admin/dashboard">{{ user.name }}</NuxtLink>.</span> | <span><NuxtLink to="/admin/dashboard">Dashboard</NuxtLink></span> |
      <span><NuxtLink to="#">Check Us On Twitter</NuxtLink></span> | <span @click="logout">Logout</span>
    </template>

    <template v-else>
      <span>Welcome, Guest</span> | <span><NuxtLink to="/login">Login</NuxtLink></span> | <span><NuxtLink to="/register">Signup</NuxtLink></span> | <span><NuxtLink to="#">Check Us On Twitter</NuxtLink></span>
    </template>

      <div id="form">
        <form class="example" action="action_page.php">
          <input
            type="text"
            placeholder="Search for a story..."
            name="search"
          />
          <button type="submit"><i class="fa fa-search"></i></button>
            </form>
            </div>
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
  
      }

    },

    methods: {   
      
      async logout () {
        console.log('logout')
        await this.$axios.$post('/api/auth/logout')
        this.$router.push('/')
      }
    }
  }
  </script>
