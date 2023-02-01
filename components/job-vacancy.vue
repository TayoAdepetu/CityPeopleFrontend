<template>
  <div>
    <h2 class="index-h2">Adverrtise Job Vacancies In Your Firm For Free</h2>
    <div class="posts-container">
      <div v-for="job in jobs" :key="job.id" id="before-headlines">
        <NuxtLink :to="`/job-directory/job/${job.job_slug}`">
          <h3 style="color: red">{{ job.title }}</h3>
          <p>{{ job.user.name }}</p>

          <div class="job-description">{{ job.location }}</div>
          <div class="job-description">{{ getDate(job.created_at) }}</div>
          <div class="job-description">{{ job.salary }}</div>

          <div class="job-description">
            <p>{{ job.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="pagination">
      <button class="paginate" @click.prevent="moveBack()">Previous List</button
      ><button class="paginate" @click.prevent="moveFront()">Next List</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      jobs: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      error: null,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    async getJobs(page) {
      page = page || "more-jobs?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        this.jobs = data.data;
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
        console.log(error.response);
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
    this.getJobs();
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

.index-h2 {
  margin-bottom: 10px;
  margin-top: 60px;
}
.posts-container {
  margin: 20px;
  word-wrap: break-word;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 2.5%;
}

#before-headlines {
  margin-bottom: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: #c20017;
  width: 30vw;
  padding: 4px;
}

.job-description {
  margin: 3px;
  border: 1px solid #036;
  border-radius: 5px;
  padding: 4px;
  background-color: #f7f5f4;
  text-align: center;
}

@media screen and (max-width: 1150px) {
  .posts-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
    width: 40vw;
  }
}

@media screen and (max-width: 990px) {
  .posts-container {
    grid-template-columns: auto auto;
  }

  #before-headlines {
    width: 45vw;
  }
}

@media screen and (max-width: 670px) {
  .posts-container {
    grid-template-columns: auto;
  }

  #before-headlines {
    width: 70vw;
    margin-right: auto;
    margin-left: auto;
  }
}

@media screen and (max-width: 550px) {
  .posts-container {
    grid-template-columns: auto;
  }

  #before-headlines {
    width: 90vw;
  }
}
</style>
