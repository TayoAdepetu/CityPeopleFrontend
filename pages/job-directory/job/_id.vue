<template>
<div>
    <div>
        <h3 id="title"> {{ job.title }} </h3>
        <p> {{ job.employer }} </p> 
        <p> {{ job.description }} </p>          
        <div id="author-date">
           <div id="author"><span>{{ job.location }}</span> <span> Posted: {{getDate(job.created_at)}} </span></div>
           <div id="category-tag"><span>{{job.salary}}</span> <span> {{ job.function }} </span></div>
        </div>
      
    </div>
</div>

</template>

<script scoped>
export default {
       
async asyncData(context) {
        let data = await context.$axios.get(`/api/auth/job/${context.params.id}`)
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
