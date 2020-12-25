<template>
  <div id="nav">
    <router-link  :to="{name: 'movies'}">Movies</router-link>
    <span> | </span>
    <router-link  :to="{name: 'recommend'}">Recommend</router-link>

    <div>
      <router-view/>
    </div>
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
    recommend: function (event) {
      console.log(event)
      router.push({name: 'recommend'}).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
#nav{
  overflow: hidden;
}
</style>