<template>
  <div>
<!--    <h2>rekomend</h2>-->
    <canvas>

    </canvas>
  </div>
</template>

<script>
export default {
  name: "Recommendations",
  data() {
    return {
      canvas: '',
      ctx: '',
      letters: 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQR' +
          'STUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRS' +
          'TUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ',
      fontSize: 10,
      columns: 0,
      drops: [],
    }
  },
  created(){
    // this.canvas = document.querySelector('canvas')
    // this.ctx = this.canvas.getContext('2d')
    // this.canvas.width = window.innerWidth
    // this.canvas.height = window.innerHeight
    // this.columns = this.canvas.width / this.fontSize
    // for (let i = 0; i < this.columns; i++) {
    //   this.drops[i] = 1
    // }
    // setInterval(this.draw, 33);
    // this.draw()
  },
  mounted(){
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.columns = this.canvas.width / this.fontSize
    this.letters = this.letters.split('')
    for (let i = 0; i < this.columns; i++)
      this.drops[i] = 1

    setInterval(this.draw, 33)
    // this.draw()
  },
  computed:{

  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}

body {
  background: #000;
}

canvas {
  display: block;
}
</style>