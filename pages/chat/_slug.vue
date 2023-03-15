<template>
  <div>
    <!--contains all previous messages and a form-->
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
        <v-btn text @click="Chats"> Close </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
//import Echo from '../../../echo.js';
//import Pusher from "pusher-js";

export default {
  data() {
    return {
      messages: [],
      message: "",
      user_id: null,
      receiver_id: null,
    };
  },

  mounted() {
    this.fetchMessages();

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
    async fetchMessages(context) {
      try {
        const response = await axios.get(`/getmessages/${context.params.slug}`);
        this.messages = response.data;
      } catch (e) {
        this.$toast.info("Problem loading messages.");
      }
    },

    async sendMessage(context) {
      try {
        const sendAm = await axios.post("/message", {
          message: this.message.trim(),
          selfMessage: true,
          user_id: this.$auth.user.id,
          receiver_id: context.params.slug,
        });

        if (sendAm) {
          //this.messages.push(message);
          this.message = "";
        }
      } catch (e) {
        this.$toast.info("Problem sending message.");
      }

      this.body = null;
    },

    Chats() {
      this.$router.push("/chat/chatList");
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
