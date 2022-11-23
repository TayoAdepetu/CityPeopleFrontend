<template>
    <div>
      <div class="directory-container">
    
      <div v-for="directory in directories" :key="directory.id" class="before-directory-headlines">
           
              <NuxtLink :to="`/business-directory/${directory.user.business_name_slug}`">
                <div class="list-description">
                  <h2 class="biz-header">
                  {{directory.user.business_name}}
                  </h2>
                <div class="list-detail">
                  <p><span class="list-contact">Location:</span> {{directory.location}}</p>
                  <p><span class="list-contact">Phone:</span> {{directory.user.phone_number}}</p>
                  <p><span class="list-contact">Email:</span> {{directory.user.email}}</p>
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
      display:grid;
      grid-template-columns: auto auto;
      justify-content: space-around;
      grid-column-gap: 2.5%;
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

  .directory-container{
    max-width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .before-directory-headlines{
    max-width:90%;
    margin-right: auto;
    margin-left: auto;
  }

  .biz-header{
    text-align: center;
    margin-bottom: 4px;
  }
    
    @media screen and (max-width: 1000px) {
      .list-description{
        display: block;
      }

      .list-detail{
        display: block;
      }
    }
    </style>