<template>
    <div>
      <div class="secrets-container">
    
      <div v-for="secret in secrets" :key="secret.id" class="before-secret-headline">
              <NuxtLink :to="`/secret-anonymous/${secret.slug}`">
                  
                  <div class='secrets-container'>
                    <h3 class="secret-title"> {{ secret.title }} </h3>
                    <p> {{ secret.description }} </p>      
                    <div>
                       <div> <span class="secret-author-date"> Posted:</span> {{getDate(secret.created_at)}}</div>
                    </div>
                  
                </div>             
              </NuxtLink>            
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

    <<style scoped>
    .secrets-container{
      display: block;
      text-align: left;
    }

    .before-secret-headline{
      margin-bottom: 20px;
      border-width: 2px;
      border-style: solid;
      border-color: #c20017;
      padding: 10px;
    }

    .secret-author-date{
      font-weight: bold;
    }
    </style>