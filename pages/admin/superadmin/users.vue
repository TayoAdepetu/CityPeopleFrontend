<template>
  <div>
    <!--all users displayed for superadmin and admin here-->
    <div class="container">
      <thead>
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone Number</th>
          <th class="text-left">User Image</th>
          <th class="text-left">Date Joined</th>
          <th class="text-left">Scope</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="detailRow" v-for="(user, index) in users" :key="user.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.email }}
          </td>

          <td>
            {{ user.phone_number ? user.phone_number : "------" }}
          </td>
          <td>
            {{ user.user_image ? user.user_image : "------" }}
          </td>
          <td>
            {{ getDate(user.created_at) }}
          </td>
          <td>
            {{ user.scope }}
          </td>
          <td>
            <v-btn
              class="findBtn mb-4 mt-3 fullWidth"
              @click="openStatusModal(user)"
              scrollable
            >
              Update User Status
            </v-btn>
          </td>
        </tr>
      </tbody>
      <div data-app>
        <v-col cols="auto">
          <v-dialog
            v-model="updateStatusModal"
            persistent
            transition="dialog-top-transition"
            max-width="600"
          >
            <form>
              <div class="centerflex columnFlex">
                <h3 class="darkGreyColor textCenter">
                  Update {{ selectedUser.name }} account status!
                </h3>

                <span class="mt-3 mr-4">Select Status:</span>
                <div>
                  <select
                    class="selectBank normalInput2 fullWidth form-control mt-2"
                    v-model="selectedUser.scope"
                  >
                    <option value="">select scope</option>
                    <option>commenter</option>
                    <option>publisher</option>
                    <option>admin</option>
                    <option>seller</option>
                    <option>superadmin</option>
                    <option>suspended</option>
                  </select>
                </div>
              </div>
              <div class="flex justifyCenter mobileColumn">
                <v-btn
                  text
                  @click="
                    () => {
                      this.updateStatusModal = false;
                    }
                  "
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="greyBtn mx-3 my-1"
                  :loading="loading"
                  @click="updateUserStatus()"
                >
                  Update
                </v-btn>
              </div>
            </form>
          </v-dialog>
        </v-col>
      </div>
      <div class="pagination">
        <button class="paginate" @click.prevent="moveBack()">
          Previous List</button
        ><button class="paginate" @click.prevent="moveFront()">
          Next List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "issuperadmin",
  layout: "admin",

  data() {
    return {
      users: [],
      previous_page: null,
      next_page: null,
      last_page: null,
      first_page: null,
      updateStatusModal: false,
      loading: false,
      selectedUser: {
        scope: "",
        name: "",
        id: "",
      },
    };
  },
  methods: {
    async getAllUsers(page) {
      page = page || "all-users?page=1";
      try {
        const { data } = await this.$axios.get(`/api/auth/${page}`);
        if (data && data.data) {
          this.users = data.data;
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
        }
      } catch (error) {
        this.loading = false;
        // console.log(error.response)
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

    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    openStatusModal(user) {
      this.selectedUser.name = this.user.name;
      this.selectedUser.id = this.user.id;
      this.selectedUser.scope = this.user.scope;
      this.updateStatusModal = true;
    },

    async updateUserStatus() {
      this.loading = true;

      const { data } = await this.$axios.post(
        `/api/auth/user/update/${this.selectedUser.id}`,
        { scope: this.selectedUser.scope }
      );
      if (data && data.data) {
        this.loading = false;
        this.updateStatusModal = false;
        // reset form
        this.getAllUsers();
      } else {
        console.log(error);
        return (this.error = e.response.data.message);
      }
    },
  },

  /*
    
    async updateUserStatus(){
     this.loading = true
      try {
        const { data } = await this.$axios.post(
          `/api/auth/user/update/${this.selectedUser.id}`, {scope: this.selectedUser.scope});
        if(data && data.data){
          this.loading = false;
          this.updateStatusModal = false;
          
           // reset form
          this.getAllUsers()
        }
        } catch (error) {
        this.loading = false;
        console.log(error)
        return this.$toast.error(error.response.data.error);
      }
      }
    },

    */

  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
td {
  padding: 10px;
}
</style>
