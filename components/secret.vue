<template>
  <div>
    <h2 class="index-h2">Explore Secrets People Can't Share</h2>
    <div class="secrets-container">
      <div
        v-for="secret in secrets"
        :key="secret.id"
        id="before-headline"
      >
        <NuxtLink :to="`/secret-anonymous/${secret.slug}`">
            <h3 class="secret-title">{{ secret.title }}</h3>
            <div>{{ secret.description }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      secrets: [],
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getSecrets() {
      try {
        const { data } = await this.$axios.get(`/api/auth/all-secrets`);
        this.secrets = data;
        return true;
      } catch (error) {
        this.loading = false;
        console.log(error.response);
        this.$toast.error(error.response.data.error);
      }
    },
  },

  created() {
    this.getSecrets();
  },
};
</script>

<
<style scoped>
.index-h2 {
  margin-top: 60px;
}
.secrets-container {
  text-align: left;
  margin: 20px;
  word-wrap: break-word;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 2.5%;
}

#before-headline {
  margin-bottom: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: #c20017;
  padding: 10px;
  width: 30vw;
}

.secret-title{
  margin: 3px; 
  border: 1px solid #036;
  border-radius: 5px;
  padding:4px;
  background-color: #F7F5F4;
  text-align: center;
}

@media screen and (max-width: 1150px) {
  .secrets-container {
    grid-template-columns: auto auto;
  }

  #before-headline {
  width:40vw;
}
}

@media screen and (max-width: 990px) {
  .secrets-container {
    grid-template-columns: auto auto;
  }

  #before-headline {
  width:45vw;
}
}

@media screen and (max-width: 670px) {
  .secrets-container {
    grid-template-columns: auto;
  }

  #before-headline {
  width:70vw;
  margin-right: auto;
  margin-left: auto;
}
}

@media screen and (max-width: 550px) {
  .secrets-container {
    grid-template-columns: auto;
  }

  #before-headline {
  width:90vw;
}
}

</style>
