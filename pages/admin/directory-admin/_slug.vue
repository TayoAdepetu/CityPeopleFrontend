<template>
  <div>
    <div>
      <div class="dropdown">
        <div class="dropbtn">
          Click here if you forgot to complete any of the five steps of the
          Business Directory process before:
        </div>
        <ul class="dropdown-content">
          <li>
            <nuxt-link to="business-directory/create-business-name"
              >Step 1: Business Name Creation</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="business-directory/create-directory"
              >Step 2: Basic Business Directory Details</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="business-directory/create-working-hours"
              >Step 3: Business Opening Hours</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="business-directory/create-faq"
              >Step 4: Business FAQs Creation</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="business-directory/create-directory-products"
              >Step 5: Upload Your Products/Services</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <div class="dropbtn">
          Click here if you only want to edit a particular information that you
          have provided before in any of the five steps:
        </div>
        <ul class="dropdown-content">
          <li>
            <nuxt-link
              :to="`business-directory/admin/directory-admin/${this.$auth.user.business_name_slug}`"
              >Step 2: Basic Business Directory Details</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              :to="`business-directory/admin/workinghours-admin/${this.$auth.user.business_name_slug}`"
              >Step 3: Business Opening Hours</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              :to="`business-directory/admin/published-faq/${this.$auth.user.business_name_slug}`"
              >Step 4: Business FAQs Creation</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              :to="`business-directory/admin/directory-product-admin/${this.$auth.user.business_name_slug}`"
              >Step 5: Upload Your Products/Services</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div>
      <thead>
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Business Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Email</th>
          <th class="text-left">Location</th>
          <th class="text-left">Website</th>
          <th class="text-left">Employees</th>
          <th class="text-left">Description</th>
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
            {{ job.business_name }}
          </td>
          <td>
            {{ job.phone }}
          </td>
          <td>
            {{ job.email }}
          </td>
          <td>
            {{ job.location }}
          </td>
          <td>
            {{ job.website }}
          </td>
          <td>
            {{ job.number_of_employees }}
          </td>
          <td>
            {{ job.description }}
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
                <input
                  type="tel"
                  v-model="selectedPost.phone"
                  placeholder="Add the phone number for buyers to contact"
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.location"
                  placeholder="Add your business location"
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.email"
                  placeholder="State responsibilities of the role"
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  v-model="selectedPost.website"
                  placeholder="State potential salary"
                />
              </div>

              <div class="form-group">
                <input
                  type="number"
                  v-model="number_of_employees"
                  placeholder="Add the number of employees in your firm"
                />
              </div>

              <div class="form-group">
                <textarea
                  type="text"
                  v-model="selectedPost.description"
                  class="form-control"
                  id="description"
                  placeholder="Describe your business"
                  required
                ></textarea>
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
              <span class="deletepost">{{ selectedPost.business_name }}</span>
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
</template>

<script>
export default {
  middleware: "iscommenter",
  data() {
    return {
      jobs: [],
      updateJobModal: false,
      deleteJobModal: false,
      loading: false,
      selectedPost: {
        id: "",
        business_name: "",
        business_name_slug: "",
        description: "",
        website: "",
        email: "",
        phone: "",
        location: "",
        number_of_employees: "",
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
          `/api/auth/biz-directory/${context.params.slug}`
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
      this.selectedPost.business_name = job.business_name;
      this.selectedPost.business_name_slug = job.business_name_slug;
      this.selectedPost.id = job.id;
      this.selectedPost.description = job.description;
      this.selectedPost.phone = job.phone;
      this.selectedPost.location = job.location;
      this.selectedPost.number_of_employees = job.number_of_employees;
      this.selectedPost.website = job.website;
      this.selectedPost.email = job.email;

      this.updateJobModal = true;
    },

    deleteJobModal(job) {
      this.selectedPost.business_name = job.business_name;
      this.selectedPost.business_name_slug = job.business_name_slug;
      this.selectedPost.id = job.id;
      this.selectedPost.description = job.description;
      this.selectedPost.phone = job.phone;
      this.selectedPost.location = job.location;
      this.selectedPost.number_of_employees = job.number_of_employees;
      this.selectedPost.website = job.website;
      this.selectedPost.email = job.email;

      this.deleteJobModal = true;
    },

    async editPost() {
      this.loading = true;

      const { data } = await this.$axios.put(
        `/api/auth/update-directory/${this.selectedPost.business_name_slug}`,
        {
          phone: this.selectedPost.phone,
          email: this.selectedPost.email,
          location: this.selectedPost.location,
          description: this.selectedPost.description,
          website: this.selectedPost.website,
          number_of_employees: this.selectedPost.number_of_employees,
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
      await this.$axios.post(
        `/api/auth/delete-directory/${this.selectedPost.business_name_slug}`
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

.dropbtn {
  background-color: var(--teal);
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  margin-top: 30px;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content li {
  color: black;
  padding-top: 6px;
  padding-top: 3px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Change color of dropdown links on hover */
.dropdown-content li:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: var(--yellow);
}
@media screen and (max-width: 700px) {
}
</style>
