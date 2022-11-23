<template>
    <div>
        <div>
                    <h2>Our Working Hours</h2>
           <h3>Monday: {{worktime[0].monday}}</h3> 
           <h3>Tuesday: {{worktime[0].tuesday}}</h3> 
           <h3>Wednesday: {{worktime[0].wednesday}}</h3> 
           <h3>Thursday: {{worktime[0].thursday}}</h3> 
           <h3>Friday: {{worktime[0].friday}}</h3>
           <h3>Saturday: {{worktime[0].saturday}}</h3>  
           <h3>Sunday: {{worktime[0].sunday}}</h3>   
        </div> 

</div>

</template>

<script>
export default {
       
      async asyncData(context) {
        const response = await context.$axios.get(`/api/auth/all-worktime/${context.params.slug}`)
        this.worktime = response.data
        return {
                worktime        
            }
        }

}
</script>
