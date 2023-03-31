<template>
  <div>
    <div class="container">
      <!--Dynamic page for individual subject articles fetched by ID. 
      Also, its subsubject is also displayed at the top-->
      <div
        class="subsuject-spacing"
        v-for="subsubject in subsubjects"
        :key="subsubject.id"
      >
        <span>{{ subsubject }}</span>
      </div>
      <div class="container">
        <div>
          <h1>{{ subject[0].title }}</h1>
          <img id="short-image" :src="post[0].image_path" />
          <div class="body" v-html="`${subject[0].body}`"></div>
        </div>
        <!--
      
      <p>
        By <span>{{ post[0].user.name }}</span> in
        <span>{{ post[0].category.name }}</span>
      </p>
      <p>
        Last Updated: <span>{{ getDate(post[0].updated_at) }}</span>
      </p>
      <div class="body" v-html="`${post[0].body}`"></div>
      -->

        <!--
    <div>
        <comments />
    </div>
    -->
        <div class="content-help-notice">
          <h3>
            Please, help us in expanding and maintaining the integrity of this
            Nigerian-People-and-Institutions Knowledge Base.
          </h3>

          <h4 class="first-h4">Here are ways you can help us:</h4>
          <p>
            Tell us the people or institutions you would want us to create web
            pages for on this website.
          </p>
          <p>
            Tell us about any wrong information about a person or insttitution
            that we might have mistakenly published on this website.
          </p>

          <h4>The Rules:</h4>
          <ul>
            <li>
              Please, if you're refuting any statement made about a person or
              institution, kindly share with us sources containing facts about
              the subject matter.
            </li>
          </ul>

          <div class="greet-last">Thanks, The CityPeople Team</div>
          <v-btn @click="openStatusModal(subsubject)" scrollable
            >Tell Us What You Think About The Content On This Page</v-btn
          >
        </div>

        <div class="dialog-box">
          <v-dialog
            v-model="updateStatusModal"
            persistent
            transition="dialog-top-transition"
          >
            <form
              @submit.prevent="submitComment()"
              class="selectBank normalInput2 fullWidth form-control mt-2"
            >
              <div>
                <div class="form-group">
                  <textarea
                    type="text"
                    v-model="selectedPost.subject_name"
                    class="form-control"
                    id="title"
                    placeholder="Enter title"
                    hidden
                  ></textarea>
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    v-model="selectedPost.id"
                    class="form-control"
                    id="description"
                    placeholder="Enter title"
                    hidden
                  />
                </div>

                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    v-model="comment"
                    id="body"
                    placeholder="Enter your comments on this content here"
                    rows="8"
                    required
                  ></textarea>
                </div>

                <div class="flex justifyCenter mobileColumn">
                  <v-btn type="submit" class="greyBtn mx-3 my-1">
                    Submit Comment
                  </v-btn>
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
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
      subject: null,
      subsubjects: [],
      updateStatusModal: false,
      content: "",
      selectedPost: {
        body: "",
        description: "",
        slug: "",
        id: null,
        subject_name: "",
      },
      error: null,
    };
  },

  async asyncData(context) {
    let response = await context.$axios.get(
      `/api/auth/blog/${context.params.slug}`
    );
    this.subject = response.data;
    return {
      subject,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },

  async fetchSubsubject(context) {
    let response = await context.$axios.get(
      `/api/auth/subsubject/${context.params.slug}`
    );
    let subsubjects = response.data;
    return {
      subsubjects,
    };
  },

  openStatusModal(subsubject) {
    //this.selectedPost.subsubject_name = this.subsubject_name;
    this.selectedPost.subject_name = this.subject.title;
    // this.selectedPost.id = this.subsubject.id;
    this.selectedPost.id = this.subject.id;
    // this.selectedPost.slug = this.subsubject.slug;
    this.selectedPost.slug = this.subject.slug;
    // this.selectedPost.description = this.subsubject.description;
    this.selectedPost.description = this.subject.description;
    //this.selectedPost.body = this.subsubject.body;
    this.selectedPost.body = this.subject.body;

    this.updateStatusModal = true;
  },

  async submitComment() {
    try {
      await this.$axios.post(`/api/auth/send-report-subject`, {
        content_comment: this.comment,
        content_id: this.selectedPost.id,
        subject_name: this.selectedPost.subject_name,
        email: "tayowrites93@gmail.com",
        //subsubject_name: this.selectedPost.subsubject_name,
      });

      this.$router.push(`/nigerian-wiki/${this.selectedPost.id}`);
    } catch (e) {
      this.error = e.response;
    }
  },
};
</script>
<style scoped>
.subsuject-spacing {
  justify-content: space-around;
}
.content-help-notice {
  text-align: left;
  text-align: justify;
  margin-top: 100px;
  border-style: solid;
  border-color: var(--yellow);
  border-radius: 5px;
  padding: 10px;
}

.greet-last,
.first-h4 {
  margin-top: 30px;
}

#short-image {
  width: 90vw;
  height: 350px;
}
.body {
  text-align: left !important;
  text-align: justify;
}

/*css for the description classes*/
.bold-span {
  font-weight: bold;
}

.italic-span {
  font-style: italic;
}

.image-dressing {
  width: 100vh;
  height: 400px;
}
</style>
