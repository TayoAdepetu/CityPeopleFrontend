<template>
  <div>
    <div>Dashboard, {{ user.name }}</div>
    <directory-products />
  </div>
</template>

<script>
export default {
  middleware: "iscommenter",
  layout: "admin",

  data() {
    return {
      user: this.$auth.user,
    };
  },
};
</script>
