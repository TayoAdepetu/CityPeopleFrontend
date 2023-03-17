<template>
  <div>
    <!--
        <div>
      <form @submit="addCategory()">
        <input type="text" v-model="category_name">
        <button>Add Category</button>
      </form>
    </div>
    <div>
  <thead>
    <tr>
      <th class="text-left">S/N</th>
      <th class="text-left">Category</th>
      <th class="text-left">Date</th>
      <th class="text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr class="detailRow"
      v-for="(category, index) in categories"
      :key="category.id"
    >
      <td>
        {{ index+1 }}
      </td>
      <td>
        {{ category.name }}
      </td>
      <td>
        {{ getDate(category.created_at) }}
      </td>   
     <td class="action">        
      <v-btn class="findBtn mb-4 mt-3 fullWidth"
      @click="openStatusModal(category)"
      scrollable>
      Edit
      </v-btn>
      <v-btn class="greyBtn mx-3 my-1"
              @click="deleteStatusModal(category)"
            >
              Delete
            </v-btn>
    
      </td>
         
    </tr>
  </tbody>
<div class="dialog-box">

    <v-dialog
      v-model="updateStatusModal"
        
        persistent
        transition="dialog-top-transition"
      >
<form @submit.prevent="editPost()" class="selectBank normalInput2 fullWidth form-control mt-2">         

    <div>
        <div class="form-group">
          <input type="text" v-model="selectedPost.name" class="form-control" id="slug" placeholder="Enter title" required>
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
                this.updateStatusModal = false;
              }"
            >
              Cancel
            </v-btn>
          </div>
      </v-dialog>
  </div>


<div class="dialog-box">

<v-dialog
  v-model="deletePostModal"
    
    persistent
    transition="dialog-top-transition"
  >
<div class="fordeleteback">
  <h3 class="darkGreyColor textCenter">
  Delete <span class="deletepost">{{ selectedPost.name }}</span>
  </h3>
   
        <div class="flex justifyCenter mobileColumn">
          <v-btn text 
          @click="deletePost()"
        >
          Delete
        </v-btn>
      </div>
      <div class="flex justifyCenter mobileColumn">
              <v-btn text 
              @click="() => {
                this.deletePostModal = false;
              }"
            >
              Cancel
            </v-btn>
          </div>
      </div>
  </v-dialog>
</div>


  </div>
-->
  </div>
</template>

<script>
/*

export default {
    middleware:'isadmin',
    data() {
        return{
            category_name:'',
            categories:[],
            updateStatusModal: false,
      deletePostModal: false,
              loading: false,
              selectedPost:{
                  name: '',
    },
        }
        
    },

    methods: {

    async getAllCategories(){
      try {
        const { data } = await this.$axios.get('/api/auth/fetch-categories');
        if(data && data.data){
          this.categories = data.data
          // console.log(data.data)
          return true; 
        }
      } catch (error) {
        this.loading = false;
       // console.log(error.response)
        this.$toast.error(error.response.data.error);
      }
    },

    
    getDate(datetime) 
    {
      let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
      return date;
  },

    openStatusModal(category) 
    {
    this.selectedPost.name = category.name

    this.updateStatusModal = true;
    
  },

  
  deleteStatusModal(category) 
    {
    this.selectedPost.name = category.name

    this.deletePostModal = true;
    
  },

  async editPost() 
   {
   this.loading = true

  const { data } = await this.$axios.put(`/api/auth/update-categories/${this.selectedPost.id}`, 
  {name: this.selectedPost.name,});

   this.loading = false;
   this.updateStatusModal = false;         
         // reset form
   this.getPosts();
   this.$router.push(`/admin/published-articles/categories`);
      
  },

    async deletePost()
    {
      await this.$axios.post(`/api/auth/delete-categories/${this.selectedPost.id}`);
      this.deleteStatusModal = false;
      this.getPosts();

    },

    async addCategory() {
      try {
        await this.$axios.post(`/api/auth/create-categories`, {
          name: this.category_name,
        })

        //this.$router.push('/admin/published-articles/categories')
      } catch (e) {
        this.error = e.response
      }
    },

    },

}
*/
</script>
