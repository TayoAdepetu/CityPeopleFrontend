<template>
  <div class="container">
    <h2>Upload Your Products</h2>

    <form @submit.prevent="createDirectoryProduct">
      <input hidden type="" :value="user_id" />

      <div class="form-group">
        <textarea
          v-model="landing_page_title"
          class="form-control"
          id="title"
          placeholder="Enter landing page main title"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <textarea
          type="text"
          v-model="headline_support"
          class="form-control"
          id="title"
          placeholder="Enter supporting text for title"
        ></textarea>
      </div>

      <di>
        <div class="image-section">
          Add Relevant Product Images (Maximum of 5 images)
          <input type="file" multiple @change="onChange" />
        </div>

        <div
          class="image-section"
          v-for="(picture, index) in pictures"
          :key="index"
        >
          <img :src="picture" />
        </div>
      </di>

      <div class="form-group">
        <textarea
          v-model="product_name"
          class="form-control"
          id="title"
          placeholder="Enter the name of the product"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="price"
          class="form-control"
          id="title"
          placeholder="Enter price of the product"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="delivery_days"
          class="form-control"
          id="title"
          placeholder="Add delivery days"
        />
      </div>

      <div class="form-group">
        <textarea
          type="text"
          v-model="description"
          class="form-control"
          id="description"
          placeholder="Describe the product, stating the benefits and unique selling proposition"
          required
        ></textarea>
      </div>

      <di>
        <div class="image-section">
          Add an Image of User Testimonials
          <input type="file" @change="onChangeReviewsPictures" required />
        </div>

        <div class="image-section" v-if="reviews_pictures">
          <img :src="reviews_pictures" />
        </div>
      </di>

      <di>
        <div class="image-section">
          Add an Image of FAQs and Answers
          <input type="file" @change="onChangeFAQsPictures" required />
        </div>

        <div class="image-section" v-if="FAQs_pictures">
          <img :src="FAQs_pictures" />
        </div>
      </di>

      <di>
        <div class="image-section">
          Add a Combined Product Image If Available
          <input type="file" @change="onChangeMorePictures" />
        </div>

        <div class="image-section" v-if="more_pictures">
          <img :src="more_pictures" />
        </div>
      </di>

      <button type="submit" class="btn btn-primary block">Publish</button>
    </form>
  </div>
</template>

<script>
//import Notification from '~/components/Notification'

export default {
  middleware: "iscommenter",
  layout: "admin",
  data() {
    return {
      user_id: null,
      product_name: "",
      landing_page_title: "",
      headline_support: "",
      description: "",
      price: "",
      delivery_days: "",
      reviews_pictures: null,
      pictures: null,
      images: null,
      FAQs_pictures: null,
      more_pictures: null,
      error: null,
    };
  },

  methods: {
    onChange(e) {
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        /*
        let img = {
          src: URL.createObjectURL(selectedFiles[i]),
          file: selectedFiles[i],
        };
        */
        if (i < 5) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFiles[i]);
          reader.onloadend = (e) => {
            this.imagepiece = reader.result;
            console.log(this.imagepiece);
            this.images.push(this.imagepiece);
          };
          //this.images.push(selectedFiles[i]);
          console.log(this.images);
          this.pictures.push(URL.createObjectURL(selectedFiles[i]));
        } else {
          return this.$toast.info("Image should not be more than five.");
        }
      }
    },

    onChangeMorePictures(e) {
      var selectedFiles = e.target.files[0];

      if (selectedFiles) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFiles);
        reader.onloadend = (e) => {
          this.more_pictures = reader.result;
        };
      } else {
        return this.$toast.info("Check More Pictures Input.");
      }
    },

    onChangeFAQsPictures(e) {
      var selectedFiles = e.target.files[0];

      if (selectedFiles) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFiles);
        reader.onloadend = (e) => {
          this.FAQs_pictures = reader.result;
        };
      } else {
        return this.$toast.info("Check FAQs image.");
      }
    },
  },

  onChangeReviewsPictures(e) {
    var selectedFiles = e.target.files[0];

    if (selectedFiles) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFiles);
      reader.onloadend = (e) => {
        this.reviews_pictures = reader.result;
      };
    } else {
      return this.$toast.info("Check review image.");
    }
  },

  async createDirectoryProduct() {
    try {
      await this.$axios.post(`/api/auth/create-directory-product`, {
        product_name: this.product_name,
        product_name_slug: this.product_name.replace(/ +/g, "-"),
        description: this.description,
        price: this.price,
        delivery_days: this.delivery_days,
        user_id: this.$auth.user.id,
        images: this.images,
        landing_page_title: this.landing_page_title,
        headline_support: this.headline_support,
        reviews_pictures: this.reviews_pictures,
        FAQs_pictures: this.FAQs_pictures,
        more_pictures: this.more_pictures,
      });

      this.$toast.success("Product/service published successfully.");

      this.$router.push("/business-directory/create-directory-product");
    } catch (e) {
      this.error = e.response;
      this.$toast.info("Not Published.");
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
  width: 80vw;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
}

form,
textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}

#title,
#slug {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  max-height: 60px;
  width: 99%;
  margin-bottom: 5px;
  margin-top: 5px;
}

#description {
  max-height: 300px;
}

#body {
  min-height: 700px;
}

#title,
#slug,
#description,
#body {
  padding: 2px;
}

@media screen and (max-width: 700px) {
}
</style>
