<template>
  <!-- This is admin Page for business owners to manage Faqs section, delete, update-->
  <div class="container">
    <div>
      <div>
        <nuxt-link to="/business-directory/create-faq">Add More FAQs</nuxt-link>
      </div>
      <div>
        <thead>
          <tr>
            <th class="text-left">S/N</th>
            <th class="text-left">Question</th>
            <th class="text-left">Answer</th>
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
              {{ job.question }}
            </td>
            <td>
              {{ job.answer }}
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
                    v-model="selectedPost.question"
                    class="form-control"
                    id="title"
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <textarea
                    type="text"
                    v-model="selectedPost.answer"
                    class="form-control"
                    id="description"
                    required
                  ></textarea>
                </div>

                <div class="flex justifyCenter mobileColumn">
                  <v-btn type="submit" class="greyBtn mx-3 my-1">
                    Update
                  </v-btn>
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
                Delete
                <span class="deletepost">{{ selectedPost.question }}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  middleware: "iscommenter",
  layout: "admin",
  data() {
    return {
      jobs: [],
      updateJobModal: false,
      deleteJobModal: false,
      loading: false,
      selectedPost: {
        question: "",
        answer: "",
        id: "",
      },
      error: "",
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getJobs(context) {
      try {
        const { data } = await this.$axios.get(
          `/api/auth/all-faqs/${context.params.slug}`
        );
        this.jobs = data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    openJobModal(job) {
      this.selectedPost.question = job.question;
      this.selectedPost.id = job.id;
      this.selectedPost.answer = job.answer;

      this.updateJobModal = true;
    },

    deleteJobModal(job) {
      this.selectedPost.question = job.question;
      this.selectedPost.id = job.id;
      this.selectedPost.answer = job.answer;

      this.deleteJobModal = true;
    },

    async editPost() {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/update-faq/${this.selectedPost.id}`,
        {
          question: this.selectedPost.question,
          answer: this.selectedPost.answer,
        }
      );

      this.loading = false;
      this.updateJobModal = false;
      // reset form
      this.getJobs();
      this.$router.push(`/admin/dashboard`);
    },

    /*
      async asyncData(context) {
        let response = await context.$axios.post(`/api/auth/delete-post/${context.selectedPost.slug}`);
        this.getJobs();
      },
  
      */

    async deleteJob() {
      await this.$axios.post(`/api/auth/delete-faq/${this.selectedPost.id}`);
      this.deleteJobModal = false;
      this.getJobs();
    },
  },

  created() {
    this.getJobs();
  },
};
</script>

<style scoped>
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

.dialog-box {
  width: 80%;
}

.eletepost {
  color: #c20017;
}
@media screen and (max-width: 700px) {
}
</style>
