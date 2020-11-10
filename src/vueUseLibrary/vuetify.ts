import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib'


Vue.use(Vuetify);

const options = {
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#409EFF",
      },
    }
  },
  icons: {
    iconfont: 'mdi' as 'mdi',
  },
};

export default new Vuetify(options);
