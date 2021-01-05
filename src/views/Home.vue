<template>
  <div id="nav">
    <router-link :to="{name: 'movies'}">MOVIES</router-link>
    <span> | </span>
    <router-link :to="{name: 'recommend'}">RECOMMEND</router-link>
    <div>
      <router-view/>
    </div>
    <button @click="logout">LOGOUT</button>
  </div>
</template>

<script>
// import MoviesList from "../components/MoviesList"
import router from '../router'

export default {
  name: "Home",

  data() {
    return {}
  },
  created() {
    console.log(router.currentRoute)
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  }
}
</script>

<style scoped>
#nav {
  overflow: hidden;
}
</style>