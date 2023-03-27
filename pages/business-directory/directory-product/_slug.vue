<template>
  <div>
    <div class="container">
      <div id="new-headlines">
        <div>
          <!--Slider: https://www.digitalocean.com/community/tutorials/vuejs-create-image-slider-->
          <!--
          <img
            class="short-image"
            :src="`{{ product[0].productimages.product_image_path }}`"
          />-->
          <transition-group name="fade" tag="div">
            <div v-for="i in [currentIndex]" :key="i">
              <img :src="currentImg" />
            </div>
          </transition-group>
          <a class="prev" @click="prev" href="#">&#10094; Previous</a>
          <a class="next" @click="next" href="#">&#10095; Next</a>
        </div>
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
  data() {
    return {
      images: null,
      timer: null,
      currentIndex: 0,
    };
  },

  mounted: function () {
    this.startSlide();
    this.fetchProducts();
  },

  methods: {
    async fetchProducts(context) {
      let response = await context.$axios.get(
        `/api/auth/product/${context.params.slug}`
      );

      this.product = response.data;
      this.images = this.product[0].productimages;
      return {
        product,
      };
    },

    startSlide: function () {
      this.timer = setInterval(this.next, 4000);
    },

    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 600px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

@media screen and (max-width: 400px) {
  .short-image {
    width: 70vw;
  }
}
</style>
