<template>
  <div>
    <div class="container">
      <!--Lists all chats for each user-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Users</div>
          <div class="card-body">
            <div class="users" v-for="channel in channels" :key="channel.id">
              <v-btn
                class="findBtn mb-4 mt-3 fullWidth"
                @click="openJobModal(job)"
                scrollable
              >
                {{ channel.user.name }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-box">
        <v-dialog
          v-model="updateJobModal"
          persistent
          transition="dialog-top-transition"
        >
          <div class="message-area" ref="message">
            <MessageComponent
              v-for="message in messages"
              :key="message.id"
              :message="message"
            />
          </div>

          <div>
            <form
              @submit.prevent="sendMessage"
              class="selectBank normalInput2 fullWidth form-control mt-2 form"
            >
              <textarea
                required
                type="text"
                id="body"
                cols="28"
                rows="5"
                class="form-input"
                v-model="message"
              >
              </textarea>
              <button type="submit">Send</button>
              <v-btn
                text
                @click="
                  () => {
                    this.updateJobModal = false;
                  }
                "
              >
                Close
              </v-btn>
            </form>
          </div>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
//import Event from '../event.js';
import Pusher from "pusher-js";
export default {
  data() {
    return {
      updateJobModal: false,
      channels: [],
      messages: [],
      message: "",
      currentUser: this.$auth.user.id,
      selectedPost: {
        receiver_id: null,
        user_id: null,
        id: null,
      },
    };
  },

  mounted() {
    this.fetchChats();

    Pusher.logToConsole = true;

    const pusher = new Pusher("34e0b11d8bd8a238efa9", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("ChatMessage", (data) => {
      this.messages.push(JSON.stringify(data));
    });

    /*
            Echo.private('chat')
            .listen('ChatMessage', (e) => {
                this.messages.push({
                message: e.message.message,
                user: e.user
                });
            });
            */
  },

  methods: {
    fetchChats() {
      axios.get(`/channels/${this.currentUser}`).then((response) => {
        this.channels = response.data;
      });
    },

    openJobModal(channel) {
      this.selectedPost.receiver_id = channel.receiver_id;
      this.selectedPost.user_id = channel.user_id;
      this.selectedPost.id = channel.id;

      this.updateJobModal = true;
      this.fetchMessages();
    },

    fetchMessages() {
      axios.get(`/getmessages/${this.selectedPost.id}`).then((response) => {
        this.messages = response.data;
      });
    },

    sendMessage() {
      try {
        $sendAm = axios.post("/message", {
          message: this.message.trim(),
          selfMessage: true,
          user_id: this.selectedPost.user_id,
          receiver_id: this.selectedPost.receiver_id,
        });

        if (sendAm) {
          //this.messages.push(message);
          this.message = "";
        }
      } catch (e) {
        this.$toast.info("Problem sending message.");
      }
    },
  },
};
</script>

<style>
.form {
  padding: 8px;
}
.form-input {
  width: 100%;
  border: 1px solid #d3e0e9;
  padding: 5px 10px;
  outline: none;
}
.notice {
  color: #aaa;
}

.message-area {
  height: 400px;
  max-height: 400px;
  overflow-y: scroll;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.users {
  background-color: #fff;
  border-radius: 3px;
}
</style>
