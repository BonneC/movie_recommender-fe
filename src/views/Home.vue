<template>
  <div>
    <div id="nav">
      <router-link :to="{name: 'recommend'}" class="links">RECOMMEND</router-link>
      <span> | </span>
      <button @click="logout">LOGOUT</button>
    </div>
    <div class="container-fluid">
      <MoviesList></MoviesList>
    </div>

  </div>
</template>

<script>
// import MoviesList from "../components/MoviesList"
import router from '../router'
import MoviesList from "../components/MoviesList";

export default {
  name: "Home",
  components: {MoviesList},
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

<style scoped lang="scss">
#nav {
  overflow: hidden;
}





</style>