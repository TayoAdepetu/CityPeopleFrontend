<template>
    <div>
      <div class="posts-container">
    
      <div v-for="job in jobs" :key="job.id" id="before-headlines">
            <div id="headlines">
              <NuxtLink :to="`/job-directory/job/${job.job_slug}`">
                  
                  <div>
                    <h3 id="title"> {{ job.title }} </h3>
                    <p> {{ job.employer }} </p> 
                    <p> {{ job.description }} </p>            
                    <div id="author-date">
                       <div id="author"><span>{{ job.location }}</span> <span> Posted: {{getDate(job.created_at)}} </span></div>
                       <div id="category-tag"><span>{{job.salary}}</span> <span> {{ job.function }} </span></div>
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
          jobs: [],
          error:null,
        }
      },
    
      methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
    
        async getJobs(){
          try {
            const { data } = await this.$axios.get(`/api/auth/jobs`);
            this.jobs = data
            return true; 
          } catch (error) {
            this.loading = false;
           console.log(error.response)
            this.$toast.error(error.response.data.error);
          }
        },
      },
    
      created() {
        this.getJobs();
      },
    
     
    }
    
    </script>