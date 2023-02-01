<template>
    <div>
        <div class="first-container">
            <p>Step 4 of 5</p>
            <create-more-faq/>

        </div>
    </div>
</template>

<script scoped>

export default {
    middleware:'iscommenter',
}
</script>
<style scoped>
.first-container{
    margin-top:100px;
}
</style>
