<template>
    <div>
      <h2>R WE HERE</h2>
      <div>
        <ul>
            <li v-for="movie in movies" :key="movie.id">
                {{movie.id}} : {{movie.rating}}
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import MovieService from "../services/MovieService";

    export default {
        name: "MoviesList",
        components:{

        },
        data(){
            return{
                movies: [
                  {'id': 1, 'rating': 5},
                  {'id': 2, 'rating': 5},
                  {'id': 3, 'rating': 5},
                  {'id': 4, 'rating': 5}
                ]
            }
        },
        created(){
            this.getMovies()
        },
        methods:{
            getMovies(){
                MovieService.getMovies()
                .then(response => {
                    console.log(response.data)
                    this.movies = response.data
                })
                .catch(error => {
                    console.log('error' + error.response)
                })
            }
        }
    }
</script>

<style scoped>

</style>