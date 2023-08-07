// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@vueuse/nuxt'],
  //全域載入css
  css: [ 
    '@/assets/css/main.css',// lib css
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    }
  ],
  // plugins: [
  //   { src: "~/plugins/jquery", mode: "client" },
  // ],
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    },
    head: {
      script: [
        {
          src: "./node_modules/jquery/dist/jquery.min.js",
          type: "text/javascript"
        },
        {
          src: "./node_modules/jstree/dist/jstree.min.js",
          type: "text/javascript"
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "./node_modules/jstree/dist/themes/default/style.min.css"
        },
      ]
    }
  },
  routeRules: {
    '/draggable': { ssr: true },
    '/tab': { ssr: false }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/sass/style.scss";'
        }
      }
    }
  }
})
