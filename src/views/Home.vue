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
      <MoviesList></MoviesList>
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
                        <label for="rating">RATING</label>
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
import router from '../router'
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
      rating: '',
      selected: {name: null, id: null},
      disabled: true
    }
  },
  watch: {},
  created() {
    console.log(router.currentRoute)
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
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
      this.selected = {name: null, id: null}
    },
    validateSelection(selection) {
      this.selected = selection
      console.log(selection.name + ' has been selected');
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
</style>