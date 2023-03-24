<template>
  <div class="container">
    <h3>Tell Us Your Opening and Closing Time (This step is compulsory)</h3>
    <p>Step 3 of 5</p>
    <form @submit.prevent="createWorkingHours">
      <input hidden type="" :value="user_id" />
      <div class="form-group">
        <input
          hidden
          v-model="business_name"
          class="form-control"
          id="title"
          placeholder="Enter business_name"
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          hidden
          v-model="business_name_slug"
          class="form-control"
          id="slug"
        />
      </div>

      <div class="form-group">
        <input
          v-model="monday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for Monday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="tuesday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for tuesday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="wednesday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for wednesday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="thursday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for thursday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="friday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for friday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="saturday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for saturday. e.g. 8am - 6pm or Closed"
          required
        />
      </div>

      <div class="form-group">
        <input
          v-model="sunday"
          class="form-control"
          id="title"
          placeholder="Enter opening and closing time for sunday. e.g. 8am - 6pm or Closed"
          required
          type="text"
        />
      </div>

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
      business_name: "",
      business_name_slug: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      error: null,
    };
  },

  methods: {
    async createWorkingHours() {
      try {
        await this.$axios.post(`/api/auth/create-new-worktime`, {
          business_name: this.$auth.user.business_name,
          business_name_slug: this.$auth.user.business_name_slug,
          monday: this.monday,
          tuesday: this.tuesday,
          wednesday: this.wednesday,
          thursday: this.thursday,
          friday: this.friday,
          saturday: this.saturday,
          sunday: this.sunday,
          user_id: this.$auth.user.id,
        });

        this.$router.push("/business-directory/create-faq");
      } catch (e) {
        this.error = e.response;
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
  margin-top: 100px;
  margin-right: auto;
  margin-left: auto;
}

form,
input {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
  min-height: 60px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
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
