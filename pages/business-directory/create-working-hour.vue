<template>
    <div class="container">
      <form @submit.prevent="createDirectory">

       <input hidden type="" :value="user_id">
        <div class="form-group">
          <textarea hidden v-model="business_name" class="form-control" id="title" placeholder="Enter business_name"></textarea>
        </div>

        <div class="form-group">
          <input type="text" hidden v-model="business_name_slug" class="form-control" id="slug">
        </div>

        <div class="form-group">
          <textarea v-model="monday" class="form-control" id="title" placeholder="Enter opening and closing time for Monday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="tuesday" class="form-control" id="title" placeholder="Enter opening and closing time for tuesday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="wednesday" class="form-control" id="title" placeholder="Enter opening and closing time for wednesday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="thursday" class="form-control" id="title" placeholder="Enter opening and closing time for thursday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="friday" class="form-control" id="title" placeholder="Enter opening and closing time for friday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="saturday" class="form-control" id="title" placeholder="Enter opening and closing time for saturday. e.g. 8am - 6pm" required></textarea>
        </div>

        <div class="form-group">
          <textarea v-model="sunday" class="form-control" id="title" placeholder="Enter opening and closing time for sunday. e.g. 8am - 6pm" required></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary block">
          Publish
        </button>
      </form>
    </div>
  </template>

<script>
//import Notification from '~/components/Notification'

export default {
  middleware: 'iscommenter',
  layout: "admin",
  data() {
    return {
      user_id: '',
      business_name: '',
      business_name_slug: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      error: null
    }
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
          user_id: this.$auth.user.user_id,
        })

        this.$router.push('/business-directory')
      } catch (e) {
        this.error = e.response
      }
    },
  }
}
</script>

<style scoped>
form, textarea {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  width: 99%;
}

#title, #slug {
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

#title, #slug, #description, #body {
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

     .btn:hover{

        opacity: 0.9;
     }


@media screen and (max-width: 700px) {
 
}

</style>