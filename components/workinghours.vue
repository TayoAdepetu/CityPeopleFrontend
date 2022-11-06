<template>
    <div>
        <div>
                    <h2>Our Working Hours</h2>
           <h3>Monday: {{worktime.monday}}</h3> 
           <h3>Tuesday: {{worktime.tuesday}}</h3> 
           <h3>Wednesday: {{worktime.wednesday}}</h3> 
           <h3>Thursday: {{worktime.thursday}}</h3> 
           <h3>Friday: {{worktime.friday}}</h3>
           <h3>Saturday: {{worktime.saturday}}</h3>  
           <h3>Sunday: {{worktime.sunday}}</h3>   
        </div> 

</div>

</template>

<script>
export default {
       
      async asyncData(context) {
        let response = await context.$axios.get(`/api/auth/all-worktime/${context.params.slug}`)
        let secret = response.data
        return {
                worktime        
            }
        }

}
</script>
