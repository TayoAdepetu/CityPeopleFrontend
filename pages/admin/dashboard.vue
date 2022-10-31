<template>
    <div>
        Dashboard, {{ user.name }}
    </div>
</template>

<script>

    export default {
        layout: "admin",
        
        data(){
            return {
                user: this.$auth.user,
            }
            
        },
    }
    </script>
