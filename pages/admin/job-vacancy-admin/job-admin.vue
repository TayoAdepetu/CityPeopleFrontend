<template>
  <div>
    <div>
      <thead>
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Title</th>
          <th class="text-left">Description</th>
          <th class="text-left">Slug</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Salary</th>
          <th class="text-left">Location</th>
          <th class="text-left">Function</th>
          <th class="text-left">Date</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="detailRow" v-for="(job, index) in jobs" :key="job.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ job.title }}
          </td>
          <td>
            {{ job.description }}
          </td>

          <td>
            {{ job.title_slug }}
          </td>
          <td>
            {{ job.phone }}
          </td>
          <td>
            {{ job.salary }}
          </td>
          <td>
            {{ job.location }}
          </td>
          <td>
            {{ job.function }}
          </td>
          <td>
            {{ getDate(job.created_at) }}
          </td>
          <td class="action">
            <v-btn
              class="findBtn mb-4 mt-3 fullWidth"
              @click="openJobModal(job)"
              scrollable
            >
              Edit
            </v-btn>
            <v-btn class="greyBtn mx-3 my-1" @click="deleteJobModal(job)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
      <div class="dialog-box">
        <v-dialog
          v-model="updateJobModal"
          persistent
          transition="dialog-top-transition"
        >
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
                ></textarea>
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.title_slug"
                  class="form-control"
                  id="slug"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.salary"
                  class="form-control"
                  id="slug"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.location"
                  class="form-control"
                  id="slug"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.function"
                  class="form-control"
                  id="slug"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.phone"
                  class="form-control"
                  id="slug"
                  required
                />
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

              <!--
          <div class="custom-file mb-3">
            <label class="custom-file-label" >Add images...</label>
            <input type="file" v-on:change="onFileChange" class="custom-file-input" id="image">
            
          </div>
          -->
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
                  this.updateJobModal = false;
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
          v-model="deleteJobModal"
          persistent
          transition="dialog-top-transition"
        >
          <div class="fordeleteback">
            <h3 class="darkGreyColor textCenter">
              Delete <span class="deletepost">{{ selectedPost.title }}</span>
            </h3>

            <div class="flex justifyCenter mobileColumn">
              <v-btn text @click="deleteJob()"> Delete </v-btn>
            </div>
            <div class="flex justifyCenter mobileColumn">
              <v-btn
                text
                @click="
                  () => {
                    this.deleteJobModal = false;
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
      jobs: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      updateJobModal: false,
      deleteJobModal: false,
      loading: false,
      selectedPost: {
        title: "",
        title_slug: "",
        description: "",
        phone: "",
        salary: "",
        location: "",
        function: "",
      },
      error: "",
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getJobs(page) {
      page = page || "more-jobs?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.jobs = data.data;
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

    openJobModal(job) {
      this.selectedPost.title = job.title;
      this.selectedPost.id = job.id;
      this.selectedPost.title_slug = job.title_slug;
      this.selectedPost.description = job.description;
      this.selectedPost.salary = job.salary;
      this.selectedPost.phone = job.phone;
      this.selectedPost.location = job.location;
      this.selectedPost.function = job.function;

      this.updateJobModal = true;
    },

    deleteJobModal(job) {
      this.selectedPost.title = job.title;
      this.selectedPost.id = job.id;
      this.selectedPost.title_slug = job.title_slug;
      this.selectedPost.description = job.description;
      this.selectedPost.phone = job.phone;
      this.selectedPost.salary = job.salary;
      this.selectedPost.location = job.location;
      this.selectedPost.function = job.function;

      this.deleteJobModal = true;
    },

    async editPost() {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/update-post/${this.selectedPost.slug}`,
        {
          title: this.selectedPost.title,
          title_slug: this.selectedPost.title_slug,
          description: this.selectedPost.description,
          phone: this.selectedPost.phone,
          salary: this.selectedPost.salary,
          function: this.selectedPost.function,
          location: this.selectedPost.location,
        }
      );

      this.loading = false;
      this.updateJobModal = false;
      // reset form
      this.getJobs();
      this.$router.push(`/${this.selectedPost.title_slug}`);
    },

    /*
      async asyncData(context) {
        let response = await context.$axios.post(`/api/auth/delete-post/${context.selectedPost.slug}`);
        this.getJobs();
      },
  
      */

    async deleteJob() {
      await this.$axios.post(
        `/api/auth/delete-post/${this.selectedPost.title_slug}`
      );
      this.deleteJobModal = false;
      this.getJobs();
    },
  },

  created() {
    this.getJobs();
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
