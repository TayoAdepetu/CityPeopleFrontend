<template>
<!--view a specific job-->

<div>
    <div>
        <h3 id="title"> {{ job.title }} </h3>
        <p>{{ job.user.name }} </p> 
        <p>{{ job.user.email }} </p>
        <p>{{ job.user.phone_number }} </p>
        <p> {{ job.description }} </p>          
        <div id="author-date">
           <div id="author"><span>Location: {{ job.location }}</span> <span> Posted: {{getDate(job.created_at)}} </span></div>
           <div id="category-tag"><span>Salary: {{job.salary}}</span> <span>Responsilities: {{ job.function }} </span></div>
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
