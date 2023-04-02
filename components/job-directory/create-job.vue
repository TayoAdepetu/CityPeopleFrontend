<template>
  <div class="container">
    <form @submit.prevent="createDirectory">
      <div>
        You must have registered your business on this platform before posting a
        job.
      </div>
      <input hidden type="" :value="user_id" />

      <input
        type="text"
        hidden
        v-model="business_name"
        class="form-control"
        id="slug"
      />

      <input
        type="text"
        hidden
        v-model="business_name_slug"
        class="form-control"
        id="slug"
      />

      <input
        type="text"
        v-model="title"
        id="slug"
        placeholder="Enter to the job title"
      />

      <input
        type="tel"
        v-model="phone"
        id="slug"
        placeholder="Add the phone number for buyers to contact"
      />

      <input
        type="text"
        id="slug"
        v-model="location"
        placeholder="Add your business location"
      />

      <input
        type="text"
        id="slug"
        v-model="role_function"
        placeholder="State responsibilities of the role"
      />

      <input
        type="text"
        id="slug"
        v-model="salary"
        placeholder="State potential salary"
      />

      <textarea
        type="text"
        v-model="description"
        class="form-control"
        id="description"
        placeholder="Describe your business"
        required
      ></textarea>

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
      user_id: "",
      business_name: "",
      business_name_slug: "",
      description: "",
      salary: "",
      role_function: "",
      phone: "",
      location: "",
      title: "",
      error: null,
    };
  },

  methods: {
    async createDirectory() {
      try {
        if (this.$auth.user.scope != "seller") {
          return this.$toast.info("Please, register your business first.");
        }

        await this.$axios.post(`/api/auth/create-new-job`, {
          business_name: this.$auth.user.business_name,
          business_name_slug: this.$auth.user.business_name_slug,
          title: this.title,
          job_slug: this.title.replace(/ +/g, "-"),
          salary: this.salary,
          phone: this.phone,
          location: this.location,
          function: this.role_function,
          description: this.description,
          user_id: this.$auth.user.id,
          //image: this.onFileChange()
        });

        this.$router.push("/job-vacancies");
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style scoped>
.image-section {
  margin-bottom: 6px;
  margin-top: 6px;
}
.picking {
  text-align: left;
}

#title,
.picking,
#slug,
textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  max-height: 60px;
  width: 99%;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
}

#description {
  min-height: 300px;
}

@media screen and (max-width: 700px) {
}
</style>
