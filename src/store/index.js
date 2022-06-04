/* eslint-disable object-curly-newline */
import { createStore } from 'vuex';
import { Howl } from 'howler';
import { auth, usersCollection } from '@/includes/firebase';
import helper from '@/includes/helper';
// import router from '@/router';

export default createStore({
  state: {
    modalAuthShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
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
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}% `;
    },
  },
  getters: {
    /*
    modalAuthShow: (state) => state.modalAuthShow,
 */
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
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
    async newSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }
      // console.log(state);
      commit('newSong', payload);
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      // Document = 2000px, timeline = 1000px, ClickX=500px, Distance =500px
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
  /*
  modules: {
},
*/
});
