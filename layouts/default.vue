<template>
    <v-app>
    <headernav />
  
    <Nuxt />
  
    <footing />

    </v-app>
</template>
  
  <script>
  export default {
    auth: false,
   
  }
  </script>

<style>
  
  /* Style the search field */
  .example{
    display: flex;
    border: 1px solid red;
    margin-bottom:5px; 

  }
  form.example input[type=text] {
    padding: 10px;
    font-size: 17px;
    width: 60%;
    background: #f1f1f1;
  }

  form.example input[type=text]:hover {
    border-color: #036;
  }

  
  /* Style the submit button */
  form.example button {
    width: 20%;
    padding: 5px;
    background: cornflowerblue;
    color: red;
    font-size: 20px;    
    cursor: pointer;
  }

  select{
    border: 1px solid red;
    width:20%;
    padding:10px;
  }

  .logout{
    cursor: pointer;
  }
  
  form.example button:hover {
    background:#036
  }
  
  /* Clear floats */
  form.example::after {
    content: "";
    clear: both;
  }

  #Mainheading {
      border: 2px solid #036;
      border-radius: 10px;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      

  }
 
  img {
      width: 30%;
      height:120px;
      margin-top: 10px;
      /*background-color: #F7F5F4*/
  }
/*
  @media screen and (max-width: 1156px) {
    .img-3{
      display: none;
    }

    img {
      width: 400px;
  }
  }

  @media screen and (max-width: 1024px) {
    .img-3, .img-2{
      display: none;
    }

    img {
      width: 300px;
  }
  }
  */
  
</style>