<template>
  <div>
    <div class="biz-class">
      <div v-if="this.$auth.user.business_name_slug != null">
        <p>
          {{ this.$auth.user.business_name }}
        </p>
      </div>

      <div v-else>
        <p>
          Register your business and join millions of other businesses in our
          business directory.
        </p>
        <button>
          <nuxt-link to="/business-directory/create-business-name"
            >Register Business</nuxt-link
          >
        </button>
      </div>
    </div>
    <!--
      <hr />
      <div>
        <h2 class="index-h2">Explore A Large Nigerian Busineses Directory</h2>
        <div class="grid-container">
          <div
            v-for="directory in directories"
            :key="directory.id"
            id="before-headlines"
          >
            <NuxtLink
              :to="`/business-directory/${directory.user.business_name_slug}`"
            >
              <img id="short-image" :src="directory.image" />
              <div id="before-title">
                <h3 id="title">{{ directory.user.business_name }}</h3>
              </div>
              <div id="short-body">
                <p id="short-paragraph">Location: {{ directory.location }}</p>
                <p id="short-paragraph">
                  Phone: {{ directory.user.phone_number }}
                </p>
                <p id="short-paragraph">Email: {{ directory.user.email }}</p>
                <p id="short-paragraph">Website: {{ directory.website }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <nuxt-link to="/business-directory" class="explore-more"
          >Explore More</nuxt-link
        >
      </div>
      <hr />

      <div>
        <h2 class="index-h2">
          Search For Available Job Vacancies In Nigerian States
        </h2>
        <div class="grid-container">
          <div v-for="job in jobs" :key="job.id" id="before-headlines">
            <NuxtLink :to="`/job-directory/${job.job_slug}`">
              <img id="short-image" :src="baseURL + 'postimage/' + directory.image" />
              <div id="before-title">
                <h3 id="title">{{ job.title }}</h3>
              </div>
              <div id="short-body">
                <p id="short-paragraph">Posted By: {{ job.user.name }}</p>
                <p id="short-paragraph">Responsilities: {{ job.function }}</p>
                <p id="short-paragraph">Location: {{ job.location }}</p>
                <p id="short-paragraph">Salary: {{ job.salary }}</p>
                <p id="short-paragraph">
                  Posted: {{ getDate(job.created_at) }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <nuxt-link to="/job-vacancies" class="explore-more"
          >Explore More</nuxt-link
        >
      </div>
    -->

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
        :to="`/admin/biz/faq-admin/published-faq/${this.$auth.user.business_name_slug}`"
        >MyFaqs</nuxt-link
      >
    </li>
    <li v-if="this.$auth.user.business_name_slug != null">
      <nuxt-link
        :to="`/admin/biz/workinghours-admin/${this.$auth.user.business_name_slug}`"
        >MyWorkingHours</nuxt-link
      >
    </li>
    <li v-if="this.$auth.user.business_name_slug != null">
      <nuxt-link
        :to="`/admin/biz/directory-admin/${this.$auth.user.business_name_slug}`"
        >Business Directory</nuxt-link
      >
    </li>

    <li v-if="this.$auth.user.business_name_slug != null">
      <nuxt-link
        :to="`/admin/job-vacancy-admin/${this.$auth.user.business_name_slug}`"
        >Job Vacancy Board</nuxt-link
      >
    </li>

    <div>
      <h2 class="index-h2">Buy Unique Products on Our E-commerce Platform</h2>
      <div class="grid-container">
        <div
          v-for="product in products"
          :key="product.id"
          id="before-headlines"
        >
          <NuxtLink
            :to="`/business-directory/directory-product/${product.product_name_slug}`"
          >
            <img
              id="short-image"
              :src="product.productimages[0].product_image_path"
            />
            <div id="before-title">
              <h3 id="title">{{ product.product_name }}</h3>
            </div>
            <div id="short-body">
              <p id="short-paragraph">{{ product.price }}</p>
              <p id="short-paragraph">
                {{ product.description }}
              </p>
              <p id="short-paragraph">{{ product.location }}</p>

              <p id="short-paragraph">{{ getDate(product.created_at) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <nuxt-link to="/e-store/ecommerce" class="explore-more"
        >Explore More</nuxt-link
      >
    </div>
    <hr />
    <div>
      <h2 class="index-h2">
        View and Download Pictures From The Most Beautiful Places and Events in
        Nigeria
      </h2>
      <div class="grid-container">
        <div v-for="image in images" :key="image.id" id="before-headlines">
          <NuxtLink :to="`/nigerian-images/${image.id}`">
            <img id="short-image" :src="image.image_path" />
            <p id="short-paragraph">{{ image.image_name }}</p>
          </NuxtLink>
        </div>
      </div>
      <nuxt-link
        to="/nigerian-images/beautiful-nigerian-images"
        class="explore-more"
        >Explore More</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {},

  methods: {
    async getDirectories() {
      this.loading = true;
      try {
        const { data } = await this.$axios.get(`/api/auth/all-biz`);
        this.directories = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.error);
      }
    },

    async getJobs() {
      try {
        const { data } = await this.$axios.get(`/api/auth/jobs`);
        this.jobs = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getImages() {
      try {
        const { data } = await this.$axios.get(`/api/auth/fetch-images`);
        this.images = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async getProducts() {
      try {
        const { data } = await this.$axios.get(`/api/auth/all-products`);
        this.products = data.data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },
  },
};
</script>
