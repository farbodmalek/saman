export default defineNuxtConfig({
  // @ts-ignore
  ssr: false,

  app: {
      head: {
          title: "samen",
          htmlAttrs: {lang: "fa-IR"},
          meta: [
              {charset: "utf-8"},
              {name: "viewport", content: "width=device-width, initial-scale=1"},
              {hid: "description", name: "description", content: "سامانه وصول مطالبات",},
          ],
          link: [
              {rel: "icon", type: "image/x-icon", href: "/favicon.png"},
              // {rel: "stylesheet", type: 'text/css', href: "assets/css/font-awesome.css"},
          ]
      },
  },

  components: {
      global: true,
      dirs: ["~/components/icons", "~/components"],
  },

  pages: true,
  modules: ["@pinia/nuxt", 'nuxt-primevue'],

  plugins: [
      '~/plugins/pinia.js',
      // {src: "~/plugins/datePicker", mode: "client"},
  ],

  build: {
      transpile: ['primevue', /^vue2-google-maps($|\/)/]
  },

  imports: {
      autoImport: true,
  },

  css: [
      "@/assets/css/nucleo-svg.css",
      "@/assets/css/nucleo-icons.css",
      "@/assets/scss/argon-dashboard.scss",
  ],

  primevue: {
      options: {
          ripple: true,
      },
      components: {
          include: ['DataTable', 'Column', 'Button', 'Dialog', 'DynamicDialog', 'Paginator', 'InputText',
              'RadioButton', 'MultiSelect', 'Dropdown', 'ConfirmPopup', 'InputNumber', 'Checkbox', 'Textarea',
              'Password', 'ColumnGroup', 'Row', 'TabMenu', 'TabView', 'TabPanel', 'FileUpload']
      },
      directives: {
          include: ['Ripple', 'Tooltip']
      }
  },

  runtimeConfig: {
      public: {
          management: process.env.Management_API,
      },
  },

  compatibilityDate: '2024-07-22',
});