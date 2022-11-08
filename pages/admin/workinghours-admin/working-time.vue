<template>
    <div>
        <div>
    <thead>
      <tr>
        <th class="text-left">S/N</th>
        <th class="text-left">Business Name</th>
        <th class="text-left">Monday</th>
        <th class="text-left">Tuesday</th>
        <th class="text-left">Wednesday</th>
        <th class="text-left">Thursday</th>
        <th class="text-left">Friday</th>
        <th class="text-left">Saturday</th>
        <th class="text-left">Sunday</th>
        <th class="text-left">Date</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="detailRow"
        v-for="(job, index) in jobs"
        :key="job.id"
      >
        <td>
          {{ index+1 }}
        </td>
        <td>
          {{ job.business_name }}
        </td>       
        <td>
          {{ job.monday }}
        </td>
        <td>
            {{ job.tuesday }}
        </td>
        <td>            
          {{ job.wednesday }}  
        </td> 
        <td>            
          {{ job.thursday }}  
        </td> 
        <td>            
          {{ job.friday }}  
        </td> 
        <td>            
          {{ job.saturday }}  
        </td>
        <td>            
          {{ job.sunday }}  
        </td>  
        <td>
          {{ getDate(job.created_at) }}
        </td>   
       <td class="action">       
        <v-btn class="findBtn mb-4 mt-3 fullWidth"
        @click="openJobModal(job)"
        scrollable>
        Edit
        </v-btn>
        <v-btn class="greyBtn mx-3 my-1"
                @click="deleteJobModal(job)"
              >
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
  <form @submit.prevent="editPost()" class="selectBank normalInput2 fullWidth form-control mt-2">         
  
      <div>
        <div class="form-group">
            <input type="text" v-model="selectedPost.business_name" class="form-control" id="slug">
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.monday" class="form-control" id="slug" required>
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.tuesday" class="form-control" id="slug" required>
          </div>
          
          <div class="form-group">
            <input type="text" v-model="selectedPost.wednesday" class="form-control" id="slug" required>
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.thursday" class="form-control" id="slug" required>
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.friday" class="form-control" id="slug" required>
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.saturday" class="form-control" id="slug" required>
          </div>
          
          <div class="form-group">
            <input type="text" v-model="selectedPost.sunday" class="form-control" id="slug" required>
          </div>

          <div class="flex justifyCenter mobileColumn">
              <v-btn type="submit" class="greyBtn mx-3 my-1">
                Update
              </v-btn>
              
            </div>
        </div>
        </form>  
        <div class="flex justifyCenter mobileColumn">
                <v-btn text 
                @click="() => {
                  this.updateJobModal = false;
                }"
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
    Delete <span class="deletepost">{{ selectedPost.business_name }}</span>
    </h3>
     
          <div class="flex justifyCenter mobileColumn">
            <v-btn text 
            @click="deleteJob()"
          >
            Delete
          </v-btn>
        </div>
        <div class="flex justifyCenter mobileColumn">
                <v-btn text 
                @click="() => {
                  this.deleteJobModal = false;
                }"
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
  
    data() {
      return {
        jobs: [],
        updateJobModal: false,
        deleteJobModal: false,
                loading: false,
                selectedPost:{
                      id: '', 
                      business_name: '',
                      business_name_slug: '',
                      monday: '',
                      tuesday: '',
                      wednesday: '',
                      thursday: '',
                      friday: '',
                      saturday: '',
                      sunday: '',   
      },
      error: '',
    }
  },
  
    methods: {
  
        getDate(datetime) 
      {
        let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
        return date;
    },
  
    async getJobs() 
    {
        try {
          const { data } = await this.$axios.get(`/api/auth/worktime-admin`);
          this.jobs = data.data
          return true; 
        } catch (error) {
          this.loading = false;
         console.log(error.response)
          this.$toast.error(error.response.data.error)
        }
    },
  
    openJobModal(job) 
      {
      this.selectedPost.business_name = job.business_name
      this.selectedPost.business_name_slug = job.business_name_slug
      this.selectedPost.id = job.id
      this.selectedPost.monday = job.monday
      this.selectedPost.tuesday = job.tuesday
      this.selectedPost.wednesday = job.wednesday
      this.selectedPost.thursday = job.thursday
      this.selectedPost.friday = job.friday
      this.selectedPost.saturday = job.saturday
      this.selectedPost.sunday = job.sunday
      
      this.updateJobModal = true;
      
    },
  
    
    deleteJobModal(job) 
      {
      this.selectedPost.business_name = job.business_name
      this.selectedPost.business_name_slug = job.business_name_slug
      this.selectedPost.id = job.id
      this.selectedPost.monday = job.monday
      this.selectedPost.tuesday = job.tuesday
      this.selectedPost.wednesday = job.wednesday
      this.selectedPost.thursday = job.thursday
      this.selectedPost.friday = job.friday
      this.selectedPost.saturday = job.saturday
      this.selectedPost.sunday = job.sunday
  
      this.deleteJobModal = true;
      
    },
  
    async editPost() 
     {
     this.loading = true
  
    const { data } = await this.$axios.put(`/api/auth/update-worktime/${this.selectedPost.business_name_slug}`, 
    {monday: this.selectedPost.monday,
     tuesday: this.selectedPost.tuesday,
     wednesday: this.selectedPost.wednesday,
     thursday: this.selectedPost.thursday,
     friday: this.selectedPost.friday,
     saturday: this.selectedPost.saturday,
     sunday: this.selectedPost.sunday});
  
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
  
      async deleteJob()
      {
        await this.$axios.post(`/api/auth/delete-worktime/${this.selectedPost.business_name_slug}`);
        this.deleteJobModal = false;
        this.getJobs();
  
      }
  
      },
  
    created() 
    {
      this.getJobs();
    }
  
   
  }
  
  </script>
  
  <<style scoped>
  form, .fordeleteback{
    background-color: lightgreen;
  }
  
  .action{
    display: flex;
    margin-left: 5px;
  }
  
  
  form, textarea {
    border: 2px;
    border-style: solid;
    border-radius: 2px;
    width: 90%;
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
  
  .dialog-box{
    width: 80%;
  }
  
  .eletepost{
    color: #c20017;
  }
  @media screen and (max-width: 700px) {
   
  }
  </style>