export default {
  //DEPLOYING URL
  /*https://www.fabiofranchino.com/blog/how-to-deploy-webapp-heroku-netlify/
https://devcenter.heroku.com/articles/getting-started-with-laravel
  */
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'thecitypeople',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { 
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/echo', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['@nuxtjs/laravel-echo'],
   '@nuxtjs/toast'
  ],

  echo: {
    plugins: [ '~/plugins/echo.js' ],
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
 },

  toast: {
    position: 'top-center',
    duration: 2000,
},

  axios: {
    //baseURL: 'https://citypeople-backend.herokuapp.com/',
    baseURL: 'http://http://localhost:3000/',
    //credentials: true,
   // proxy: true
 },


  auth: {

    plugins: [ { src: '~/plugins/echo', ssr: false }, '~/plugins/echo.js'],
    
    strategies: {
    'laravelJWT': {
      provider: 'laravel/jwt',
      url: 'http://localhost:8000',
      
      endpoints: {

      },

      token: {
        property: 'access_token',
        maxAge: 60 * 60
      },
      
      refreshToken: {
        maxAge: 20160 * 60
      },
    },

    },

    user: {
      property: true,
      autoFetch: true,
    },

    endpoints: {        
        login: { url: '/api/auth/login', method: 'post' },
        logout: { url: '/api/auth/logout', method: 'post' },
        user: { url: '/api/auth/user', method: 'get'},
        
        },
      
       //tokenRequired: false,
       //tokenType: false,
       //localStorage: false
      },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


  router: {
    middleware: 'auth',
},


}

