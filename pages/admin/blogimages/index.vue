<template>
  <div>
    <div class="container">
      <!--Display all blog images like WordPress-->
      <div class="grid-container">
        <div v-for="image in images" :key="image.id" id="before-headlines">
          <!--<button @click="openStatusModal(image)">-->
          <img
            id="short-image"
            :src="image.image_path"
            :alt="image.image_name"
          />
          <!-- <div id="before-title">
          <h3 id="title">{{ image.image_name }}</h3>
        </div>
      -->
          <div id="short-body">
            <p id="short-paragraph">{{ image.image_name }}</p>
            <p id="short-paragraph">{{ selectedImage.image_description }}</p>
            <p id="short-paragraph">{{ selectedImage.image_path }}</p>
          </div>
          <!-- </button>-->
        </div>
      </div>
      <div class="pagination">
        <button class="paginate" @click.prevent="moveBack()">
          Previous List</button
        ><button class="paginate" @click.prevent="moveFront()">
          Next List
        </button>
      </div>
      <!--
    <div>
      <img :src="selectedImage.image_path" />
      <p>{{ selectedImage.image_name }}</p>
      <p>{{ selectedImage.image_description }}</p>
      <p>{{ selectedImage.image_path }}</p>
    </div>
  -->
      <button @click="closeImagesStatusModal()">Check Image Sources</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      images: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
      /*updateStatusModal: false,
      selectedImage: {
        image_name: "",
        image_description: "",
        photo_id: null,
        image_path: "",
        id: null,
        category_id: null,
      },
      */
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getImages(page) {
      page = page || "fetch-blog-images?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.images = data.data;
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

    /*
    openStatusModal(image) {
      this.selectedImage.image_name = this.image.name;
      this.selectedImage.image_description = this.image.image_description;
      //this.selectedImage.category_id = this.image.category_id;
      this.selectedImage.id = this.image.id;
      this.selectedImage.public_id = this.image.public_id;
      this.selectedImage.image_path = this.image.image_path;

      this.updateStatusModal = true;
    },
    */

    closeImagesStatusModal() {
      openImageModal = false;
      return;
    },
  },

  created() {
    this.getImages();
  },
};
</script>

<style scoped>
.paginate {
  width: 20%;
  padding: 3px;
  background-color: aqua;
}
.pagination {
  justify-content: space-between;
  display: flex;
  gap: 2px;
  margin: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 2.5%;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
}

#before-headlines {
  margin-bottom: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: #c20017;
}

#short-body {
  margin-top: 1px;
}

#title {
  margin-bottom: 1px;
  color: #c20017;
}

#short-paragraph {
  width: auto;
  font-size: 14px;
  text-align: center;
  margin-left: 4px;
  margin-right: 4px;
}

#short-image {
  width: 100%;
  height: 220px;
  margin-top: 0px;
}

#author-date {
  display: flex;
  margin-bottom: 0;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: auto !important;
}

@media screen and (max-width: 1000px) {
  .grid-container {
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 700px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 60%;
  }
}

@media screen and (max-width: 500px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 80%;
  }
}

@media screen and (max-width: 360px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 90%;
  }
}
</style>
