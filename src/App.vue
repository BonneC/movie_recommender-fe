<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  beforeCreate() {

  },
  methods: {
    reload() {
      console.log(this.$store.state.token)
      this.$forceUpdate()
    }
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
