<template>
    <div :class="type">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    /*
    props: {
      type:{
        type: string,
      },

      message:{
        type:string
      }
    }
    */
  }
  </script>
  <<style scoped>
  .successmessage{
    background-color: lightseagreen;
  }
  .failuremessage{
    background-color: lightcoral;
  }
  </style>