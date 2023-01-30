<template>
  <div>
    <!--Dynamic page for displaying subsubject articles-->
    <div class="container">
      <h1>{{ post[0].susubject_name }}</h1>
      <img id="short-image" :src="baseURL + 'postimage/' + post[0].image" />
      <p>{{ post[0].subject_name }}</p>
      <p>
        Last Updated: <span>{{ getDate(post[0].updated_at) }}</span>
      </p>
      <div class="body" v-html="`${post[0].body}`"></div>

      <!--
<div>
    <comments />
</div>
-->
    </div>

    <div class="content-help-notice">
        <h3>
          Please, help us in expanding and maintaining the integrity of this
          Nigerian-People-and-Institutions Knowledge Base.
        </h3>

        <h4 class="first-h4">Here are ways you can help us:</h4>
        <p>
          Tell us the people or institutions you would want us to create web
          pages for on this website.
        </p>
        <p>
          Tell us about any wrong information about a person or insttitution
          that we might have mistakenly published on this website.
        </p>

        <h4>The Rules:</h4>
        <ul>
          <li>
            Please, if you're refuting any statement made about a person or
            institution, kindly share with us sources containing facts about the
            subject matter.
          </li>
        </ul>

        <div class="greet-last">Thanks, The CityPeople Team</div>
      </div>

  </div>
</template>

<script scoped>
export default {
  auth: false,
  data() {
    return {
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    };
  },

  async asyncData(context) {
    let response = await context.$axios.get(
      `/api/auth/fetch-subsubject/${context.params.slug}`
    );
    let post = response.data;
    return {
      post,
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
.content-help-notice{
    text-align: left;
    text-align: justify;
    margin-top: 100px;
    border-style: solid;
    border-color: var(--yellow);
    border-radius: 5px;
    padding: 10px;
}

.greet-last, .first-h4{
    margin-top: 30px;
}

.container{
    margin: 20px;
    margin-top: 60px;
    width: 90vw;
}

#short-image {
  width: 70%;
  height: 500px;
}
.body {
  text-align: left !important;
}

/*css for the description classes*/
.bold-span {
  font-weight: bold;
}

.italic-span {
  font-style: italic;
}

.image-dressing {
  width: 100vh;
  height: 400px;
}
</style>
