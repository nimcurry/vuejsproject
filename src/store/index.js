/* eslint-disable object-curly-newline */
import { createStore } from 'vuex';
import { Howl } from 'howler';
import { auth, usersCollection } from '@/includes/firebase';
// import router from '@/router';

export default createStore({
  state: {
    modalAuthShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.modalAuthShow = !state.modalAuthShow;
    },
    toggleAuthentication(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
  },
  getters: {
    /*
    modalAuthShow: (state) => state.modalAuthShow,
 */
  },

  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        gender: payload.gender,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuthentication');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuthentication');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuthentication');
      }
    },
    async signout({ commit }, payload) {
      await auth.signOut();

      commit('toggleAuthentication');

      if (payload.$route.meta.requiresAuth) {
        payload.$router.push({ name: 'home' });
      }
    },
    async newSong({ commit, state }, payload) {
      // console.log(state);
      commit('newSong', payload);
      state.sound.play();
    },
  },
  /*
  modules: {
},
*/
});
