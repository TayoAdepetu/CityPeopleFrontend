<template>
  <div>
    <div class="container">
      <div class="grid-container">
        <div
          v-for="product in products"
          :key="product.id"
          id="before-headlines"
        >
          <div id="app">
            <vue-image-slider
              :images="product.productimages"
              :intervalVal="4000"
              :height="400"
              :width="600"
            />
          </div>
          <div id="before-title">
            <h3 id="title">{{ product.product_name }}</h3>
          </div>
          <div id="short-body">
            <p id="short-paragraph">₦ {{ product.price }}</p>
            <p id="short-paragraph">₦ {{ product.commission }}</p>
            <p id="short-paragraph">
              {{ product.landing_page_title }}
            </p>
            <p id="short-paragraph">{{ product.delivery_days }}</p>

            <p id="short-paragraph">{{ getDate(product.created_at) }}</p>
          </div>
          <!--
          <button class="btn" @click="openAffiliateInfo(product)">
            Affiliate Info
          </button>-->
        </div>
      </div>
      <div class="pagination">
        <button class="paginate" @click.prevent="moveBack()">
          Previous List</button
        ><button class="paginate" @click.prevent="moveFront()">
          Next List
        </button>
      </div>

      <div data-app>
        <v-col cols="auto">
          <v-dialog
            v-model="openDialog"
            persistent
            transition="dialog-top-transition"
            max-width="600"
          >
            <div id="new-headlines">
              <h1>{{ product[0].landing_page_title }}</h1>
              <h2>{{ product[0].headline_support }}</h2>
              <div>
                <div
                  v-for="image_pix in product[0].productimages"
                  :key="image_pix"
                >
                  <img :src="image_pix" />
                  <button>Download Image</button>
                </div>
              </div>
              <h3>{{ product[0].product_name }}</h3>
              <p>
                <span>Price: ₦ {{ product[0].price }}</span>
              </p>
              <p>
                <span>Commission: ₦ {{ product[0].commission }}</span>
              </p>

              <div id="product-description">
                <p>
                  <span class="seller-details">Delivery Date:</span>
                  {{ product[0].delivery_days }}
                </p>
              </div>

              <div id="product-description">
                <div>{{ product[0].description }}</div>
              </div>
              <div id="product-description">
                <div>{{ product[0].reviews_pictures }}</div>
              </div>
              <div id="product-description">
                <div>{{ product[0].FAQs_pictures }}</div>
              </div>
              <div id="product-description">
                <div>{{ product[0].more_pictures }}</div>
              </div>
            </div>
          </v-dialog>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import VueImageSlider from "vue-image-slider";

export default {
  name: "app",
  components: {
    VueImageSlider,
  },
  data() {
    return {
      openDialog: false,
      selectedProduct: {
        product_name: "",
        landing_page_title: "",
        headline_support: "",
        description: "",
        raw_price: null,
        commission: null,
        price: null,
        delivery_days: "",
        reviews_pictures: null,
        pictures: null,
        images: null,
        FAQs_pictures: null,
        more_pictures: null,
        product_name_slug: null,
      },
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getProducts(page) {
      page = page || "all-myproducts?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.products = data.data;
        this.first_page = data.first_page_url.split("/")[5];
        this.last_page = data.last_page_url.split("/")[5];

        if (data.prev_page_url != null) {
          this.previous_page = data.prev_page_url.split("/")[5];
        } else {
          this.previous_page = data.last_page_url.split("/")[5];
        }

        if (data.next_page_url != null) {
          this.next_page = data.next_page_url.split("/")[5];
        } else {
          this.next_page = data.first_page_url.split("/")[5];
        }
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    moveFront() {
      this.page = this.next_page;
      this.getPosts(this.page);
    },

    moveBack() {
      this.page = this.previous_page;
      this.getPosts(this.page);
    },
  },
  /*

  openAffiliateInfo(product) {
    this.openDialog = true;
    this.selectedProduct.product_name = this.product.product_name;
    this.selectedProduct.product_name_slug = this.product.product_name_slug;
    this.selectedProduct.id = this.product.id;
    this.selectedProduct.landing_page_title = this.product.landing_page_title;
    this.selectedProduct.headline_support = this.product.headline_support;
    this.selectedProduct.description = this.product.description;
    this.selectedProduct.raw_price = this.product.raw_price;
    this.selectedProduct.commission = this.product.commission;
    this.selectedProduct.price = this.product.price;
    this.selectedProduct.delivery_days = this.product.delivery_days;
    this.selectedProduct.reviews_pictures = this.product.reviews_pictures;
    this.selectedProduct.pictures = this.product.pictures;
    this.selectedProduct.images = this.product.images;
    this.selectedProduct.FAQs_pictures = this.product.FAQs_pictures;
    this.selectedProduct.more_pictures = this.product.more_pictures;
  },
  */

  created() {
    this.getProducts();
  },
};
</script>
