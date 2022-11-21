<template>
    <div>
      <div>
        <nuxt-link to="/business-directory/create-directory-product">Add More Products</nuxt-link>
      </div>
        <div>
    <thead>
      <tr>
        <th class="text-left">S/N</th>
        <th class="text-left">Product Name</th>
        <th class="text-left">Description</th>
        <th class="text-left">Price</th>
        <th class="text-left">Location</th>
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
          {{ job.product_name }}
        </td>       
        <td>
          {{ job.description }}
        </td>
        <td>
            {{ job.price }}
        </td>
        <td>            
          {{ job.location }}
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
            <input type="text" v-model="selectedPost.product_name" class="form-control" id="slug">
          </div>

          <div class="form-group">
            <input type="text" v-model="selectedPost.price" class="form-control" id="slug" required>
          </div>
          
          <div class="form-group">
            <input type="text" v-model="selectedPost.biz_location" class="form-control" id="slug" required>
          </div>

          <div class="form-group">
            <textarea type="text" v-model="selectedPost.description" class="form-control" id="description" required></textarea>
          </div>
          
          <!--
          <div class="custom-file mb-3">
            <label class="custom-file-label" >Add images...</label>
            <input type="file" v-on:change="onFileChange" class="custom-file-input" id="image">
            
          </div>
          -->
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
    Delete <span class="deletepost">{{ selectedPost.product_name }}</span>
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
    middleware:'iscommenter',
    data() {
      return {
        jobs: [],
        updateJobModal: false,
        deleteJobModal: false,
                loading: false,
                selectedPost:{
                      id: '',
                      product_name: '',
                      product_name_slug:'',
                      description: '',
                      price:'',
                      biz_location: '',      
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
  
    async getJobs(context) 
    {
        try {
          const { data } = await this.$axios.get(`/api/auth/products/${context.params.slug}`);
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
      this.selectedPost.product_name = job.product_name
      this.selectedPost.id = job.id
      this.selectedPost.product_name_slug = job.product_name_slug
      this.selectedPost.description = job.description
      this.selectedPost.price = job.price
      this.selectedPost.biz_location = job.biz_location
  
      this.updateJobModal = true;
      
    },
  
    
    deleteJobModal(job) 
      {
      this.selectedPost.product_name = job.product_name
      this.selectedPost.id = job.id
      this.selectedPost.product_name_slug = job.product_name_slug
      this.selectedPost.description = job.description
      this.selectedPost.price = job.price
      this.selectedPost.biz_location = job.biz_location

  
      this.deleteJobModal = true;
      
    },
  
    async editPost() 
     {
     this.loading = true
  
    const { data } = await this.$axios.put(`/api/auth/update-post/${this.selectedPost.product_name_slug}`, 
    {product_name: this.selectedPost.product_name,
     description: this.selectedPost.description,
     price: this.selectedPost.price,
     biz_location: this.selectedPost.biz_location,});
  
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
        await this.$axios.post(`/api/auth/delete-post/${this.selectedPost.product_name_slug}`);
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