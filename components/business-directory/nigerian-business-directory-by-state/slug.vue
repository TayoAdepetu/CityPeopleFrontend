<template>
  <div>
    <h3 id="title">{{ state }} State Business Directory</h3>
    <div class="directory-container">
      <div
        v-for="directory in directories"
        :key="directory.id"
        class="before-directory-headlines"
      >
        <NuxtLink
          :to="`/business-directory/${directory.user.business_name_slug}`"
        >
          <div class="list-description">
            <h2 class="biz-header">
              {{ directory.user.business_name }}
            </h2>
            <div class="list-detail">
              <p>
                <span class="list-contact">Location:</span>
                {{ directory.location }}
              </p>
              <p>
                <span class="list-contact">Phone:</span>
                {{ directory.user.phone_number }}
              </p>
              <p>
                <span class="list-contact">Email:</span>
                {{ directory.user.email }}
              </p>
              <p>
                <span class="list-contact">Website:</span>
                {{ directory.website }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      state: context.params.slug,
    };
  },

  async asyncData(context) {
    const directories = await context.$axios.get(
      `/api/auth/state-by-state-directory/${context.params.slug}`
    );

    return {
      directories,
    };
  },
};
</script>
