<template>
  <div class="container">
    <h2>Upload Your Products (This step is optional)</h2>
    <p>Step 5 of 5</p>

    <h3>
      No More Products or Services? Preview Your
      <span
        ><nuxt-link
          :to="`/business-directory/${this.$auth.user.business_name_slug}`"
          >Business Profile</nuxt-link
        ></span
      >
    </h3>

    <form @submit.prevent="createDirectoryProduct">
      <input hidden type="" :value="user_id" />

      <!--
        <div class="form-group">
          <input type="text" hidden v-model="product_name_slug" class="form-control" id="slug">
        </div>

        -->

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
          v-model="biz_location"
          class="form-control"
          id="title"
          placeholder="Add your business location"
        />
      </div>

      <div class="form-group">
        <textarea
          type="text"
          v-model="description"
          class="form-control"
          id="description"
          placeholder="Describe the product"
          required
        ></textarea>
      </div>

      <di>
        <div class="image-section">
          Add Relevant Product/Service Images (Maximum of 5 images)
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
      //product_name_slug: '',
      description: "",
      price: "",
      biz_location: "",
      images: [],
      pictures: [],
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
      }

      /*
      let image = e.target.files;
      console.log(image);

      for (let i = 0; i < image.lenght; i++) {
        if (i < 5) {
          if (image[i].type.match("image.*")) {
            let reader = new FileReader();
            reader.readAsDataURL(image[i]);

            reader.onloadend = (e) => {
              this.imagepiece = reader.result;
              console.log(this.imagepiece);
              this.images.push(this.imagepiece);
            };
          } else {
            return this.$toast.info("File reader not created.");
          }
        } else {
          return this.$toast.info("Image should not be more than five.");
        }
      }
      */
    },

    /*
      Object.keys(image).forEach((picture, index) => {
        console.log(picture);
        console.log(index);
        if (index < 5) {
          return this.$toast.info("Image should not be more than five.");
        }
        let reader = new FileReader();

        if (picture && picture.type.match("image.*")) {
        reader.readAsDataURL(picture);

        reader.onloadend = (e) => {
          let imagepiece = reader.result;
          this.images.push(imagepiece);
          };
        };
      }
      */

    async createDirectoryProduct() {
      try {
        await this.$axios.post(`/api/auth/create-directory-product`, {
          product_name: this.product_name,
          //product_name_slug: this.product_name.replace(/ +/g, "-"),
          description: this.description,
          price: this.price,
          location: this.biz_location,
          user_id: this.$auth.user.id,
          images: this.images,
        });

        this.$toast.success("Product/service published successfully.");

        this.$router.push("/business-directory/create-directory-product");
      } catch (e) {
        this.error = e.response;
        this.$toast.info("Not Published.");
      }
    },
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

.btn {
  background-color: var(--red);
  padding: 16px;
  color: #036;
  border: none;
  width: 100%;
  margin: auto;
  font-weight: bolder;
  font-size: 20px;
}

.btn:hover {
  opacity: 0.9;
}

@media screen and (max-width: 700px) {
}
</style>
