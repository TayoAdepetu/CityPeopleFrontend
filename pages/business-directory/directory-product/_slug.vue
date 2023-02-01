<template>
  <div>
    <div class="container">
      <div id="new-headlines">
        <img class="short-image" :src="`{{ product[0].image }}`" />
        <h3>{{ product[0].product_name }}</h3>
        <p>
          <span>Price: ₦ {{ product[0].price }}</span>
        </p>
        <div class="chat-div">
          <nuxt-link class="chat-button" :to="`/chat/${product[0].user.id}`"
            >Chat Business</nuxt-link
          >
        </div>
        <div id="product-description">
          
          <p>
            <span class="seller-details">Product Location:</span>
            {{ product[0].location }}
          </p>
          <p>
            <span class="seller-details">Seller:</span>
            {{ product[0].user.business_name }}
          </p>
          <p>
            <span class="seller-details">Seller Phone:</span>
            {{ product[0].user.phone_number }}
          </p>
        </div>

        <div id="product-description">
          <h2 id="product-details">Product Details</h2>
          <div>{{ product[0].description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  async asyncData(context) {
    let response = await context.$axios.get(
      `/api/auth/product/${context.params.slug}`
    );
    let product = response.data;
    return {
      product,
    };
  },
};
</script>

<style scoped>
.short-image {
  width: 300px;
  height: 350px;
}
.chat-button {
  background-color: var(--yellow);
  padding: 10px;
}
.container {
  margin-top: 100px;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  width: 80vw;
  word-wrap: break-word;
}

#new-headlines {
  display: block;
}

#product-description {
  border: 2px solid #036;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f7f5f4;
  margin-bottom: 3px !important;
  text-align: left;
}

.seller-details {
  font-weight: bold;
}

@media screen and (max-width: 400px) {
  .short-image {
    width:70vw;
  }

}
</style>
