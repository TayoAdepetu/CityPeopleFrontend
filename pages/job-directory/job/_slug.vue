<template>
  <!--view a specific job-->

  <div>
    <div>
      <div class="list-description">
        <h3>{{ job.title }}</h3>
        <p style="color:var(--yellow)"><span style="color:var(--yellow)" class="list-contact"> Posted By:</span> {{ job.user.name }}</p>
        <div>
          <nuxt-link class="chat-button" :to="`/chat/${job.user.id}`">Click To Chat Business</nuxt-link>
        </div>
        <div class="job-explain">
          <p>
            <span class="list-contact">Responsilities:</span> {{ job.function }}
          </p>
          <div class="list-detail">
            <div id="author">
              <span class="list-contact">Location:</span> {{ job.location }}
            </div>
            <div>
              <span class="list-contact"> Posted:</span>
              {{ getDate(job.created_at) }}
            </div>
            <div id="category-tag">
              <span class="list-contact">Salary:</span> {{ job.salary }}
            </div>
          </div>
          <div class="list-detail">
            <div id="author">
              <span class="list-contact">Email:</span> {{ job.user.email }}
            </div>
            <div id="category-tag">
              <span class="list-contact">Phone:</span>
              {{ job.user.phone_number }}
            </div>
          </div>
        </div>
        <div class="the-job-description">
          <p>{{ job.description }}</p>
        </div>
        <div class="chat-button">
          Report Job
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  auth: false,
  async asyncData(context) {
    let data = await context.$axios.get(`/api/auth/job/${context.params.slug}`);
    let job = data.data[0];
    return {
      job,
    };
  },

  methods: {
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },
  },
};
</script>

<style scoped>
.the-job-description{
  margin: 3px; 
  border: 1px solid #036;
  border-radius: 5px;
  padding:4px;
  background-color: #F7F5F4;
  text-align: center;
  margin-bottom: 10px;
}
.chat-button{
    background-color: var(--yellow);
    padding: 10px;
    
}
.list-description {
  margin: 20px;
  margin-top: 60px;
  width: 90vw;
  border-style: solid;
  border-color: var(--yellow);
  border-radius: 5px;
  padding: 10px;
  word-wrap: break-word;
}

.job-explain {
  text-align: left;
  text-align: justify;
  margin-top: 20px;
  margin-bottom: 20px;
}

.list-contact{
    font-weight: 700;
}
</style>
