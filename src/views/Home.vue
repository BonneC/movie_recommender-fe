<template>
  <div>
    <div id="nav" class="d-flex justify-content-end">
      <div>
        <!--        <input type="text" v-model="keyword" id="keyword">-->
        <button @click="showEdit()">NEW</button>
        <span> | </span>
        <router-link :to="{name: 'recommend'}" class="links">RECOMMEND</router-link>
        <span> | </span>
        <button @click="logout">LOGOUT</button>
      </div>
    </div>
    <div class="container-fluid">
      <MoviesList ref="child"></MoviesList>
    </div>
    <modal id="popup" style="background-color: black;" name="add-modal" :width="modalWidth"
           :focus-trap="true" @before-close="beforeClose">
      <div class="box">
        <div class="partition" id="partition-register">
          <div class="partition-title">ADD RATING</div>
          <div class="partition-form" style="margin-top: 20px">
            <p>MOVIE</p>
            <Dropdown id="ddown"
                      :options="options"
                      v-on:selected="validateSelection"
                      v-on:filter="getDropdownValues"
                      :disabled="false"
                      :maxItem="10"

            >
            </Dropdown>
            <p id="ra-title">RATING</p>
            <p id="expl">RANGES: 1-5 , CAN END IN 0.5</p>
            <input type="text" v-model="rating" id="rating">
          </div>
        </div>
        <div class="partition">
          <button type="button" @click="onSubmit" :disabled='disabled'>ADD RATING</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import MovieService from "../services/MovieService";
// import router from '../router'
import MoviesList from "../components/MoviesList"
import Dropdown from '../components/Dropdown'

const MODAL_WIDTH = 656
export default {
  name: "Home",
  components: {MoviesList, Dropdown},
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      keyword: '',
      options: [],
      movie_id: null,
      rating: null,
      selected: {name: null, id: null},
      disabled: true
    }
  },
  watch: {
    movie_id: function () {
      this.validateValues()
    },
    rating: function () {
      this.validateValues()
    }
  },
  created() {
    // console.log(router.currentRoute)
    this.recommendations()
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    },
    recommendations(){
      this.$store.dispatch('recommend')
          .then(()=>{
            console.log('sukses?')
          })
    },
    searchMovies(keyword) {
      MovieService.searchMovies(keyword).then(response => {
        console.log(response.data)
        let tmp = response.data
        for (let i in tmp) {
          let id = tmp[i].id
          let title = tmp[i].title + ' (' + tmp[i].release_date + ')'
          console.log(id)
          console.log(title)
          let movieInfo = {
            'name': title,
            'id': id
          }
          this.options.push(movieInfo)
        }
      })
    },
    showEdit() {
      // console.log(movie.id)
      this.$modal.show('add-modal')
    },
    beforeClose(event) {
      console.log(event.params)
      this.options = []
      this.id = null
      this.rating = null
      this.selected = {name: null, id: null}
    },
    validateSelection(selection) {
      this.selected = selection
      this.movie_id = selection.id
      console.log(selection.name + ' has been selected');
    },
    validateValues() {
      console.log('MOVIE ID')
      console.log(this.movie_id)
      console.log('RATING')
      console.log(this.rating)
      if (!this.movie_id) {
        this.disabled = true
      } else if (!this.rating || (this.rating > 5 || this.rating <= 0) ||
          (this.rating % 1 !== 0.5 && this.rating % 1 !== 0.0)) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    getDropdownValues(keyword) {
      console.log('You could refresh options by querying the API with ' + keyword)
      // console.log(this.selected.name)
      // console.log(this.selected.id)
      if (this.selected.name != null) {
        if (this.selected.name.localeCompare(keyword) === 0) {
          console.log('EQUALE')
          return
        }
      }
      if (keyword.length >= 3 && keyword.match("^[a-zA-Z0-9]+$")) {
        console.log('VALID')
        this.searchMovies(keyword)
      }
    },
    onSubmit() {
      console.log('SUBMITTEN')
      let movieInfo = {
        'id': this.movie_id,
        'rating': this.rating
      }
      MovieService.postMovie(movieInfo)
          .then(response => {
            console.log(response.data)
            this.$modal.hide('add-modal')
            this.$refs.child.getMovies()
          })
    }
  }
}
</script>

<style scoped lang="scss">
#nav {
  overflow: hidden;
}

#ddown {
  font-family: "Space Mono";
}
p{
  margin-bottom: 5px;
}

#expl{
  font-size: 12px;
  font-family: "Space Mono";
  color: gray;
  //margin-bottom: 5px;
}

#ra-title{
  padding-top: 10px;
  margin-bottom: 0px;
}
</style>