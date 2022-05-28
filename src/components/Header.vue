<template>
   <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4"
      :to="{ name: 'home' }" exact-active-class="no-active">
        Music
        </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{name: 'about'}">
            about
            </router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
                Login / Register</a>
          </li>
          <template v-else>
            <li >
              <router-link class="px-2 text-white" :to="{ name: 'manage'}">
              Manage
              </router-link>
            </li>
            <li >
              <a class="px-2 text-white" href="#"
              @click.prevent="signout">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState /* ,  mapActions */ } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
  // eslint-disable-next-line object-curly-newline
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    /*     signout() {
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      }); */

    // console.log(this.$route);

    // },
    // ...mapActions(['signout']),

    /* toggleAuthModal() {
      /*  this.$store.state.modalAuthShow = !this.$store.state.modalAuthShow;
      console.log(this.$store.state.modalAuthShow);
      this.$store.commit('toggleAuthModal');
    }, */
  },
};
</script>
