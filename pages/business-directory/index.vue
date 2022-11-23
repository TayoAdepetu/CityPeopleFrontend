<template>
    <div>
      <div class="posts-container">
    
      <div v-for="directory in directories" :key="directory.id" id="before-headlines">
           
              <NuxtLink :to="`/business-directory/${directory.user.business_name_slug}`">
                <div class="list-description">
                  <h2>
                  {{directory.user.business_name}}
                  </h2>
                <div class="list-detail">
                  <p><span class="list-contact">Location:</span> {{directory.location}}</p>
                  <p><span class="list-contact">Email:</span> {{directory.user.email}}</p>
                    <p><span class="list-contact">Phone:</span> {{directory.user.phone_number}}</p>
                      <p><span class="list-contact">Website:</span> {{directory.website}}</p>
                </div>
                </div>           
              </NuxtLink>
        
            
      </div>
    
      </div>
  
    </div>
    </template>
    
    <script scoped>
    
    export default { 
    auth: false,
      data() {
        return {
          directories: [],
        }
      },
    
      methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
    
        async getDirectories(){
          try {
            const { data } = await this.$axios.get(`/api/auth/all-biz`);
            this.directories = data
            return true; 
          } catch (error) {
            this.loading = false;
           console.log(error.response)
            this.$toast.error(error.response.data.error);
          }
        },
      },
    
      created() {
        this.getDirectories();
      },
    
     
    }
    
    </script>
    
    <style scoped>
    .list-detail{
      display:flex;
      justify-content: space-between;
    }
      
    .list-description {
      border: 2px solid #036;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #F7F5F4;
      margin-bottom: 3px !important;
      text-align: left;

  }

  .list-contact{
    font-weight: bold;

  }
    
    @media screen and (max-width: 700px) {
      
    }
    </style>