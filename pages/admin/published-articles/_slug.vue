<template>
    <div>
        <div>
    <thead>
      <tr>
        <th class="text-left">S/N</th>
        <th class="text-left">Title</th>
        <th class="text-left">Description</th>
        <th class="text-left">Slug</th>
        <th class="text-left">Image</th>
        <th class="text-left">Author</th>
        <th class="text-left">Date</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="detailRow"
        v-for="(post, index) in posts"
        :key="post.id"
      >
        <td>
          {{ index+1 }}
        </td>
        <td>
          {{ post.title }}
        </td>
        <td>
          {{ post.description }}
        </td>
       
        <td>
          {{ post.slug }}
        </td>
        <td>
            {{ post.image }}
        </td>
        <td>            
          {{ post.author }}  
        </td> 
        <td>
          {{ getDate(post.created_at) }}
        </td>   
       <td class="action">        
        <v-btn class="findBtn mb-4 mt-3 fullWidth"
        @click="openStatusModal(post)"
        scrollable>
        Edit
        </v-btn>
        <v-btn class="greyBtn mx-3 my-1"
                @click="deleteStatusModal(post)"
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
            <textarea v-model="selectedPost.title" class="form-control" id="title" placeholder="Enter title" required></textarea>
          </div>
  
          <div class="form-group">
            <input type="text" v-model="selectedPost.slug" class="form-control" id="slug" placeholder="Enter title" required>
          </div>
  
          <div class="form-group">
            <textarea type="text" v-model="selectedPost.description" class="form-control" id="description" placeholder="Enter title" required></textarea>
          </div>
          
          <div class="form-group">
            <textarea class="form-control" v-model="selectedPost.body" id="body" placeholder="Enter a body" rows="8" required></textarea>
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
    Delete <span class="deletepost">{{ selectedPost.title }}</span>
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
    </div>
  </template>
  
  <script>
  
  export default { 
  
    data() {
      return {
        posts: [],
        updateStatusModal: false,
        deletePostModal: false,
                loading: false,
                selectedPost:{
                    title: '',
                     slug: '',
                     description: '',
                     image: '',
                     author: '',
                      id: '',
                      body:'',
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
  
    async getPosts(context) 
    {
        try {
          const { data } = await this.$axios.get(`/api/auth/posts/${context.params.slug}`);
          this.posts = data.data
          return true; 
        } catch (error) {
          this.loading = false;
         console.log(error.response)
          this.$toast.error(error.response.data.error)
        }
    },
  
    openStatusModal(post) 
      {
      this.selectedPost.title = post.title
      this.selectedPost.id = post.id
      this.selectedPost.slug = post.slug
      this.selectedPost.description = post.description
      this.selectedPost.image = post.image
      this.selectedPost.author = post.author
      this.selectedPost.body = post.body
  
      this.updateStatusModal = true;
      
    },
  
    
    deleteStatusModal(post) 
      {
      this.selectedPost.title = post.title
      this.selectedPost.id = post.id
      this.selectedPost.slug = post.slug
      this.selectedPost.description = post.description
      this.selectedPost.image = post.image
      this.selectedPost.author = post.author
      this.selectedPost.body = post.body
  
      this.deletePostModal = true;
      
    },
  
    async editPost() 
     {
     this.loading = true
  
    const { data } = await this.$axios.put(`/api/auth/update-post/${this.selectedPost.slug}`, 
    {title: this.selectedPost.title,
     slug: this.selectedPost.slug,
     description: this.selectedPost.description,
     //image: this.selectedPost.image,
     //author: this.selectedPost.author,
     body: this.selectedPost.body,});
  
     this.loading = false;
     this.updateStatusModal = false;         
           // reset form
     this.getPosts();
     this.$router.push(`/${this.selectedPost.slug}`);
        
    },
  
      /*
      async asyncData(context) {
        let response = await context.$axios.post(`/api/auth/delete-post/${context.selectedPost.slug}`);
        this.getPosts();
      },
  
      */
  
      async deletePost()
      {
        await this.$axios.post(`/api/auth/delete-post/${this.selectedPost.slug}`);
        this.deleteStatusModal = false;
        this.getPosts();
  
      }
  
      },
  
    created() 
    {
      this.getPosts();
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