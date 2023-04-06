<template>
  <div>
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
    <div class="pagination">
      <button class="paginate" @click.prevent="moveBack()">Previous List</button
      ><button class="paginate" @click.prevent="moveFront()">Next List</button>
    </div>
    <div>
      <h2>Search Business Directory For Each Nigerian State</h2>
      <ul>
        <li>
          <nuxt-link
            to="/business-directory/nigerian-business-directory-by-state/Abia"
            >Abia</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      directories: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      firms: null,
      loading: false,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getDirectories(page) {
      this.loading = true;
      page = page || "all-businesses?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.directories = data.data;
        this.first_page = data.first_page_url.split("/")[5];
        this.last_page = data.last_page_url.split("/")[5];

        if (data.prev_page_url != null) {
          this.previous_page = data.prev_page_url.split("/")[5];
        } else {
          this.previous_page = data.last_page_url.split("/")[5];
        }

        if (data.next_page_url != null) {
          this.next_page = data.next_page_url.split("/")[5];
        } else {
          this.next_page = data.first_page_url.split("/")[5];
        }

        return true;
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.error);
      }
    },

    moveFront() {
      this.page = this.next_page;
      this.getPosts(this.page);
    },

    moveBack() {
      this.page = this.previous_page;
      this.getPosts(this.page);
    },
  },

  created() {
    this.getDirectories();
  },
};
</script>

<style scoped>
.paginate {
  width: 20%;
  padding: 3px;
  background-color: aqua;
}
.pagination {
  justify-content: space-between;
  display: flex;
  gap: 2px;
  margin: 20px;
}
.list-detail {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
  grid-column-gap: 2.5%;
}

.list-description {
  border: 2px solid var(--yellow);
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f7f5f4;
  margin-bottom: 3px !important;
  text-align: left;
}

.list-contact {
  font-weight: bold;
}

.directory-container {
  word-wrap: break-word;
  width: 90vw;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2.5%;
  margin-top: 60px;
  margin-bottom: 20px;
}

.before-directory-headlines {
  width: 40vw;
  margin-right: auto;
  margin-left: auto;
}

.biz-header {
  text-align: center;
  margin-bottom: 4px;
}

@media screen and (max-width: 1150px) {
  .list-description {
    display: block;
  }

  .list-detail {
    display: block;
  }
}

@media screen and (max-width: 800px) {
  .directory-container {
    display: block;
  }

  .before-directory-headlines {
    width: 70vw;
    margin-right: auto;
    margin-left: auto;
  }
}

@media screen and (max-width: 600px) {
  .before-directory-headlines {
    width: 80vw;
    margin-right: auto;
    margin-left: auto;
  }
}

@media screen and (max-width: 600px) {
  .before-directory-headlines {
    width: 90vw;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
