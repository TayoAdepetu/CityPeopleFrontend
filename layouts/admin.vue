<template>
  <v-app>
<div>
    <nav>
      <div class="list">
            <p>Hi, {{ user.name }}</p> 
        <div v-if="this.$auth.user.business_name_slug == ''">
          <p>Register your business and join millions of other businesses in our business directory</p>
          <button><nuxt-link to="/business-directory/create-business-name">Register Business</nuxt-link></button>
        </div>
      </div>
        <div class="list">
            <ul v-if="role==='superadmin'">
            <li>Moderators</li>
            <li>Register Users</li>
            <li>Categories</li>
            <li>Adverts</li>
            <li>FundHelp</li>
            <li>LendMe</li>
            <li>African Images</li>
            <li>Make Money</li>
            <li>Artisans Directory</li>
            <li><nuxt-link to="/create-post">Publish Article</nuxt-link></li> 
            <li><nuxt-link to="/admin/articles">Articles</nuxt-link></li> 
            <li><NuxtLink to="/admin/superadmin/">Users</NuxtLink></li>
            <li><nuxt-link to="/admin/workinghours-admin/working-time">WorkingHours</nuxt-link></li>
            <li><nuxt-link to="/admin/faq-admin">Faqs</nuxt-link></li>
            <li><nuxt-link to="/admin/directory-product-admin/product-admin">Products</nuxt-link></li>
            <li><nuxt-link to="/admin/job-vacancy-admin/job-admin">Job Vacancy Board</nuxt-link></li>
            <li><nuxt-link to="/admin/directory-admin">Business Directory</nuxt-link></li>
            <li><nuxt-link to="/admin/secret-anonymous-admin/secret-admin">Anonymous Secrets</nuxt-link></li>
        </ul>
        <ul v-if="role==='admin'">
            <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li hidden>African Images</li>
            <li hidden>Artisans Directory</li>
            <li><nuxt-link to="/create-post">Publish Article</nuxt-link></li> 
            <li><nuxt-link to="/admin/articles">Articles</nuxt-link></li>
            <li><nuxt-link to="/admin/directory-product-admin/product-admin">Products</nuxt-link></li>
            <li><nuxt-link to="/admin/faq-admin">Faqs</nuxt-link></li>
            <li><nuxt-link to="/admin/workinghours-admin/working-time">WorkingHours</nuxt-link></li>
            <li><nuxt-link to="/admin/job-vacancy-admin/job-admin">Job Vacancy Board</nuxt-link></li>
            <li><nuxt-link to="/admin/secret-anonymous-admin/secret-admin">Anonymous Secrets</nuxt-link></li>
            <li><nuxt-link to="/admin/directory-admin">Business Directory</nuxt-link></li>
        </ul>
        <ul v-if="role==='publisher'">
           <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li hidden>African Images</li> 
            <li hidden>Artisans Directory</li>
            <li v-if="this.$auth.user.business_name_slug != ''"><span><nuxt-link :to="`/business-directory/${this.$auth.user.business_name_slug}`">Preview Business Profile</nuxt-link></span></li>
            <li><nuxt-link :to="`/admin/published-articles/${this.$auth.user.name}`">Articles</nuxt-link></li>
            <li><nuxt-link to="/create-post">Publish Article</nuxt-link></li> 
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">MyShop</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`">MyFaqs</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`">MyWorkingHours</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">Job Vacancy Board</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`">Business Directory</nuxt-link></li>
                       
        </ul>
        <ul v-if="role==='seller'">
            <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li hidden>Artisans Directory</li>
            <li hidden>African Images</li>
            <li v-if="this.$auth.user.business_name_slug != ''"><span><nuxt-link :to="`/business-directory/${this.$auth.user.business_name_slug}`">Preview Business Profile</nuxt-link></span></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">MyShop</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`">MyFaqs</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`">MyWorkingHours</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">Job Vacancy Board</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`">Business Directory</nuxt-link></li>
        </ul>
        <ul v-if="role==='commenter'">
            <li hidden>FundHelp</li>
            <li hidden>LendMe</li>
            <li hidden>Artisans Directory</li>
            <li hidden>African Images</li>
            <li v-if="this.$auth.user.business_name_slug != ''"><span><nuxt-link :to="`/business-directory/${this.$auth.user.business_name_slug}`">Preview Business Profile</nuxt-link></span></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">MyShop</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`">MyFaqs</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`">MyWorkingHours</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`">Job Vacancy Board</nuxt-link></li>
            <li v-if="this.$auth.user.business_name_slug != ''"><nuxt-link :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`">Business Directory</nuxt-link></li>
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