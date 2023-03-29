<template>
  <div>
    <!--edit each subsubject here-->
    <div>
      <form
        @submit.prevent="editPost()"
        class="selectBank normalInput2 fullWidth form-control mt-2"
      >
        <div>
          <div class="form-group">
            <textarea
              v-model="subsubject.subject_name"
              class="form-control"
              id="title"
              placeholder="Enter title"
              required
              type="text"
            ></textarea>
          </div>

          <div class="form-group">
            <textarea
              class="form-control"
              v-model="subsubject.slug"
              id="body"
              placeholder="Enter a body"
              rows="8"
              required
              type="text"
            ></textarea>
          </div>

          <div class="form-group">
            <textarea
              type="text"
              v-model="subsubject.description"
              class="form-control"
              id="description"
              placeholder="Enter title"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <textarea
              class="form-control"
              v-model="subsubject.body"
              id="body"
              placeholder="Enter a body"
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
      <div class="exclusive">
        <div class="flex justifyCenter mobileColumn">
          <v-btn @click="this.deleteSubsubjectModal = true"> Cancel </v-btn>
        </div>
        <div class="flex justifyCenter mobileColumn">
          <nuxt-link
            :to="`/admin/published-articles/create-subsubject/${subject.subject_name}`"
          >
            Create New Subsubject</nuxt-link
          >
        </div>
      </div>
    </div>

    <div class="dialog-box">
      <v-dialog
        v-model="deleteSubsubjectModal"
        persistent
        transition="dialog-top-transition"
      >
        <div class="fordeleteback">
          <h3 class="darkGreyColor textCenter">
            Delete
            <span class="deletepost">{{ selectedSubsubject.name }}?</span>
          </h3>

          <div class="flex justifyCenter mobileColumn">
            <v-btn text @click="deleteSubsubject()"> Delete </v-btn>
          </div>
          <div class="flex justifyCenter mobileColumn">
            <v-btn
              text
              @click="
                () => {
                  this.deleteSubsubjectModal = false;
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
</template>

<script>
export default {
  middleware: "ispublisher",
  layout: "admin",
  data() {
    return {
      deleteSubsubjectModal: false,
      subsubject: null,
      loading: false,
      subject_name: "",
      slug: "",
      description: "",
      subsubject_name: "",
      id: "",
      body: "",
      error: "",
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getSubsubject(context) {
      try {
        const { data } = await this.$axios.get(
          `/api/auth/fetch-subsubject/${context.params.slug}`
        );
        this.subsubject = data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },

    async editPost(context) {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/edit-subsubject/${context.params.slug}`,
        {
          subsubject_name: this.subsubject_name,
          slug: this.slug,
          description: this.description,
          body: this.body,
        }
      );

      this.loading = false;
      this.$router.push(
        `/nigerian-wiki/nigerian-knowledgebase${this.subject_name}`
      );
    },

    async deleteSubsubject(context) {
      await this.$axios.post(
        `/api/auth/delete-subsubject-posts/${context.params.slug}`
      );
      deleteSubsubjectModal = false;
      this.$router.push(
        `/nigerian-wiki/nigerian-knowledgebase${this.subject_name}`
      );
    },
  },

  created() {
    this.getSubsubject();
  },
};
</script>

<style scoped>
.exclusive {
  display: flex;
}

.image-section {
  margin-bottom: 6px;
  margin-top: 6px;
}
.picking {
  text-align: left;
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

.body {
  min-height: 700px;
}

#title,
#slug,
#description,
.body {
  padding: 2px;
}

@media screen and (max-width: 700px) {
}
</style>
