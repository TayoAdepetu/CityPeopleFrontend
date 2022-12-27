<template>
    <div>

    <div class="col-md-4">
    <div class="card">
        <div class="card-header">Users</div>
        <div class="card-body">
            <div class="users" v-for="user in users" :key="user.id">
                <v-btn class="findBtn mb-4 mt-3 fullWidth"
                    @click="openJobModal(job)"
                    scrollable>
                    {{ user.name }}
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
            :message="message"/>     
    </div>

    <div>
    <form @submit.prevent="sendMessage" class="selectBank normalInput2 fullWidth form-control mt-2 form">        
        <textarea
            required
            id="body"
            cols="28"
            rows="5"
            class="form-input"
            @keydown="typing"
            v-model="body">
        </textarea>
        <button type="submit">Send</button> 
        <v-btn text 
            @click="() => {
                  this.updateJobModal = false;
                }"
        >
            Close
        </v-btn>
    </form>
    </div>
    </v-dialog>
    </div>

    </div>
</template>

<script>
//import Event from '../event.js';
    export default {
        data() {
            return {
                updateJobModal: false,
                messengers: [],
                messages: [],
                body: '',
                selectedPost:{
                    receiver_id:null,
                    user_id:null,
                    id:null,
                }
            }
        },

        mounted() {
            //for messengers present in chat
            Event.$on('messengers.here', (users) => {
                this.messengers = messengers;
            })
            .$on('users.joined', (user) => {
                this.messengers.unshift(messenger);
            })
            .$on('users.left', (messenger) => {
                this.messengers = this.messengers.filter(u => {
                    return u.id != messenger.id
                });
            });

            //for projecting all messages from database
            axios.get('/message').then((response) => {
                this.messages = response.data;
            });

            //for listening to new message events 
            Event.$on('added_message', (message) => {
                this.messages.unshift(message);
                if(message.selfMessage) {
                    this.$refs.message.scrollTop = 0;
                }
            });
        },

        methods: {
            openJobModal(messenger) 
                {
                this.selectedPost.receiver_id = messenger.receiver_id
                this.selectedPost.user_id = messenger.user_id
                this.selectedPost.id = messenger.id

                this.updateJobModal = true;
                
            },

            sendMessage() {
                try{
                    $sendAm = axios.post('/message', {
                        body: this.body.trim(),
                        body: this.body,
                        selfMessage: true,
                        user_id: this.selectedPost.user_id,
                        receiver_id: this.selectedPost.receiver_id,
                    });

                    if(sendAm){
                        Event.$emit('added_message', messageObj);
                    }
                    
                }catch(e){
                    this.$toast.info("Problem sending message.");
                    };

                    this.body = null;
            },

        }
    }
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
        color: #aaa
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