
/*
import Echo from 'laravel-echo'
 
window.Pusher = require('pusher-js')
 
export default (context, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: "34e0b11d8bd8a238efa9",
      cluster: "eu",
      //encrypted: true,
      forceTLS:false,
      wsHost: window.location.hostname,
      wsPort: 6001,
      authEndpoint: 'http://localhost:8000/broadcasting/auth',
      authModule: true,
      connectOnLogin:true,
      disconnectOnLogout: true,
      disableStats: true,
      auth:{
        headers: {
          Authorization: 'Bearer' + context.$auth.token(),
          Accept: 'application/json',
        }}
        
    })
 
  inject('echo', echo)
}
*/