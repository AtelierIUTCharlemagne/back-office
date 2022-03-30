<template>
  <div id="app">
    <nav class="navbar navbar-expand sticky-top navbar-nav-scroll navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Back Office</router-link>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
              <router-link to="/users" v-if="currentUser" class="nav-link">Users</router-link>
          </li>
          <li class="nav-item">
              <router-link to="/events" v-if="currentUser" class="nav-link">Events</router-link>
          </li>
        </div>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
            <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
        </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
            <!-- <router-link to="/profile" class="nav-link"> -->
            <!-- <font-awesome-icon icon="user" /> Profile -->
            <!-- {{ currentUser.username }} -->
            <!-- </router-link> -->
        </li>
        <li class="nav-item">
            <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
        </li>
        </div>
    </nav>
    <div class="container mt-3">
        <router-view />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>