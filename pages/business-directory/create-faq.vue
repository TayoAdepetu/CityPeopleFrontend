<template>
    <div>
        <div>
            <h2>Tell Us Your Opening and Closing Time (This step is optional)</h2>
            <p>Step 4 of 5</p>
            <create-more-faq/>

            <h3>No More Questions? Go To The Next Step To <span><nuxt-link to="/business-directory/create-directory-product">Upload Your Products or Services</nuxt-link></span> </h3>

        </div>
    </div>
</template>

<script scoped>

export default {
    middleware:'iscommenter',
}
</script>
