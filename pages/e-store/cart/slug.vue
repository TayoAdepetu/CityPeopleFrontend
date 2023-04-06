<template>
  <div class="mt-4">
    <form>
      <div v-for="{ product, index } in cart" :key="index">
        <div>
          <img :src="product.productimage" />
          <p>{{ product.product_name }}</p>
          <p>{{ price }}</p>
          <button @click="removeFromCart(product)">Remove</button>
        </div>
      </div>
      <input readonly type="number" :value="total" />
      <button
        class="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
        @click="initializePaystack()"
      >
        Pay Now
      </button>
    </form>
  </div>
</template>
<script scoped>
export default {
  data() {
    return {
      total: null,
      loading: false,
    };
  },

  async asyncData() {
    try {
      const cart = await this.$axios.post(`/api/auth/retrieve-from-cart`);
      if (cart) {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
          total = total + cart[i].price;
        }
      }

      //this.$toast.info("Product added to cart.");
      return { cart, total };

      //this.$router.push(`/add-to-cart/${this.title.replace(/ +/g, "-")}`);
    } catch (e) {
      this.error = e.response;
    }
  },
  methods: {
    async removeFromCart(product) {
      try {
        const removeProduct = await this.$axios.post(
          `/api/auth/remove-from-cart/${this.product.product_name_slug}`
        );

        //this.$toast.info("Product added to cart.");
        if (removeProduct) {
          this.$toast.info("Product removed from cart.");
          this.$router.push(`/e-store/cart/${this.$auth.user.user_reference}`);
        }

        //this.$router.push(`/add-to-cart/${this.title.replace(/ +/g, "-")}`);
      } catch (e) {
        this.error = e.response;
      }
    },
    //use the code below in the methods object section to initialize payment
    initializePaystack() {
      //access the paystack key from env file
      var paystack_key = process.env.PAYSTACK_KEY;
      this.$paystack({
        key: paystack_key, // your public key.
        email: this.$auth.user.email,
        //amount value is expected in kobo (charge * 100)
        amount: this.total * 100,
        ref: "" + Math.floor(Math.random() * 100000000000000 + 1),
        currency: "NGN",
        callback: async (res) => {
          this.loading = true;
          var reference = res.reference;
          try {
            await this.$axios.post(`/api/auth/save-transaction-details`, {
              user_reference: this.$auth.user.user_reference,
              transaction_ref: reference,
              products: this.cart,
            });

            console.log(res);
          } catch (error) {
            this.$toast.info(error);
          }
        },
        onClose: () => {
          alert("Transaction was not completed, window closed.");
          this.loading = false;
        },
      });
    },
  },
};
</script>
