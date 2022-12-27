export default {
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
    ['@nuxtjs/laravel-echo', 
    
    /*
    {
      broadcaster: 'pusher',
      key: "34e0b11d8bd8a238efa9",
      cluster: "eu",
      //encrypted: true,
      forceTLS:false,
      wsHost: 'http://localhost:3000',
      wsPort: 6001,
      authEndpoint: 'http://localhost:8000/broadcasting/auth',
      //authModule: true,
      connectOnLogin:true,
      disconnectOnLogout: true,
      disableStats: true,
      auth:{
        headers: {
          //Authorization: 'Bearer' + this.$auth.token(),
          Accept: 'application/json',
        }
      }
    }*/],
    /*
    // https://github.com/Maronato/vue-toastification/tree/main
    ["vue-toastification/nuxt", {
      timeout: 1000,
      draggable: false
    }]
    */
    //https://www.npmjs.com/package/@nuxtjs/toast
   '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-center',
    duration: 2000,
},

  axios: {
    baseURL: 'https://citypeople-backend.herokuapp.com/',
    //credentials: true,
   // proxy: true
 },

/*
  proxy: {
    '/laravel': {
      target: 'https://laravel-auth.nuxtjs.app',
      pathRewrite: { '^/laravel': '/' }
    }
  },

  */

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
      
       tokenRequired: false,
       tokenType: false,
       localStorage: false
      },
  
  
 /* auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
        endpoints: {
          login: {
            url: '/login'
          },
          logout: {
            url: '/logout'
          },
          user: {
            url: 'api/user'
          }
        },
        user: {
          property: false
      },
      
      }
    },
    redirect: {
      login: '/auth/login',
      home: '/dashboard'
    }
  }, 
  


  */

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
    */
  },


  router: {
    middleware: 'auth',
},


}

