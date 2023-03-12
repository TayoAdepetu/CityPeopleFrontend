import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
export default (inject) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "34e0b11d8bd8a238efa9",
    cluster: "eu",
    encrypted: true,
    forceTLS: false,
    wsHost: 6001,
    wsPort: 443,
    authEndpoint: `${process.env.API_URL}/broadcasting/auth`,
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true,
    disableStats: true,
    auth: {
      headers: {
        Authorization: "Bearer " + context.$auth.strategy.token.get(),
        Accept: "application/json",
      },
    },
  });

  inject("echo", echo);
};

//const token = context.$auth.strategy.token.get();

/*
    echo.onRequest((config) => {
      // Here we check if user is logged in
      if (context.$auth.loggedIn) {
        // If the user is logged in we can now get the token, we get something like `Bearer yourTokenJ9F0JFODJ` but we only need the string without the word **Bearer**, So we split the string using the space as a separator and we access the second position of the array **[1]**
        const token = context.$auth.strategy.token.get().split(' ')[1]
        echo.setToken(token, 'Bearer') // Here we specify the token and now it works!!
      }
    })
    
 */
