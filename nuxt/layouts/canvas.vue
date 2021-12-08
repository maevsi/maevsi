<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiCanvas',
  data() {
    return {
      ctx: undefined as CanvasRenderingContext2D | undefined | null,
      image: undefined as HTMLImageElement | undefined,
      imageSize: 200,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  beforeCreate() {
    this.$moment.locale(this.$i18n.locale)
  },
  mounted() {
    this.image = new Image()
    this.image.src = '/assets/static/logos/maevsi.svg'

    const canvas = this.$refs.canvas as HTMLCanvasElement
    if (!canvas) return

    this.ctx = canvas.getContext('2d')
    if (!this.ctx) return

    this.canvasResize()

    window.onresize = this.canvasResize
    window.setInterval(() => window.requestAnimationFrame(this.draw), 17)

    const redirect = this.$route.query.redirect

    if (redirect && typeof redirect === 'string') {
      setTimeout(() => this.$router.replace(redirect), 1000)
    }
  },
  methods: {
    canvasResize() {
      if (!this.ctx) return

      this.ctx.canvas.height = window.innerHeight
      this.ctx.canvas.width = window.innerWidth

      this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
    },
    draw() {
      if (!this.ctx || !this.image) return

      this.clear()
      this.ctx.drawImage(
        this.image,
        -(this.imageSize / 2),
        -(this.imageSize / 2),
        this.imageSize,
        this.imageSize
      )
      this.ctx.rotate(Math.PI / 256)
    },
    clear() {
      if (!this.ctx) return

      this.ctx.save()
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.restore()
    },
  },
})
</script>
