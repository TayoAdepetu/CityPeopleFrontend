<template>
    <v-app>
    <headernav />
  
    <Nuxt />
  
    </v-app>
  </template>
  
  <script>
  export default {
    auth: false,
   
  }
  </script>

<style>
  * {
    box-sizing: border-box;  
    color:#036;
  }

  body {
    width: 80%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }
  
  /* Style the search field */
  form.example input[type=text] {
    padding: 10px;
    font-size: 17px;
    border: 1px solid #c20017;
    float: left;
    width: 80%;
    background: #f1f1f1;
  }

  form.example input[type=text]:hover {
    border-color: #036;
  }

  
  /* Style the submit button */
  form.example button {
    width: 20%;
    padding: 10px;
    background: #d20f26;
    color: white;
    font-size: 17px;    
    border: none;
    cursor: pointer;
    height: 42px;
  }
  
  form.example button:hover {
    background:#036
  }
  
  /* Clear floats */
  form.example::after {
    content: "";
    clear: both;
    display: table;
  }

  #Mainheading {
      border: 2px solid #036;
      border-radius: 10px;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #F7F5F4;
      

  }
  
  h1 {
      border: 2px solid #036;
      border-radius: 5px;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #F7F5F4;
      margin-bottom: 3px !important;
      

  }

  #Latestnews {
    border: 2px solid #036;
    border-radius: 30px;
    margin-top: 10px;
    margin-bottom: 0;
    padding-left: 2px;
      padding-right: 2px;
      background-color: #F7F5F4;
  }

  img {
      width: 300px;
      margin-top: 10px;
  }

  

  h1, h2 {
      color:#c20017;
  }

  ::placeholder {
    color:#036;
  }

  
</style>