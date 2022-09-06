<template>
  <v-app class="app">
    <v-app-bar
      app
      color="primary"
      dark
      v-show="userIslogged"
    >

    <v-tabs>
      <v-tab to="/">Login</v-tab>
      <v-tab to="/dashboard">Dashboard</v-tab>
    </v-tabs>

    <div v-show="userIslogged">
      <FbSignOut />
    </div>

    </v-app-bar>

    <v-main>
     <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Authentication from './plugins/firebase'
import FbSignOut from './components/auth/FbSignOut.vue'

export default {
  name: 'App',

  components: {
    FbSignOut
  },

  data: () => ({
    userIslogged: false
  }),

  created () {
    Authentication.auth().onAuthStateChanged(user => {
      if(user) {
        this.userIslogged = true
        console.log("Current user  ",user)
      }
      else{
        this.userIslogged = false
        console.log("User not found")
      }
    })
  }
};
</script>

<style scoped>
.app{
    background-color: rgb(240,242,245) !important;
}
</style>
