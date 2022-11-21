<template>
    <div class="comments-app">
       <h1>Comments</h1>
       <!-- From -->
       <div class="comment-form" v-if="user">
           <!-- Comment Avatar -->
       
           <form class="form" name="form">     
                   <textarea class="input" hidden required v-model="page_slug"></textarea>
                   <span class="input" v-if="errorComment" style="color:red">{{errorComment}}</span>
              
               
                   <textarea class="input" placeholder="Add comment..." required v-model="message"></textarea>
                   <span class="input" v-if="errorComment" style="color:red">{{errorComment}}</span>
              
              
                   <input class="input" placeholder="Email" type="text" disabled :value="user.name">
              
                   <input type="button" class="btn btn-success" @click="saveComment" value="Add Comment">
              
           </form>
       </div>
    
       <div class="comment-form" v-else>
           <!-- Comment Avatar -->
           <form class="form" name="form">
               <div class="form-row">
                   <NuxtLink to="/login"><textarea
                     class="input"
                     placeholder="Add comment..."
                     required></textarea></NuxtLink>
               </div>
           </form>
       </div>
    
       <!-- Comments List -->
       <div class="comments" v-if="comments">
        <div v-for="(comment,index) in commentsData" :key="comment.commentid">
           <!-- Comment -->
          <!--<div v-if="!spamComments[index] || !comment.spam" class="comment">--> 
              
               <!-- Comment Box -->
               <div class="comment-box">
                <div class="comment-content">
                 <!-- Comment Avatar -->
               <div class="comment-avatar">
                   <img src="">
                </div>
                   <div class="comment-text">{{comment.comment}}</div>
                </div>
               
                   <div class="comment-footer">
                       <div class="comment-info">
                           <span class="comment-author">
                                   <em>{{ comment.name}}</em>
                               </span>
                           <span class="comment-date">{{ comment.date}}</span>
                       </div>
                       <div class="comment-actions">
                           <ul class="list">
                               <li class="reply">
                                   <a v-on:click="openComment(index)">Reply</a>
                               </li>
                           </ul>
                       </div>
                   <!--</div>-->
                </div>
        </div>
               <!-- From -->
               <div class="comment-form comment-v" v-if="commentBoxs[index]">
                   <!-- Comment Avatar -->
        
                   <form class="form" name="form">
                       
                           <textarea class="input" placeholder="Add comment..." required v-model="message"></textarea>
                           <span class="input" v-if="errorReply" style="color:red">{{errorReply}}</span>
                      
                    
                           <input class="input" placeholder="Email" type="text" :value="user.name">
                      
                   
                           <input type="button" class="btn btn-success" v-on:click="replyComment(comment.commentid,index)" value="Add Comment">
                      
                   </form>
               </div>
    
               <!-- Comment - Reply -->
               <div class="comment-section" v-if="comment.replies">
                   <div class="comments" v-for="(replies, index2) in comment.replies" :key="replies.commentid">
                      <!-- <div v-if="!spamCommentsReply[index2] || !replies.spam" class="comment reply">-->
                           <!-- Comment Avatar -->
                           <div class="comment-avatar">
                               <img src="https://bit.ly/3eBWFaY">
                           </div>
                           <!-- Comment Box -->
                           <div class="comment-box" style="background: grey;">
                               <div class="comment-text" style="color: white">{{replies.comment}}</div>
                               <div class="comment-footer">
                                   <div class="comment-info">
                                       <span class="comment-author">
                                               {{replies.name}}
                                           </span>
                                       <span class="comment-date">{{replies.date}}</span>
                                   </div>
                                   <div class="comment-actions">
                                       <ul class="list">
                                           <li>
                                               <a v-on:click="replyCommentBox(index2)">Reply</a>
                                           </li>
                                       </ul>
                                  <!-- </div>-->
                               </div>
                           </div>
            <!-- From -->
         <div class="comment-form reply" v-if="replyCommentBoxs[index2]">
                <!-- Comment Avatar -->
                    <div class="comment-avatar">
                        <img src="https://bit.ly/3eBWFaY">
                        </div>
                            <form class="form" name="form">
                                   
                                       <textarea class="input" placeholder="Add comment..." required v-model="message"></textarea>
                                       <span class="input" v-if="errorReply" style="color:red">{{errorReply}}</span>
                                   
                                  
                                       <input class="input" placeholder="Email" type="text" :value="user.name">
                                   
                                   
                                       <input type="button" class="btn btn-success" v-on:click="replyComment(comment.commentid,index)" value="Add Comment">
                                  
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
    </template>
    
    <script>
    import Vue from 'vue'
    var _ = require('lodash');
    
    export default {
       props: ['commentUrl'],
       data() {
           return {
               comments: [],
               commentid: '',
               commentreplies: [],
               comments: 0,
               commentBoxs: [],
               message: null,
               replyCommentBoxs: [],
               commentsData: [],
               viewcomment: [],
               show: [],
               errorComment: null,
               errorReply: null,
               user: this.$auth.user,
               page_slug: '',
           }
       },
    
       /*
       http: {
           headers: {
               'X-CSRF-TOKEN': window.csrf
           }
       },
    
       */
    
       methods: {
           fetchComments() {
               this.$axios.get('/api/auth/review-comments/' + this.$route.params.slug).then(res => {
                   this.commentData = res.data;
                   this.commentsData = _.orderBy(res.data, ['date'], ['asc']);
                   this.comments = 1;
               });
               
           },
           showComments(index) {
               if (!this.viewcomment[index]) {
                   Vue.set(this.show, index, "hide");
                   Vue.set(this.viewcomment, index, 1);
               } else {
                   Vue.set(this.show, index, "view");
                   Vue.set(this.viewcomment, index, 0);
               }
           },
           openComment(index) {
               if (this.user) {
                   if (this.commentBoxs[index]) {
                       Vue.set(this.commentBoxs, index, 0);
                   } else {
                       Vue.set(this.commentBoxs, index, 1);
                   }
               }
           },
           replyCommentBox(index) {
               if (this.user) {
                   if (this.replyCommentBoxs[index]) {
                       Vue.set(this.replyCommentBoxs, index, 0);
                   } else {
                       Vue.set(this.replyCommentBoxs, index, 1);
                   }
               }
           },
           saveComment() {
               if (this.message != null && this.message != ' ') {
                   this.errorComment = null;
                   this.$axios.post('/api/auth/directory-comments', {
                       page_slug: this.$route.params.slug,
                       comment: this.message,
                       user_id: this.user.id
                   }).then(res => {
                       if (res.data.status) {
                           this.commentsData.push({ "commentid": res.data.commentId, "name": this.user.name, "comment": this.message, "reply": 0, "replies": [] });
                           this.message = null;
                       }
                   });
               } else {
                   this.errorComment = "Please enter a comment to save";
               }
           },
    
           replyComment(commentId, index) {
               if (this.message != null && this.message != ' ') {
                   this.errorReply = null;
                   this.$axios.post('/api/auth/directory-comments', {
                       comment: this.message,
                       user_id: this.user.id,
                       reply_id: commentId
                   }).then(res => {
                       if (res.data.status) {
                           if (!this.commentsData[index].reply) {
                               this.commentsData[index].replies.push({ "commentid": res.data.commentId, "name": this.user.name, "comment": this.message});
                               this.commentsData[index].reply = 1;
                               Vue.set(this.replyCommentBoxs, index, 0);
                               Vue.set(this.commentBoxs, index, 0);
                           } else {
                               this.commentsData[index].replies.push({ "commentid": res.data.commentId, "name": this.user.name, "comment": this.message});
                               Vue.set(this.replyCommentBoxs, index, 0);
                               Vue.set(this.commentBoxs, index, 0);
                           }
                           this.message = null;
                       }
                   });
               } else {
                   this.errorReply = "Please enter a comment to save";
               }
           },
      
       },
       mounted() {
          //console.log("mounted");
          this.fetchComments();
       }
    }
    
    </script>
    
    <style scoped>
    textarea{
        border-style: solid;
        width: 80%;
        min-height: 200px;
        max-height: 250px;
    }
    
    .comment-section{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    }
    
    form{    
        max-width: 90%;
        margin-right: auto;
        margin-left: auto;
    }
    
    .comment-form{
        margin-bottom: 10px;
    }
    
    .comments-app{
        width: 96%;
        margin-right: auto;
        margin-left: auto;
    }
    
    .comment, .list, .voteList, .comment-info, .comment-footer {
        display: flex;
        justify-content: space-between;
    }
    
    .comment-author, .upvotes, .downvotes, .spam{
        margin-right: 6px;
    }
    
    .comment-avatar{
        width: 100px;
        height: 100px;
        border-style: solid;
        margin-right: 7px;
        border-left-style: none;
        border-top-style: none;
    
    }
    
    .comment{
        margin-bottom: 7px;
        border-style: solid;
        border-radius: 2px;
    }
    
    li{
        list-style: none;
    }
    
    .comment-content{
        display: flex;
    }
    
    .btn {
            background-color: white;
            padding: 16px;
            color: #c20017;
            border: solid;
            border-color: #036;
            margin: auto;
            font-weight: bolder;
            font-size: 20px;
                 }
    
         .btn:hover{
    
            opacity: 0.9;
         }
    </style>