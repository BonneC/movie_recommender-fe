<template>
  <div id="app">
        <Home v-if="isLoggedIn"></Home>
        <Login v-if="!isLoggedIn"></Login>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Home from "./views/Home";
import Login from "./views/Login";

export default {
  name: 'App',
  components: {
    Login,
    Home,

  },
  computed: {
    isLoggedIn: function () {
      // console.log('tokenne')
      // console.log(this.$store.getters.isLoggedIn)
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
    })

  }
}
</script>

<style>
@font-face {
  font-family: 'matrix_code_nfiregular';
  src: url('assets/fonts/matrixcodenfi-yppj-webfont.woff2') format('woff2'),
  url('assets/fonts/matrixcodenfi-yppj-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;

}
#app {
  font-family: matrix_code_nfiregular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: black;
  overflow: hidden;
  /*margin-top: 60px;*/
}
</style>
