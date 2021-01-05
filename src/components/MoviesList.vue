<template>
  <div>
    <h2>YOUR MOVIES</h2>
    <div>
      <ul >
        <li v-for="movie in movies_details" :key="movie.id">
          {{ movie.title.toUpperCase() }}
        </li>
      </ul>
      <ul id="ratings">
        <li v-for="movie in user_movies" :key="movie.id">
          {{ movie.rating }}
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import MovieService from "../services/MovieService";

export default {
  name: "MoviesList",
  components: {},
  data() {
    return {
      user_movies: [],
      movies_details: [],
    }
  },
  created() {
    this.getMovies()
  },
  methods: {
    getMovies() {
      console.log(this.$store.state.token)
      MovieService.getMovies()
          .then(response => {
            // console.log(response.data)
            this.user_movies = response.data
            this.getTitles()
          })
          .catch(error => {
            console.log('error' + error.response)
          })
    },
    getTitles() {
      for (let i in this.user_movies) {
        let id = this.user_movies[i].movie_id
        // console.log('ID')
        // console.log(id)
        MovieService.getMovie(id)
            .then(response => {
              // console.log(response.data)
              this.movies_details.push(response.data)
            })
            .catch(error => {
              console.log('error ' + error.response)
            })
      }
    }
  }
}
</script>

<style scoped>
#ratings {
  font-family: 'Space Mono', monospace;
}
ul{
  display: inline-block;
  /*vertical-align: middle;*/
  /*list-style: none;*/
}
</style>