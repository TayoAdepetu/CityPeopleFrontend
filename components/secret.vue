<template>
    <div>
      <div class="posts-container">
    
      <div v-for="secret in secrets" :key="secret.id" id="before-headlines">
            <div id="headlines">
              <NuxtLink :to="`/secret-anonymous/${secret.slug}`">
                  
                  <div>
                    <h3 id="title"> {{ secret.title }} </h3>
                    <p> {{ secret.description }} </p>      
                    <div id="author-date">
                       <div id="author"> <span> Posted: {{getDate(secret.created_at)}} </span></div>
                    </div>
                  
                </div>             
              </NuxtLink>
            </div>
            
      </div>
    
      </div>
    </div>
    </template>
    
    <script scoped>
    
    export default { 
    
      data() {
        return {
          secrets: [],
        }
      },
    
      methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
                
    
        async getSecrets(){
          try {
            const { data } = await this.$axios.get(`/api/auth/all-secrets`);
            this.secrets = data
            return true; 
          } catch (error) {
            this.loading = false;
           console.log(error.response)
            this.$toast.error(error.response.data.error);
          }
        },
      },
    
      created() {
        this.getSecrets();
      },
    
     
    }
    
    </script>