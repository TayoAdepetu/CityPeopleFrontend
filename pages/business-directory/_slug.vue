<template>
    <div>
        <div>
                    <h2 id="title"> {{ directory.business_name }} </h2>
                    <img :src="`{{ directory.image }}`">
                    <div> {{ directory.description }} </div>       
                    <div id="author-date">
                       <div id="author"> 
                        <span> Established: {{directory.established}} </span>
                        <span> Location: {{directory.location}} </span>
                        <span> No Of Employees: {{directory.number_of_employees}} </span>
                        <span> Registered On This Site Since: {{directory.registered_here}} </span>
                        <span> Verified?: {{directory.verified}} </span>
                        <span> Email Address: {{directory.email}} </span>
                        <span> Website: {{directory.website}} </span>
                        <span> Phone: {{directory.phone}} </span>
                    </div>
                    </div>
                  
                </div> 

<div>
    <workinghours />
</div>
<div>
    <directory-products />
</div>
<div>
    <directory-faq />
</div>

</div>

</template>

<script>
export default {
    auth: false,
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/biz-directory/${context.params.slug}`)
        let directory = response.data
        return {
                directory      
            }
        }
}
</script>
