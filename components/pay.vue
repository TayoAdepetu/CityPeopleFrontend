<template>
  <div class="mt-4">
    <button
      class="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
      @click="initializePaystack()"
    >
      Pay Now
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    //use the code below in the methods object section to initialize payment
    initializePaystack() {
      //access the paystack key from env file
      var paystack_key = process.env.PAYSTACK_KEY;
      this.$paystack({
        key: paystack_key, // your public key.
        email: "paystack_in_nuxtjs@mail.com",
        //amount value is expected in kobo (charge * 100)
        amount: 1000 * 100,
        ref: "" + Math.floor(Math.random() * 100000000000000 + 1),
        currency: "NGN",
        callback: (res) => {
          console.log(res);
        },
        onClose: () => {
          alert("window cosed");
        },
      });
    },
  },
};
</script>
