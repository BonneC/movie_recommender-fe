<template>
  <div id="app">
    <h2>dis</h2>
    <img alt="Vue logo" src="./assets/logo.png">
    <!--    <Home v-if="isLoggedIn"></Home>-->
    <!--    <Login v-if="!isLoggedIn"></Login>-->
    <Home></Home>
  </div>
</template>

<script>
import Home from "@/views/Home";
// import Login from "@/views/Login";

export default {
  name: 'App',
  components: {
    // Login,
    Home,

  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  beforeCreate() {

  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
