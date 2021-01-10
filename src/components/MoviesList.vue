<template>
  <div>
    <h2>YOUR MOVIES</h2>
    <div>
      <ul id="ratings">
        <li v-for="movie in user_movies" :key="movie.id" :movie="movie" @click="showEdit(movie)" >
          {{ movie.title }} {{ movie.rating }}
        </li>
      </ul>

      <modal name="edit-modal" @before-open="beforeOpen" :width="modalWidth" :focus-trap="true">
        <div class="box ">
          <div class="partition" id="partition-register">
            <div class="partition-title">EDIT RATING</div>
            <div class="partition-form" style="margin-top: 20px">
              <label for="title">MOVIE</label> <input id="title" type="text" disabled="disabled" v-model="title">
              <label for="rating">RATING</label>
              <input type="text" v-model="rating" id="rating">
<!--              <button type="button" class="btn btn-primary" @click="onChange">Change Rating</button>-->
            </div>
          </div>
          <div class="partition" >
<!--          <button type="button" class="btn btn-primary" @click="hide('delete-modal')">Cancel</button>-->
          </div>
        </div>
      </modal>

    </div>
  </div>
</template>

<script>
import MovieService from "../services/MovieService";

const MODAL_WIDTH = 656
export default {
  name: "MoviesList",
  components: {},
  data() {
    return {
      user_movies: [],
      movies_details: [],
      modalWidth: MODAL_WIDTH,
      title: '',
      id: '',
      rating: '55',
      disabled: true,
    }
  },
  async created() {
    await this.getMovies()
  },
  methods: {
    showEdit(movie){
      console.log(movie.id)
      this.$modal.show('edit-modal', {
        title: movie.title,
        rating: movie.rating,
        id: movie.id
      })
    },
    beforeOpen(event) {
      // this.disabled = true
      console.log('HENLO')
      console.log(event.params)
      this.setInfo(event.params)
      console.log(event.params);
    },
    setInfo(movie) {
      this.title = movie.title
      this.rating = movie.rating
      this.id = movie.id
    },
    getMovies() {
      console.log(this.$store.state.token)
      MovieService.getMovies()
          .then(response => {
            console.log(response.data)
            this.user_movies = response.data
            this.getTitles()

            // return response.data
          })
          .catch(error => {
            console.log('error' + error.response)
            // console.log(error.response.status)
            if(error.response.status === 401)
              this.$store.dispatch('logout')
                  .then(() => {
                    this.$router.push('/login')
                  })
          })
    },
    getTitles() {
      for (let i in this.user_movies) {
        let id = this.user_movies[i].movie_id
        let movie = this.user_movies[i]
        // console.log('I')
        // console.log(i)
        // console.log(this.user_movies[i])
        MovieService.getMovie(id)
            .then(response => {
              this.movies_details.push(response.data)
              // this.user_movies[i].push({key: 'title', value: response.data.title})
              movie['title'] = response.data.title.toUpperCase()
              // console.log(this.user_movies)
            })
            .catch(error => {
              console.log('error ' + error.response)
              if(error.response.status === 401)
                this.$store.dispatch('logout')
                    .then(() => {
                      this.$router.push('/login')
                    })
            })
      }
    }
  }
}
</script>

<style scoped>
#ratings {
  /*font-family: 'Space Mono', monospace;*/
}
ul{
  display: inline-block;
  /*vertical-align: middle;*/
  /*list-style: none;*/
}
</style>