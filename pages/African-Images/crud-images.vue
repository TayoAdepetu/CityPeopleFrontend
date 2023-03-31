<template>
  <div>
    <div>
      <thead>
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Category</th>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Date</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="detailRow" v-for="(image, index) in images" :key="image.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ image.category_id }}
          </td>
          <td>
            {{ image.name }}
          </td>
          <td>
            {{ image.description }}
          </td>
          <td>
            {{ getDate(image.created_at) }}
          </td>
          <td class="action">
            <v-btn
              class="findBtn mb-4 mt-3 fullWidth"
              @click="openStatusModal(image)"
              scrollable
            >
              Edit
            </v-btn>
            <v-btn class="greyBtn mx-3 my-1" @click="deleteStatusModal(image)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
      <div class="dialog-box">
        <v-dialog
          v-model="updateStatusModal"
          persistent
          transition="dialog-top-transition"
        >
          <form
            @submit.prevent="editPost()"
            class="selectBank normalInput2 fullWidth form-control mt-2"
          >
            <div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.image_name"
                  class="form-control"
                  id="slug"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.image_description"
                  class="form-control"
                  id="slug"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div class="form-group">
                <select v-model="category_id" id="slug">
                  <option :value="undefined">Pick a Category 👇</option>
                  <option
                    v-for="image_category in image_categories"
                    :key="image_category.id"
                    :value="image_category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="flex justifyCenter mobileColumn">
                <v-btn type="submit" class="greyBtn mx-3 my-1"> Update </v-btn>
              </div>
            </div>
          </form>
          <div class="flex justifyCenter mobileColumn">
            <v-btn
              text
              @click="
                () => {
                  this.updateStatusModal = false;
                }
              "
            >
              Cancel
            </v-btn>
          </div>
        </v-dialog>
      </div>

      <div class="dialog-box">
        <v-dialog
          v-model="deletePostModal"
          persistent
          transition="dialog-top-transition"
        >
          <div class="fordeleteback">
            <h3 class="darkGreyColor textCenter">
              Delete
              <span class="deletepost">{{ selectedPost.image_name }}</span>
            </h3>

            <div class="flex justifyCenter mobileColumn">
              <v-btn text @click="deletePost()"> Delete </v-btn>
            </div>
            <div class="flex justifyCenter mobileColumn">
              <v-btn
                text
                @click="
                  () => {
                    this.deletePostModal = false;
                  }
                "
              >
                Cancel
              </v-btn>
            </div>
          </div>
        </v-dialog>
      </div>
    </div>
    <div class="pagination">
      <button class="paginate" @click.prevent="moveBack()">Previous List</button
      ><button class="paginate" @click.prevent="moveFront()">Next List</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isadmin",
  layout: "admin",
  data() {
    return {
      image_categories: [],
      image_name: "",
      images: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      updateStatusModal: false,
      deletePostModal: false,
      loading: false,
      selectedPost: {
        image_name: "",
        image_description: "",
        photo_id: null,
        location: "",
        id: null,
        category_id: null,
      },
    };
  },

  methods: {
    async getAllCategories() {
      try {
        const { data } = await this.$axios.get("/api/auth/fetch-categories");
        if (data && data.data) {
          this.image_categories = data.data;
          // console.log(data.data)
          return image_categories;
        }
      } catch (error) {
        this.loading = false;
        // console.log(error.response)
        this.$toast.error(error.response.data.error);
      }
    },

    async getAllImages(page) {
      page = page || "fetch-afri-images?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        if (data && data.data) {
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
        }
      } catch (error) {
        this.loading = false;
        // console.log(error.response)
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

    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    openStatusModal(image) {
      this.selectedPost.image_name = image.name;
      this.selectedPost.image_description = image.image_description;
      this.selectedPost.category_id = image.category_id;
      this.selectedPost.id = image.id;
      this.selectedPost.photo_id = image.photo_id;
      this.selectedPost.location = image.image_path;

      this.updateStatusModal = true;
    },

    deleteStatusModal(image) {
      this.selectedPost.image_name = image.name;
      this.selectedPost.image_description = image.image_description;
      this.selectedPost.category = image.category_id;
      this.selectedPost.id = image.id;
      this.selectedPost.photo_id = image.photo_id;
      this.selectedPost.location = image.image_path;

      this.deletePostModal = true;
    },

    async editPost() {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/update-categories/${this.selectedPost.id}`,
        {
          image_name: this.selectedPost.image_name,
          image_description: this.selectedPost.image_description,
          category_id: this.selectedPost.category_id,
          id: this.selectedPost.id,
          photo_id: this.selectedPost.photo_id,
          location: this.selectedPost.location,
        }
      );

      this.loading = false;
      this.updateStatusModal = false;
      // reset form
      this.$router.push(`/admin/published-articles/categories`);
    },

    async deletePost() {
      await this.$axios.post(
        `/api/auth/delete-categories/${this.selectedPost.id}`
      );
      this.deleteStatusModal = false;
      this.getPosts();
    },
  },

  mounted() {
    this.getAllCategories();
    this.getAllImages();
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
</style>
