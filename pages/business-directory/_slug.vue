<template>
  <div>
    <div class="container">
      <div>
        <h1 id="title">{{ directory.user.business_name }}</h1>
        <img class="biz-image" :src="`{{ directory.image }}`" />
        <div class="chat-div">
          <nuxt-link class="chat-button" :to="`/chat/${directory.user.id}`"
            >Chat Business</nuxt-link
          >
        </div>
        <div class="biz-verify">
          <span> Verified?: {{ directory.verified }} </span>
        </div>
        <div class="biz-describe">{{ directory.description }}</div>

        <div id="author-date">
          <div class="biz-details">
            <div>
              <span class="biz-bold"> Established:</span>
              {{ directory.established }}
            </div>
            <div>
              <span class="biz-bold"> Location:</span> {{ directory.location }}
            </div>
            <div>
              <span class="biz-bold"> No Of Employees:</span>
              {{ directory.number_of_employees }}
            </div>
            <div>
              <span class="biz-bold"> Registered Here:</span>
              {{ getDate(directory.created_at) }}
            </div>
            <div>
              <span class="biz-bold"> Email Address:</span>
              {{ directory.user.email }}
            </div>
            <div>
              <span class="biz-bold"> Website:</span> {{ directory.website }}
            </div>
            <div>
              <span class="biz-bold"> Phone:</span>
              {{ directory.user.phone_number }}
            </div>
          </div>
        </div>
      </div>
      <h3 class="faqs">Our Working Hours</h3>
      <div class="work-time">
        <div class="biz-bold">Monday: {{ worktime[0].monday }}</div>
        <div class="biz-bold">Tuesday: {{ worktime[0].tuesday }}</div>
        <div class="biz-bold">Wednesday: {{ worktime[0].wednesday }}</div>
        <div class="biz-bold">Thursday: {{ worktime[0].thursday }}</div>
        <div class="biz-bold">Friday: {{ worktime[0].friday }}</div>
        <div class="biz-bold">Saturday: {{ worktime[0].saturday }}</div>
        <div class="biz-bold">Sunday: {{ worktime[0].sunday }}</div>
      </div>
      <div class="faqs">
        <h3>Our Products</h3>
        <div class="product-section">
          <div
            v-for="product in products"
            :key="product.id"
            class="before-product"
          >
            <NuxtLink
              :to="`/business-directory/directory-product/${product.product_name_slug}`"
            >
              <img class="product-image" :src="`{{ product.image }}`" />
              <h4>
                <span>{{ product.product_name }}</span> (<span
                  >₦ {{ product.price }}</span
                >)
              </h4>
              <p>{{ product.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="faqs">
        <h3>Frequently Asked Questions</h3>
        <div v-for="faq in faqs" :key="faq.id" class="faq-questions">
          <p class="biz-bold">{{ faq.question }}</p>
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  /*
    date(){
        return{
           directory:[],
        }
    },
*/
  async asyncData(context) {
    const [directoryRes, productsRes, worktimeRes, faqsRes] = await Promise.all(
      [
        context.$axios.get(`/api/auth/biz-directory/${context.params.slug}`),
        context.$axios.get(`/api/auth/products/${context.params.slug}`),
        context.$axios.get(`/api/auth/all-worktime/${context.params.slug}`),
        context.$axios.get(`/api/auth/all-faqs/${context.params.slug}`),
      ]
    );
    return {
      directory: directoryRes.data,
      products: productsRes.data,
      worktime: worktimeRes.data,
      faqs: faqsRes.data,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },
};
</script>

<style scoped>
.chat-button {
  background-color: var(--yellow);
  padding: 10px;
}

.biz-verify {
  margin-top: 20px;
  background-color: var(--yellow);
  padding: 20px;
  border-radius: 50%;
  width: 50vw;
  margin-right: auto;
  margin-left: auto;
  font-weight: 400;
  font-size: 30px;
}

.chat-div {
  margin-top: 20px;
}
.container {
  margin-top: 100px;
  margin: 20px;
  margin-right: auto;
  margin-left: auto;
  width: 80vw;
  word-wrap: break-word;
}

.biz-image {
  width: 50vw;
  height: 400px;
}
.biz-describe {
  border: 2px solid var(--yellow);
  margin-top: 10px;
  padding: 12px;
  background-color: #f7f5f4;
  margin-bottom: 10x !important;
  text-align: left;
}

.biz-details {
  border: 2px solid var(--yellow);
  margin-top: 10px;
  padding: 12px;
  background-color: #f7f5f4;
  margin-bottom: 10x !important;
  text-align: left;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2.5%;
}

.biz-bold {
  font-weight: bold;
}

.work-time {
  border: 2px solid var(--yellow);
  margin-top: 5px;
  padding: 12px;
  background-color: #f7f5f4;
  margin-bottom: 10x !important;
  word-wrap: break-word;
  display: block;
}

.before-product {
  border: 2px solid var(--yellow);
  margin-bottom: 10px;
  background-color: #f7f5f4;
  width: 30vw;
}

.product-section {
  margin-top: 10px;
  margin-bottom: 10x !important;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2.5%;
}

.product-image{
    height:220px;
    width:100%;
    margin-top:0;
}

.faq-questions {
  border: 2px solid var(--yellow);
  margin-bottom: 10px;
  background-color: #f7f5f4;
  align-items:center;
}

.faqs {
  margin-top: 20px;
}

@media screen and (max-width: 700px) {
  .biz-details {
    display: block;
  }

  .product-section {
    display: block;
  }
}
</style>
