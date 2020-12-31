<template>
  <!--  <div id="recc">-->
  <!--    <div class="fullheight">-->
  <!--      <div class="fullheight-body">-->
  <!--        <p><span class="shuffle is-main">Punkywhitenoisething</span></p>-->
  <!--        <p><span class="shuffle">(Click to replay)</span></p>-->
  <!--      </div>-->
  <!--    </div>-->
  <div id="container">
    <canvas>

    </canvas>
    <div id="overlay">
      <div class="container d-inline-flex justify-content-center h-100">
        <div class="row justify-content-center align-self-center">
          <ul class="list">
            <li v-for="movie in movies" :key="movie.id" class="shuffle is-main">
              {{ movie.id }} : {{ movie.title.toUpperCase() }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!--    <span style="display: inline-block" class="shuffle is-main">Punkywhitenoisething</span>-->

  <!--  </div>-->
</template>

<script>
import anime from "animejs"
import MovieService from "../services/MovieService";

export default {

  name: "Recommendations",
  data() {
    return {
      canvas: '',
      ctx: '',
      letters: 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQR' +
          'STUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRS' +
          'TUVXYZアカサタナハマヤラワイキチヒニリウクスヌヲテセケセオソノアカサタナハマヤラワイキチヒニリウクスヌヲテセケセオソノ',
      fontSize: 10,
      columns: 0,
      drops: [],
      interval: 0,
      movies: [
        {'id': 1, 'title': 'GODFATHER'},
        {'id': 2, 'title': 'MATRIX'},
        {'id': 3, 'title': 'TAXI DRIVER'},
        {'id': 4, 'title': 'TESTIN'},
      ]
    }
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted() {
    this.getRecommendations()
    this.letters = this.letters.split('')
    this.set()
    this.interval = setInterval(this.draw, 33)
    // this.WordShuffler()
    // this.draw()
  },
  computed: {},
  methods: {
    getRecommendations() {
      MovieService.getRecommendations()
          .then(response => {
            console.log(response.data)
            this.movies = response.data
            this.WordShuffler()
            // for (let movie in this.movies)
            //   console.log(movie)

          })
          .catch(error => {
            console.log('error ' + error)
          })
    },
    myEventHandler(e) {
      console.log(e)
      this.set()
      clearInterval(this.interval)
      this.interval = setInterval(this.draw, 33)
    },
    set() {
      this.canvas = document.querySelector('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.columns = this.canvas.width / this.fontSize

      for (let i = 0; i < this.columns; i++)
        this.drops[i] = 1
    },
    draw() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, .1)'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      for (let i = 0; i < this.drops.length; i++) {
        let text = this.letters[Math.floor(Math.random() * this.letters.length)]
        this.ctx.fillStyle = '#0f0';
        this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
        this.drops[i]++;
        if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > .95) {
          this.drops[i] = 0;
        }
      }
    },
    WordShuffler() {
      const random_char = () => {
        const possible = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
            "0123456789" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz"
        return possible.charAt(Math.floor(Math.random() * possible.length))
      }

      const mask = (chars, progress) => {
        const masked = []

        for (let i = 0; i < chars.length; i++) {
          const position = (i + 1) / chars.length
          if (position > progress) {
            masked.push(random_char())
          } else {
            masked.push(chars[i])
          }
        }

        return masked.join('')
      }

      const shuffle = el => {
        const chars = el.textContent.split('')

        const params = {
          progress: 0
        }

        const a = anime({
          targets: params,
          progress: 1,
          delay: 1000,
          duration: 1000,
          easing: 'easeInQuad',
          update: () => {
            el.textContent = mask(chars, params.progress)
          },
          complete: () => {
            el.classList.add('completed')
          }
        })

        el.onclick = () => {
          el.classList.remove('completed')
          a.restart()
        }
      }

      for (const el of document.querySelectorAll('.shuffle')) {
        shuffle(el)
      }
    }
  }
}
</script>

<style scoped>
/** {*/
/*  margin: 0;*/
/*  padding: 0*/
/*}*/

#recc {
  background: #111;
  color: #ccc;
  font-size: 18px;
  /*font-family: Courier, 'Courier New', monospace;*/
  letter-spacing: 0.8rem;
  margin: 0;
  padding: 0;
  position: relative;
}

#container {
  /*margin-top: -10%;*/
  width: 100vw;
  height: calc(100vh - 84px);
  overflow: hidden;
  position: relative;
  /*display: inline-block;*/
}

#overlay {
  width: 100%;
  height: calc(100vh - 84px);

  position: absolute;
}

/*.list {*/
/*  color: #0f0;*/
/*}*/

canvas {
  border: 1px solid black;
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
}

p {
  margin: 2rem 0;
}

.fullheight {
  width: 100vw;
  height: 100vh;
  align-items: center;
  display: flex;
}

.fullheight-body {
  flex-grow: 1;
  text-align: center;
}

.shuffle {
  cursor: pointer;
}

.shuffle.is-main {
  /*font-size: 200%;*/
}

.shuffle.completed {
  animation: blink 1s linear 0s 1 alternate;
}

@keyframes blink {
  0% {
    color: #b8ffb8;
    text-shadow: 0 0 2rem #b8ffb8;
  }
}
</style>