<template>
    <div>
      <div class="posts-container">
    
      <div v-for="directory in directories" :key="directory.id" id="before-headlines">
           
              <NuxtLink :to="`/business-directory/${directory.business_name_slug}`">
                <div>
                  {{directory.business_name}}
                  {{directory.email}}
                  {{directory.location}}
                  {{directory.phone}}
                  {{directory.website}}
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
    
      
    
    @media screen and (max-width: 700px) {
      
    }
    </style>