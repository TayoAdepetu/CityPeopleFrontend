<template>
    <div class="container">
      <h2>Provide More Details About Your Business (This step is compulsory)</h2>
      <p>Step 2 of 5</p>
      <form @submit.prevent="createDirectory">

       <input hidden type="" :value="user_id">

        <div class="form-group">
          <textarea type="text" v-model="description" class="form-control" id="description" placeholder="Describe your business" required></textarea>
        </div>
        
        <div class="form-group">
            <input type="text" v-model="website" placeholder="Enter to your business website">
        </div>

        <div class="form-group">
            <input type="text" v-model="established" placeholder="Add date your business was established">
        </div>
        <div class="form-group">
            <input type="text" v-model="location" placeholder="Add your business location">
        </div>
        <div class="form-group">
            <input type="text" v-model="number_of_employees" placeholder="Add the number of employees in your firm">
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
  middleware:'iscommenter',
  layout: "admin",
  data() {
    return {
      description: '',
      //image: null,
      website: '',
      established: '',
      location: '',
      user_id: '',
      number_of_employees: '',
      error: null
    }
  },

  methods: {
  async createDirectory() {
      try {
        await this.$axios.post(`/api/auth/create-directory`, {
          user_id: this.$auth.user.id,
          description: this.description,
          website: this.website,
          location: this.location,
          established: this.established,
          number_of_employees: this.number_of_employees,
          //image: this.onFileChange()
        })

        this.$router.push('/business-directory/create-working-hour')
      } catch (e) {
        this.error = e.response
      }
    },

    /*
  onFileChange(e) {
  var image = e.target.files || e.dataTransfer.files;
  return this.image;
},

*/
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