<template>
  <div id="movie_comp">
    <h2>YOUR MOVIES</h2>
    <div>
      <ul id="ratings">
        <li v-for="movie in user_movies" :key="movie.movie_id" :movie="movie" @click="showEdit(movie)">
          {{ movie.title }} {{ movie.rating }}
        </li>
      </ul>
      <modal id="popup" style="background-color: black;" name="edit-modal" @before-open="beforeOpen" :width="modalWidth"
             :focus-trap="true">
        <div class="box ">
          <div class="partition" id="partition-register">
            <div class="partition-title">EDIT RATING</div>
            <div class="partition-form" style="margin-top: 20px">
              <label for="title">MOVIE</label> <input id="title" type="text" disabled="disabled" v-model="title">
              <label for="rating">RATING</label>
              <input type="text" v-model="rating" id="rating">
            </div>
          </div>
          <div class="partition">
            <button type="button" @click="onSubmit">CHANGE RATING</button>
            <button type="button" @click="onDelete()">DELETE RATING</button>
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
      movie_id: '',
      rating: '55',
      disabled: true,
    }
  },
  created() {
     this.getMovies()
  },
  methods: {
    showEdit(movie) {
      // console.log(movie.id)
      this.$modal.show('edit-modal', {
        title: movie.title,
        rating: movie.rating,
        movie_id: movie.movie_id
      })
    },
    beforeOpen(event) {
      this.setInfo(event.params)
      // console.log(event.params);
    },
    setInfo(movie) {
      this.title = movie.title
      this.rating = movie.rating
      this.movie_id = movie.movie_id
    },
    onSubmit() {
      console.log('SUBMITTEN')
      console.log(this.movie_id)
      console.log(this.rating)
      let movieInfo = {
        'id': this.movie_id,
        'rating': this.rating
      }
      MovieService.putMovie(movieInfo)
          .then(response => {
            console.log(response.data)
            this.$modal.hide('edit-modal')
            this.getMovies()
          })
    },
    onDelete() {
      MovieService.deleteMovie(this.movie_id).then(response => {
        console.log(response.data)
        this.getMovies()
        this.$modal.hide('edit-modal')
      })
    },
    getMovies() {
      console.log(this.$store.state.token)
      MovieService.getMovies()
          .then(response => {
            console.log(response.data)
            // this.user_movies = response.data
            this.getTitles(response.data)

            // return response.data
          })
          .catch(error => {
            console.log('error' + error.response)
            // console.log(error.response.status)
            if (error.response.status === 401)
              this.$store.dispatch('logout')
                  .then(() => {
                    this.$router.push('/login')
                  })
          })
    },
    getTitles(user_movies) {
      for (let i in user_movies) {
        let id = user_movies[i].movie_id
        let movie = user_movies[i]
        // console.log('I')
        // console.log(i)
        // console.log(this.user_movies[i])
        MovieService.getMovie(id)
            .then(response => {
              this.movies_details.push(response.data)
              // this.user_movies[i].push({key: 'title', value: response.data.title})
              movie['title'] = response.data.title.toUpperCase()
              this.user_movies.push(movie)
              // console.log(this.user_movies)
            })
            .catch(error => {
              console.log('error ' + error.response)
              if (error.response.status === 401)
                this.$store.dispatch('logout')
                    .then(() => {
                      this.$router.push('/login')
                    })
            })
      }
      // this.user_movies = user_movies
    }
  }
}
</script>

<style scoped lang="scss">
#ratings {
  /*font-family: 'Space Mono', monospace;*/
}

#movie_comp {
  padding-top: 60px;
}

ul {
  display: inline-block;
  padding-left: 0;
  font-size: 13px;
  padding-top: 20px;
  /*vertical-align: middle;*/
  /*list-style: none;*/
}

li {
  &:hover {
    text-decoration: underline;
  }
}

#popup {
  background-color: black !important;
}
</style>