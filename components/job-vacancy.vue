<template>
    <div>
      <div class="posts-container">
    
      <div v-for="job in jobs" :key="job.id" id="before-headlines">
            <div id="headlines">
              <NuxtLink :to="`/job-directory/job/${job.job_slug}`">
                  
                  <div class="list-description">
                    <h3 style="color:red;"> {{ job.title }} </h3>
                    <p><span class="list-contact"> Posted By:</span> {{ job.user.name }}</p>
                    <p><span class="list-contact">Responsilities:</span> {{ job.function }}</p> 
                    <div class="list-detail">
                       <div id="author"><span class="list-contact">Location: {{ job.location }}</span></div>
                       <div><span class="list-contact"> Posted: {{getDate(job.created_at)}} </span></div>
                       <div id="category-tag"><span class="list-contact">Salary: {{job.salary}}</span> </div>
                    </div>
                    <div class="job-description">
                    <p> {{ job.description }} </p>
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

<style>
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

.job-description{
  margin-top: 3px; 
  border: 1px solid #036;
  border-radius: 5px;
  padding-left: 3px;
  padding-right: 3px;
  background-color: #F7F5F4;
  margin-bottom: 3px !important;
  text-align: center;
  text-decoration: none;
}

@media screen and (max-width: 700px) {
  
}
</style>