<!--
    <div id="form">
      <form class="example" @submit.prevent="searchBiz">
        <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            v-model="keyword"
          />
         
          <select v-model="item" required>
            <option :value="null" disabled hidden>Pick Search Category...</option>
            <option value="username"><button >Search For A User</button></option>
            <option value="business"><button>Search For A Business</button></option>
            <option value="article"><button>Search For An Article</button></option>
            <option value="product"><button>Search For A Product</button></option>
          </select>

        <button type="submit">Find User</button>
      </form>
    </div>
    <div id="form">
    <form class="example" @submit.prevent="searchBiz">
      <div class="picker">
        <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            readonly
          />
          <select v-model="item" required>
            <option :value="null" disabled hidden>Pick Search Category...</option>
            <option value="username"><button >Search For A User</button></option>
            <option value="business"><button>Search For A Business</button></option>
            <option value="article"><button>Search For An Article</button></option>
            <option value="product"><button>Search For A Product</button></option>
          </select>
        </div>

<div class="input-action" v-if="(item != null)">

          <div v-if="(item == 'username')">
          <input
            type="text"
            placeholder="Search by name of a user..."
            v-model="keyword"
          />
          <button type="submit">Find User</button>
        </div>

        <div v-if="(item == 'business')">
          <input
            type="text"
            placeholder="Search by name of a business..."
            v-model="keyword"
          />
          <button type="submit">Find Business</button>
        </div>

        <div v-if="(item == 'business')">
          <input
            type="text"
            placeholder="Search by name of a business..."
            v-model="keyword"
          />
          <button type="submit">Find Business</button>
        </div>

        <div v-if="(item == 'article')">
          <input
            type="text"
            placeholder="Search by name of article, event, institution..."
            v-model="keyword"
          />
          <button type="submit">Search Topic</button>
        </div>

        <div v-if="(item == 'product')">
          <input
            type="text"
            placeholder="Search by name of product..."
            v-model="keyword"
          />
          <button type="submit">Find Product</button>
        </div>
      </div>


            </form>
            </div>

            
    <section id="Mainheading">
      <H2>Nigerian State Gists</H2>
      <hr />
      <NuxtLink to="#">Lagos</NuxtLink> | <NuxtLink to="#">Ogun</NuxtLink> |
      <NuxtLink to="#">Oyo</NuxtLink> | <NuxtLink to="#">Osun</NuxtLink> |
      <NuxtLink to="#">Ondo</NuxtLink> | <NuxtLink to="#">Ekiti</NuxtLink> |
      <NuxtLink to="#">National</NuxtLink> |
      <NuxtLink to="#">International</NuxtLink>
    </section>

    <section id="Mainheading">
      <h2>Other Trending Categories</h2>
      <hr />
      <p>
        <NuxtLink to="#">How To Make Money In Nigeria</NuxtLink> |
        <NuxtLink to="/secret-anonymous"
          >Stories: Share Secrets Anonymously</NuxtLink
        >
        | <NuxtLink to="#">FundHelp</NuxtLink> |
        <NuxtLink to="#">LendMe</NuxtLink> |
        <NuxtLink to="#">Nigerian Images</NuxtLink> |
        <NuxtLink to="#">Nigerian Business Directory</NuxtLink> |
        <NuxtLink to="#">Artisans Directory</NuxtLink> |
        <NuxtLink to="#">Job Vacancy Board</NuxtLink>
      </p>
    </section>

    <section id="up-page-adverts">
      <img
        class="img-1"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729"
      />
      <img
        class="img-2"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729"
      />
      <img
        class="img-3"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-education-facebook-advert-template-design-1698c73ba3f3379f8c8bc4ea77a6abd3_screen.jpg?ts=1612251729"
      />
    </section>

    <nuxt-link to="#">Politics</nuxt-link> |
          <NuxtLink to="#">Entertainment</NuxtLink> |
          <NuxtLink to="#">Sports</NuxtLink> |
          <NuxtLink to="#">Technology</NuxtLink> |
          <NuxtLink to="#">Private Sector</NuxtLink> |
          <NuxtLink to="#">Events</NuxtLink> |
          <NuxtLink to="#">Others</NuxtLink>
            -->
