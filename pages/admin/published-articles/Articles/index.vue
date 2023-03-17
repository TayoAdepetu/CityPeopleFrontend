<template>
  <div>
    <!--first, admin gets display all main posts, each having buttons for editing and deletion. When you click edit,
    a list of all subsuject under that post is also shown. If you click on any of the subsubject, you go to
  the slug page that displays the subsubject using its ID. You can then edit the subsubject also.-->
    <div>
      <thead>
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Title</th>
          <th class="text-left">Description</th>
          <th class="text-left">Slug</th>
          <th class="text-left">Author</th>
          <th class="text-left">Image</th>
          <th class="text-left">Date</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="detailRow" v-for="(post, index) in posts" :key="post.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ post.title }}
          </td>
          <td>
            {{ post.description }}
          </td>

          <td>
            {{ post.slug }}
          </td>
          <td>
            {{ post.user.name }}
          </td>
          <td>
            {{ post.image_path }}
          </td>
          <td>
            {{ getDate(post.created_at) }}
          </td>
          <td class="action">
            <v-btn
              class="findBtn mb-4 mt-3 fullWidth"
              @click="openStatusModal(post)"
              scrollable
            >
              Edit
            </v-btn>
            <v-btn class="greyBtn mx-3 my-1" @click="deleteStatusModal(post)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </div>

    <div class="dialog-box">
      <v-dialog
        v-model="updateStatusModal"
        persistent
        transition="dialog-top-transition"
      >
        <div>
          <thead>
            <tr>
              <th class="text-left">S/N</th>
              <th class="text-left">Name</th>
              <th class="text-left">Post_Name</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="detailRow"
              v-for="subsubject in subsubjects"
              :key="subsubject.id"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ subsubject.name }}
              </td>
              <td>
                {{ subsubject.subject_name }}
              </td>
              <td class="action">
                <nuxt-link
                  :to="`/admin/published-articles/articles/${subsubject.id}`"
                >
                  Actions
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </div>

        <div>
          <form
            @submit.prevent="editPost()"
            class="selectBank normalInput2 fullWidth form-control mt-2"
          >
            <div>
              <div class="form-group">
                <textarea
                  v-model="selectedPost.title"
                  class="form-control"
                  id="title"
                  required
                  type="text"
                ></textarea>
              </div>

              <div class="form-group">
                <textarea
                  type="text"
                  v-model="selectedPost.description"
                  class="form-control"
                  id="description"
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <textarea
                  type="text"
                  v-model="selectedPost.image_path"
                  class="form-control"
                  id="description"
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <textarea
                  class="form-control"
                  v-model="selectedPost.body"
                  id="body"
                  rows="8"
                  required
                  type="text"
                ></textarea>
              </div>

              <div class="flex justifyCenter mobileColumn">
                <v-btn type="submit" class="greyBtn mx-3 my-1"> Update </v-btn>
              </div>
            </div>
          </form>
        </div>

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
            Delete <span class="deletepost">{{ selectedPost.title }}?</span>
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
    <div class="pagination">
      <button class="paginate" @click.prevent="moveBack()">Previous List</button
      ><button class="paginate" @click.prevent="moveFront()">Next List</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isadmin",
  data() {
    return {
      subsubjects: [],
      category_name: "",
      posts: [],
      updateStatusModal: false,
      updateSubsubjectModal: false,
      deletePostModal: false,
      deleteSubsubjectModal: false,
      loading: false,
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      selectedPost: {
        title: "",
        slug: "",
        description: "",
        author: "",
        id: "",
        body: "",
        image_path: "",
      },
      error: "",
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getPosts(page) {
      page = page || "more-posts?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.posts = data.data;
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

    openStatusModal(post) {
      this.selectedPost.title = this.post.title;
      this.selectedPost.id = this.post.id;
      this.selectedPost.slug = this.post.slug;
      this.selectedPost.description = this.post.description;
      this.selectedPost.author = this.post.author;
      this.selectedPost.body = this.post.body;
      this.selectedPost.image_path = this.post.image_path;

      this.updateStatusModal = true;
      this.fetchSubsubjectPosts();
    },

    deleteStatusModal(post) {
      this.selectedPost.title = this.post.title;
      this.selectedPost.id = this.post.id;
      this.selectedPost.slug = this.post.slug;
      this.selectedPost.description = this.post.description;
      this.selectedPost.author = this.post.author;
      this.selectedPost.body = this.post.body;
      this.selectedPost.image_path = this.post.image_path;

      this.deletePostModal = true;
    },

    async editPost() {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/update-post/${this.selectedPost.slug}`,
        {
          title: this.selectedPost.title,
          slug: this.selectedPost.title.replace(/ +/g, "-"),
          description: this.selectedPost.description,
          body: this.selectedPost.body,
          image_path: this.selectedPost.image_path,
        }
      );

      this.loading = false;
      this.updateStatusModal = false;
      // reset form
      this.getPosts();
      this.$router.push(`/${this.selectedPost.slug}`);
    },

    async deletePost() {
      await this.$axios.post(`/api/auth/delete-post/${this.selectedPost.slug}`);
      this.deleteStatusModal = false;
      this.getPosts();
    },

    async fetchSubsubjectPosts() {
      let response = await $axios.get(
        `/api/auth/fetch-subsubject-posts/${this.selectedPost.title}`
      );
      let subsubjects = response.data;
      return {
        subsubjects,
      };
    },
  },

  created() {
    this.getPosts();
  },
};
</script>

<
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

form,
.fordeleteback {
  background-color: lightgreen;
}

.action {
  display: flex;
  margin-left: 5px;
}

form,
textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 90%;
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
  background-color: #c20017;
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

.dialog-box {
  width: 80%;
}

.eletepost {
  color: #c20017;
}
@media screen and (max-width: 700px) {
}
</style>
