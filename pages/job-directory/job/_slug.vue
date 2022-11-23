<template>
<!--view a specific job-->

<div>
    <div>
        <div class="list-description">
                    <h3 style="color:red;"> {{ job.title }} </h3>
                    <p><span class="list-contact"> Posted By:</span> {{ job.user.name }}</p>
                    <p><span class="list-contact">Responsilities:</span> {{ job.function }}</p> 
                    <div class="list-detail">
                       <div id="author"><span class="list-contact">Location: {{ job.location }}</span></div>
                       <div><span class="list-contact"> Posted: {{getDate(job.created_at)}} </span></div>
                       <div id="category-tag"><span class="list-contact">Salary: {{job.salary}}</span> </div>
                    </div>
                    <div class="list-detail">
                       <div id="author"><span class="list-contact">Email: {{ job.user.email }}</span></div>
                       <div id="category-tag"><span class="list-contact">Phone: {{job.user.phone_number}}</span> </div>
                    </div>
                    <div class="job-description">
                    <p> {{ job.description }} </p>
                  </div>
                  
                </div>       
    </div>
</div>

</template>

<script scoped>
export default {
       auth: false,
async asyncData(context) {
        let data = await context.$axios.get(`/api/auth/job/${context.params.slug}`)
        let job = data.data[0]
        return {
                job         
            }
        },

methods: {
        getDate(datetime) {
                    let date = new Date(datetime).toJSON().slice(0,10).replace(/-/g,'/');
                    return date
                },
            }

}
</script>
