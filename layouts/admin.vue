<template>
  <v-app>
<div>
    <nav>
        <div class="list">
            <p>Hi, {{ user.name }}</p>            
        </div>
        <div class="list">
            <ul v-if="role==='superadmin'">
            <li>Moderators</li>
            <li>Register Users</li>
            <li>Articles</li>
            <li>Categories</li> 
            <li>Users</li>
            <li>Adverts</li>
            <li>FundHelp</li>
            <li>LendMe</li>
            <li>Artisans Directory</li>
            <li>Job Vacancy Board</li>
            <li>Business Directory</li>
            <li>African Images</li>
            <li>Anonymous Secrets</li>
            <li>Make Money</li>
        </ul>
        <ul v-if="role==='admin'">
            <li>Articles</li> 
            <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li>Artisans Directory</li>
            <li>Job Vacancy Board</li>
            <li>Business Directory</li>
            <li hidden>African Images</li>
            <li>Anonymous Secrets</li>            
        </ul>
        <ul v-if="role==='publisher'">
            <li>Articles</li>
            <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li>Artisans Directory</li>
            <li>Job Vacancy Board</li>
            <li>Business Directory</li>
            <li hidden>African Images</li>
            <li>Anonymous Secrets</li>
            
        </ul>
        <ul v-if="role==='seller'">
            <li hidden>FundHelp</li>
            <li>MyShop</li>
            <li hidden>LendMe</li>
            <li>Artisans Directory</li>
            <li>Job Vacancy Board</li>
            <li>Business Directory</li>
            <li hidden>African Images</li>
            <li>Anonymous Secrets</li>
        </ul>
        <ul v-if="role==='commenter'">
            <li hidden>FundHelp</li>
            <li>MyShop</li>
            <li hidden>LendMe</li>
            <li>Artisans Directory</li>
            <li>Job Vacancy Board</li>
            <li>Business Directory</li>
            <li hidden>African Images</li>
            <li>Anonymous Secrets</li>
        </ul>
        </div>
    </nav>

    <Nuxt />

  </div>
</v-app>
</template>
      <script>
        export default {           
          data () {
            return {
              
              user: this.$auth.user,
              role: this.$auth.user.scope,
              
            /*  roleSeller: this.$auth.user.scope,
              roleAdmin: this.$auth.user.scope,
              rolePublisher: this.$auth.user.scope,
              roleCommenter: this.$auth.user.scope,
              roleSuperAdmin: this.$auth.user.scope,
           
        */   
           /*   roleSeller: this.$auth.hasScope('seller'),
              roleAdmin: this.$auth.hasScope('admin'),
              rolePublisher: this.$auth.hasScope('publisher'),
              roleCommenter: this.$auth.hasScope('commenter'),
              roleSuperAdmin: this.$auth.hasScope('superadmin'),
        */
            }
      
          },
        }
          
          </script>
      
      <style scoped>
        ul, li {
          list-style: none;
          padding-left: 0px;
          margin-top: 10px;
          
        }     
  
        .list {
          text-align: left;
          
        }
  
        body{
          max-width: 80%;
        }
  
        </style>