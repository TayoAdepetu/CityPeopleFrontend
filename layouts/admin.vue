<template>
  <v-app>
    <div>
      <div class="container">
        <div class="nav-container">
          <div class="user-pix">
            <div v-if="user_picture != null">
              <!--<img class="user-avatar" :src="baseURL + 'userimage/' + user_picture">-->
              <img class="user-avatar" :src="user_picture" />
            </div>
            <div v-else>
              <img class="user-avatar" src="../assets/images/user.png" />
            </div>
          </div>
          <div class="pre-name">
            Welcome,
            <span class="user-greeting"> {{ user.name }}</span>
          </div>
          <nav class="navigation-top">
            <div class="dropdown">
              <button class="dropbtn">Check Your Menu</button>
              <ul class="dropdown-content" v-if="role === 'superadmin'">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li>Moderators</li>
                <li>Register Users</li>
                <li>Categories</li>
                <li>Adverts</li>
                <li>FundHelp</li>
                <li>LendMe</li>
                <li>
                  <nuxt-link to="/african-images/crud-images"
                    >African Images</nuxt-link
                  >
                </li>
                <li>Make Money</li>
                <li>Artisans Directory</li>
                <li>
                  <nuxt-link to="/create-post">Publish Article</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/admin/published-articles/articles"
                    >Articles</nuxt-link
                  >
                </li>
                <li><NuxtLink to="/admin/superadmin/">Users</NuxtLink></li>
                <li>
                  <nuxt-link to="/admin/workinghours-admin/working-time"
                    >WorkingHours</nuxt-link
                  >
                </li>
                <li><nuxt-link to="/admin/faq-admin">Faqs</nuxt-link></li>
                <li>
                  <nuxt-link to="/admin/directory-product-admin/product-admin"
                    >Products</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/job-vacancy-admin/job-admin"
                    >Job Vacancy Board</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/directory-admin"
                    >Business Directory</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/secret-anonymous-admin/secret-admin"
                    >Anonymous Secrets</nuxt-link
                  >
                </li>
              </ul>
              <ul class="dropdown-content" v-if="role === 'admin'">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li hidden>FundHelp</li>
                <li hidden>LendMe</li>
                <li>
                  <nuxt-link to="/african-images/crud-images"
                    >African Images</nuxt-link
                  >
                </li>
                <li hidden>Artisans Directory</li>
                <li>
                  <nuxt-link to="/create-post">Publish Article</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/admin/published-articles/articles"
                    >Articles</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/directory-product-admin/product-admin"
                    >Products</nuxt-link
                  >
                </li>
                <li><nuxt-link to="/admin/faq-admin">Faqs</nuxt-link></li>
                <li>
                  <nuxt-link to="/admin/workinghours-admin/working-time"
                    >WorkingHours</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/job-vacancy-admin/job-admin"
                    >Job Vacancy Board</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/secret-anonymous-admin/secret-admin"
                    >Anonymous Secrets</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/admin/directory-admin"
                    >Business Directory</nuxt-link
                  >
                </li>
              </ul>
              <ul class="dropdown-content" v-if="role === 'publisher'">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li hidden>FundHelp</li>
                <li hidden>LendMe</li>
                <li>
                  <nuxt-link
                    :to="`african-images/edit-images/${this.$auth.user.name}`"
                    >African Images</nuxt-link
                  >
                </li>
                <li hidden>Artisans Directory</li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <span
                    ><nuxt-link
                      :to="`/business-directory/${this.$auth.user.business_name_slug}`"
                      >Preview Business Profile</nuxt-link
                    ></span
                  >
                </li>
                <li>
                  <nuxt-link
                    :to="`/admin/published-articles/${this.$auth.user.name}`"
                    >Articles</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/create-post">Publish Article</nuxt-link>
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >MyShop</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`"
                    >MyFaqs</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`"
                    >MyWorkingHours</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >Job Vacancy Board</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`"
                    >Business Directory</nuxt-link
                  >
                </li>
              </ul>
              <ul class="dropdown-content" v-if="role === 'seller'">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li hidden>FundHelp</li>
                <li hidden>LendMe</li>
                <li hidden>Artisans Directory</li>
                <li>
                  <nuxt-link
                    :to="`african-images/edit-images/${this.$auth.user.name}`"
                    >African Images</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <span
                    ><nuxt-link
                      :to="`/business-directory/${this.$auth.user.business_name_slug}`"
                      >Preview Business Profile</nuxt-link
                    ></span
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >MyShop</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`"
                    >MyFaqs</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`"
                    >MyWorkingHours</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >Job Vacancy Board</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`"
                    >Business Directory</nuxt-link
                  >
                </li>
              </ul>
              <ul class="dropdown-content" v-if="role === 'commenter'">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li hidden>FundHelp</li>
                <li hidden>LendMe</li>
                <li hidden>Artisans Directory</li>
                <li>
                  <nuxt-link
                    :to="`african-images/edit-images/${this.$auth.user.name}`"
                    >African Images</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <span
                    ><nuxt-link
                      :to="`/business-directory/${this.$auth.user.business_name_slug}`"
                      >Preview Business Profile</nuxt-link
                    ></span
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >MyShop</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/faq-admin/published-faq/${this.$auth.user.business_name_slug}`"
                    >MyFaqs</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/workinghours-admin/${this.$auth.user.business_name_slug}`"
                    >MyWorkingHours</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
                    >Job Vacancy Board</nuxt-link
                  >
                </li>
                <li v-if="this.$auth.user.business_name_slug != null">
                  <nuxt-link
                    :to="`/admin/directory-admin/${this.$auth.user.business_name_slug}`"
                    >Business Directory</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="biz-class">
          <div v-if="this.$auth.user.business_name_slug != null">
            <p>
              {{ this.$auth.user.business_name }}
            </p>
          </div>

          <div v-else>
            <p>
              Register your business and join millions of other businesses in
              our business directory.
            </p>
            <button>
              <nuxt-link to="/business-directory/create-business-name"
                >Register Business</nuxt-link
              >
            </button>
          </div>
        </div>
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      role: this.$auth.user.scope,
      user_picture: this.$auth.user.user_image,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 100vw;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  background-color: var(--dark-blue);
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  padding: 10px;
}
.user-avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.user-greeting {
  color: var(--yellow) !important;
}

.pre-name {
  color: var(--lightest) !important;
}

.biz-class {
  margin-top: 12px;
  margin-top: 20px;
}

.dropbtn {
  background-color: var(--teal);
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content li {
  color: black;
  padding-top: 6px;
  padding-top: 3px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Change color of dropdown links on hover */
.dropdown-content li:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: var(--yellow);
}
</style>
