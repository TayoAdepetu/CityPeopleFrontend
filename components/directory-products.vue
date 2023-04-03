<template>
  <div>
    <!--list of products for each business gotten frm database by business_name_slug-->
    <h3 id="title">Our Products</h3>
    <div v-for="product in products" :key="product.id" id="before-headlines">
      <NuxtLink
        :to="`/business-directory/directory-product/${product.product_name_slug}`"
      >
        <div id="headlines">
          <h3>{{ product.product_name }}</h3>
          <div>
            <img :src="`{{ product.productimages.product_image_path[0] }}`" />
            <p>{{ product.price }}</p>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      products: [],
      error: null,
      business_name_slug: this.$auth.user.business_name_slug,
    };
  },

  methods: {
    async fetchProducts(business_name_slug) {
      let response = await context.$axios.get(
        `/api/auth/products/${business_name_slug}`
      );
      let products = response.data;
      return {
        products,
      };
    },
  },
};
</script>
