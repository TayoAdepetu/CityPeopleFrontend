<template>
<!--view a specific job-->

<div>
    <div>
        <div class="list-description">
                    <h3 style="color:red;"> {{ job.title }} </h3>
                    <p><span class="list-contact"> Posted By:</span> {{ job.user.name }}</p>
                    <p><span class="list-contact">Responsilities:</span> {{ job.function }}</p> 
                    <div class="list-detail">
                       <div id="author"><span class="list-contact">Location:</span> {{ job.location }}</div>
                       <div><span class="list-contact"> Posted:</span> {{getDate(job.created_at)}} </div>
                       <div id="category-tag"><span class="list-contact">Salary:</span> {{job.salary}} </div>
                    </div>
                    <div class="list-detail">
                       <div id="author"><span class="list-contact">Email:</span> {{ job.user.email }}</div>
                       <div id="category-tag"><span class="list-contact">Phone:</span> {{job.user.phone_number}} </div>
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
