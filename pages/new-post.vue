<template>
    <div>
      <div class="container">
        
        <form @submit.prevent="createPost" enctype="multipart/form-data">
          <nuxt-link to="/htmlcodes" target="_blank"><div class="btn">Check Component HTML Codes</div></nuxt-link>
  
        <input hidden type="" v-model="user_id">
         
        <textarea v-model="title" id="title" placeholder="Enter title" required></textarea>
  
            
        <input type="text" hidden v-model="slug" id="slug" placeholder="Enter title slug" >
  
        <textarea type="text" v-model="description" id="description" placeholder="Enter catchy description" required></textarea>
  
        <div class="picking">
        <select v-model="category_id" id="slug">
              <option :value="undefined">Pick a Category 👇</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
          
        <div class="image-section" v-if="!image">
    Select a Featured Image
    <input type="file" @change="onFileChange">
  </div>

  <div class="image-section" v-else>
    <img :src="image" />
    <button @click="removeImage">Remove image</button>
  </div>

  <hr>  
  <textarea v-model="body" id="body-text"></textarea>
  <hr>

</div>
          
        <button type="submit" class="btn btn-primary block">
            Publish
        </button>

        </form>
      </div>
    
    
    </div>
</template>


<script scoped>

export default {
  middleware: 'ispublisher',
  layout: "admin",
  data() {
    return {
      user_id:null,
      title: '',
      slug: '',
      description: '',
      category_id:undefined,
      image: null,
      body: '',
      categories:null,
      error: null
    }
  },

  methods: {
    async createPost() {
      try {
        await this.$axios.post(`/api/auth/create-new-post`, {
          title: this.title,
          slug: this.title.replace(/ +/g, '-'),
          description: this.description,
          body: this.body,
          category_id: this.category_id,
          user_id: this.$auth.user.id,
          image: this.image,
        })

        //this.$router.push('/admin/articles')
      } catch (e) {
        this.error = e.response
      }
    },

    onFileChange(e) {
         /*
        this.image = e.target.files[0];
    */
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
     
    },

    
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      
      reader.onload = (e) => {
        this.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },   

    removeImage: function (e) {
      this.image = '';
    },

    async getAllCategories(){
        const { data } = await this.$axios.get('/api/auth/category-admin');
          this.categories = data;
          return {categories}; 
     
    },
    
  },

  
  mounted() {
    this.getAllCategories();
  },
  
}
</script>

<style scoped>
.image-section{
  margin-bottom: 6px;
  margin-top: 6px;
}
.picking{
  text-align: left;
}
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

.body {
  min-height: 700px;
}

#title, #slug, #description, .body {
  padding: 2px;
}

.btn {
background-color: cornflowerblue;
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