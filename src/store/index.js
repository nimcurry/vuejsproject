/* eslint-disable object-curly-newline */
import { createStore } from 'vuex';
// import player from './modules/player';
// import auth from './modules/auth';
// import router from '@/router';
import modules from './modules';

export default createStore({
/*   modules: {
    // player,
    // auth,

  }, */
  modules,
});
